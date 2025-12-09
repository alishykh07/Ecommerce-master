import { type NextRequest, NextResponse } from "next/server"

// Mock product data for search
const products = [
  {
    id: 1,
    name: "Air Max Revolution",
    brand: "Nike",
    category: "Running",
    price: 129.99,
    image: "/nike-air-max-sneaker-white-and-blue.jpg",
    description: "Revolutionary comfort with advanced cushioning technology",
  },
  {
    id: 2,
    name: "Ultra Boost 22",
    brand: "Adidas",
    category: "Running",
    price: 189.99,
    image: "/adidas-ultra-boost-running-shoe-black.jpg",
    description: "Incredible energy return with every step",
  },
  {
    id: 3,
    name: "Chuck Taylor All Star",
    brand: "Converse",
    category: "Lifestyle",
    price: 65.99,
    image: "/converse-chuck-taylor-high-top-red.jpg",
    description: "Timeless classic that never goes out of style",
  },
  {
    id: 4,
    name: "Old Skool Classic",
    brand: "Vans",
    category: "Lifestyle",
    price: 79.99,
    image: "/vans-old-skool-skateboard-shoe-black-white.jpg",
    description: "Heritage style with modern comfort",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")
    const limit = searchParams.get("limit") || "10"

    if (!query) {
      return NextResponse.json({ results: [], total: 0 })
    }

    const searchLower = query.toLowerCase()
    const results = products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower),
      )
      .slice(0, Number.parseInt(limit))

    // Add search suggestions
    const suggestions = [
      "nike air max",
      "adidas ultra boost",
      "converse chuck taylor",
      "vans old skool",
      "running shoes",
      "lifestyle sneakers",
    ].filter((suggestion) => suggestion.includes(searchLower))

    return NextResponse.json({
      results,
      suggestions,
      total: results.length,
      query,
    })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
