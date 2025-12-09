import { type NextRequest, NextResponse } from "next/server"

// Mock orders data - same as in orders/route.ts
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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const order = orders.find((o) => o.id === params.id)

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ order })
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const orderIndex = orders.findIndex((o) => o.id === params.id)

    if (orderIndex === -1) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const body = await request.json()
    const updatedOrder = {
      ...orders[orderIndex],
      ...body,
      id: params.id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    }

    orders[orderIndex] = updatedOrder

    return NextResponse.json({ order: updatedOrder })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
