import { type NextRequest, NextResponse } from "next/server"

// Mock user data
const users = [
  {
    id: "1",
    email: "admin@solestore.com",
    password: "password123", // In real app, this would be hashed
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "john@example.com",
    password: "password123", // In real app, this would be hashed
    firstName: "John",
    lastName: "Doe",
    role: "user",
    createdAt: "2024-01-15T00:00:00Z",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user by email
    const user = users.find((u) => u.email === email)

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    // In a real app, you would generate a JWT token here
    const token = `mock-jwt-token-${user.id}`

    return NextResponse.json({
      user: userWithoutPassword,
      token,
      message: "Login successful",
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
