import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/database.js';
import config from '../config/config.js';

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      'INSERT INTO users (username, email, password_hash, role, status) VALUES (?, ?, ?, ?, ?)',
      [username, email, hashedPassword, 'member', 'pending']
    );

    res.status(201).json({
      message: 'Registration request submitted. Waiting for admin approval.',
      userId: result.insertId
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Username or email already exists' });
    }
    res.status(500).json({ error: 'Failed to create user' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (user.status !== 'active') {
      return res.status(403).json({ error: 'Account is pending admin approval' });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role
      },
      config.jwtSecret,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

const getUsers = async (req, res) => {
  try {
    const [users] = await db.execute(
      'SELECT id, username, email, role, status, created_at FROM users'
    );

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const [users] = await db.execute(
      'SELECT id, username, email, role, status, created_at FROM users WHERE id = ?',
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const [result] = await db.execute(
      'UPDATE users SET role = ? WHERE id = ?',
      [role, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      'DELETE FROM users WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

const approveUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      'UPDATE users SET status = ? WHERE id = ?',
      ['active', id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User approved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve user' });
  }
};

const rejectUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      'UPDATE users SET status = ? WHERE id = ?',
      ['rejected', id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User rejected successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reject user' });
  }
};

export default {
  register,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  approveUser,
  rejectUser
};

