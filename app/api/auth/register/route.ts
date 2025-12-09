import { type NextRequest, NextResponse } from "next/server"

// Mock user data - same as in login/route.ts
const users = [
  {
    id: "1",
    email: "admin@solestore.com",
    password: "password123",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "john@example.com",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
    role: "user",
    createdAt: "2024-01-15T00:00:00Z",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json()

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      email,
      password, // In real app, this would be hashed
      firstName,
      lastName,
      role: "user" as const,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser

    // In a real app, you would generate a JWT token here
    const token = `mock-jwt-token-${newUser.id}`

    return NextResponse.json(
      {
        user: userWithoutPassword,
        token,
        message: "Registration successful",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
