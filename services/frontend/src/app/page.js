'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './dashboard.module.css'

export default function Home() {
  const router = useRouter()
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    } else {
      router.push('/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  if (!token || !user) {
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Jira Project Management Dashboard</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
      
      <div className={styles.welcomeCard}>
        <h2 className={styles.welcomeTitle}>Welcome, {user.username}!</h2>
        <p className={styles.infoText}>Role: <strong>{user.role}</strong></p>
        <p className={styles.infoText}>Email: {user.email}</p>
      </div>
    </div>
  )
}
