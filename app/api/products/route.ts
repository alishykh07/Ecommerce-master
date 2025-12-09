import { type NextRequest, NextResponse } from "next/server"

// Mock product data - in a real app, this would come from your database
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const brand = searchParams.get("brand")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const search = searchParams.get("search")
    const status = searchParams.get("status")
    const limit = searchParams.get("limit")
    const offset = searchParams.get("offset")

    let filteredProducts = [...products]

    // Apply filters
    if (category) {
      filteredProducts = filteredProducts.filter((p) => p.category.toLowerCase() === category.toLowerCase())
    }

    if (brand) {
      filteredProducts = filteredProducts.filter((p) => p.brand.toLowerCase() === brand.toLowerCase())
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter((p) => p.price >= Number.parseFloat(minPrice))
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter((p) => p.price <= Number.parseFloat(maxPrice))
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.brand.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower),
      )
    }

    if (status) {
      filteredProducts = filteredProducts.filter((p) => p.status === status)
    }

    // Apply pagination
    const total = filteredProducts.length
    if (limit) {
      const limitNum = Number.parseInt(limit)
      const offsetNum = offset ? Number.parseInt(offset) : 0
      filteredProducts = filteredProducts.slice(offsetNum, offsetNum + limitNum)
    }

    return NextResponse.json({
      products: filteredProducts,
      total,
      hasMore: limit ? total > Number.parseInt(offset || "0") + Number.parseInt(limit) : false,
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, brand, category, price, description, colors, sizes, stock } = body

    // Validate required fields
    if (!name || !brand || !category || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new product
    const newProduct = {
      id: Math.max(...products.map((p) => p.id)) + 1,
      name,
      brand,
      category,
      price: Number.parseFloat(price),
      description: description || "",
      images: [],
      colors: colors || [],
      sizes: sizes || [],
      stock: Number.parseInt(stock) || 0,
      rating: 0,
      reviews: 0,
      isNew: true,
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    products.push(newProduct)

    return NextResponse.json({ product: newProduct }, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
