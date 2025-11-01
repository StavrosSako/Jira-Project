#!/bin/bash

BASE_URL="http://localhost:3001"
echo "Testing User Management Service..."

echo -e "\n=== 1. Health Check ==="
curl -s "$BASE_URL/health"

echo -e "\n\n=== 2. Register New User ==="
curl -s -X POST "$BASE_URL/api/users/register" \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@test.com","password":"password123","role":"member"}'

echo -e "\n\n=== 3. Login as Admin ==="
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/users/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@jira.local","password":"password123"}')

echo "$LOGIN_RESPONSE"

TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo "Token extracted: ${TOKEN:0:50}..."

echo -e "\n=== 4. Get All Users (with auth) ==="
curl -s "$BASE_URL/api/users/users" \
  -H "Authorization: Bearer $TOKEN"

echo -e "\n\n=== 5. Get User by ID ==="
curl -s "$BASE_URL/api/users/users/1" \
  -H "Authorization: Bearer $TOKEN"

echo -e "\n\n=== 6. Update User Role ==="
curl -s -X PUT "$BASE_URL/api/users/users/2" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"role":"admin"}'

echo -e "\n\n=== 7. Get User 2 to verify change ==="
curl -s "$BASE_URL/api/users/users/2" \
  -H "Authorization: Bearer $TOKEN"

echo -e "\n\n=== 8. Login as Member ==="
curl -s -X POST "$BASE_URL/api/users/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"member1@jira.local","password":"password123"}'

echo -e "\n\nTests completed!"
