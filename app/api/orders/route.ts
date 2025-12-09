import { type NextRequest, NextResponse } from "next/server"

// Mock orders data
const orders = [
  {
    id: "ORD-001",
    userId: "1",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
    },
    items: [
      {
        id: 1,
        name: "Air Max Revolution",
        brand: "Nike",
        price: 129.99,
        quantity: 1,
        size: "10",
        color: "White/Blue",
        image: "/nike-air-max-sneaker-white-and-blue.jpg",
      },
    ],
    shippingAddress: {
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    billingAddress: {
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    paymentMethod: "card",
    paymentStatus: "paid",
    subtotal: 129.99,
    shipping: 0,
    tax: 10.4,
    total: 140.39,
    status: "completed",
    trackingNumber: "1Z999AA1234567890",
    estimatedDelivery: "2024-01-20",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "ORD-002",
    userId: "2",
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1234567891",
    },
    items: [
      {
        id: 2,
        name: "Ultra Boost 22",
        brand: "Adidas",
        price: 189.99,
        quantity: 1,
        size: "8.5",
        color: "Black",
        image: "/adidas-ultra-boost-running-shoe-black.jpg",
      },
    ],
    shippingAddress: {
      firstName: "Jane",
      lastName: "Smith",
      address: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      country: "United States",
    },
    billingAddress: {
      firstName: "Jane",
      lastName: "Smith",
      address: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      country: "United States",
    },
    paymentMethod: "paypal",
    paymentStatus: "paid",
    subtotal: 189.99,
    shipping: 9.99,
    tax: 15.2,
    total: 215.18,
    status: "processing",
    trackingNumber: null,
    estimatedDelivery: "2024-01-22",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-14T14:20:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const status = searchParams.get("status")
    const limit = searchParams.get("limit")
    const offset = searchParams.get("offset")

    let filteredOrders = [...orders]

    // Apply filters
    if (userId) {
      filteredOrders = filteredOrders.filter((order) => order.userId === userId)
    }

    if (status) {
      filteredOrders = filteredOrders.filter((order) => order.status === status)
    }

    // Apply pagination
    const total = filteredOrders.length
    if (limit) {
      const limitNum = Number.parseInt(limit)
      const offsetNum = offset ? Number.parseInt(offset) : 0
      filteredOrders = filteredOrders.slice(offsetNum, offsetNum + limitNum)
    }

    return NextResponse.json({
      orders: filteredOrders,
      total,
      hasMore: limit ? total > Number.parseInt(offset || "0") + Number.parseInt(limit) : false,
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, customer, items, shippingAddress, billingAddress, paymentMethod, subtotal, shipping, tax, total } =
      body

    // Validate required fields
    if (!customer || !items || !shippingAddress || !paymentMethod || !total) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate order ID
    const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create new order
    const newOrder = {
      id: orderId,
      userId: userId || null,
      customer,
      items,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      paymentMethod,
      paymentStatus: "pending",
      subtotal,
      shipping,
      tax,
      total,
      status: "pending",
      trackingNumber: null,
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 5 days from now
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    orders.push(newOrder)

    return NextResponse.json({ order: newOrder }, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
