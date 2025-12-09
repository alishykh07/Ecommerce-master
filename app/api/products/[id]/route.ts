import { type NextRequest, NextResponse } from "next/server"

// Mock product data - same as in products/route.ts
const products = [
  {
    id: 1,
    name: "Air Max Revolution",
    brand: "Nike",
    category: "Running",
    price: 129.99,
    originalPrice: 159.99,
    description:
      "Experience revolutionary comfort with the Air Max Revolution. Featuring advanced cushioning technology and breathable mesh upper for all-day comfort.",
    images: ["/nike-air-max-sneaker-white-and-blue.jpg"],
    colors: ["white", "blue", "black"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    stock: 45,
    rating: 4.8,
    reviews: 124,
    isNew: true,
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "Ultra Boost 22",
    brand: "Adidas",
    category: "Running",
    price: 189.99,
    description:
      "The Ultra Boost 22 delivers incredible energy return with every step. Perfect for runners who demand the best performance.",
    images: ["/adidas-ultra-boost-running-shoe-black.jpg"],
    colors: ["black", "white", "gray"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    stock: 23,
    rating: 4.9,
    reviews: 89,
    isNew: false,
    status: "active",
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
  },
  {
    id: 3,
    name: "Chuck Taylor All Star",
    brand: "Converse",
    category: "Lifestyle",
    price: 65.99,
    description: "The iconic Chuck Taylor All Star. A timeless classic that never goes out of style.",
    images: ["/converse-chuck-taylor-high-top-red.jpg"],
    colors: ["red", "black", "white"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    stock: 0,
    rating: 4.6,
    reviews: 256,
    isNew: false,
    status: "out_of_stock",
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z",
  },
  {
    id: 4,
    name: "Old Skool Classic",
    brand: "Vans",
    category: "Lifestyle",
    price: 79.99,
    description: "The Vans Old Skool Classic combines heritage style with modern comfort. Perfect for everyday wear.",
    images: ["/vans-old-skool-skateboard-shoe-black-white.jpg"],
    colors: ["black", "navy", "burgundy"],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    stock: 67,
    rating: 4.7,
    reviews: 178,
    isNew: true,
    status: "active",
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-04T00:00:00Z",
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const product = products.find((p) => p.id === id)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ product })
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const productIndex = products.findIndex((p) => p.id === id)

    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const body = await request.json()
    const updatedProduct = {
      ...products[productIndex],
      ...body,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    }

    products[productIndex] = updatedProduct

    return NextResponse.json({ product: updatedProduct })
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const productIndex = products.findIndex((p) => p.id === id)

    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    products.splice(productIndex, 1)

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
