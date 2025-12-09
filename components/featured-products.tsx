"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { ProductQuickView } from "@/components/product-quick-view"

// Mock product data
const products = [
  {
    id: 1,
    name: "Air Max Revolution",
    brand: "Nike",
    price: 129.99,
    originalPrice: 159.99,
    image: "/nike-air-max-sneaker-white-and-blue.jpg",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    colors: ["white", "blue", "black"],
  },
  {
    id: 2,
    name: "Ultra Boost 22",
    brand: "Adidas",
    price: 189.99,
    image: "/adidas-ultra-boost-running-shoe-black.jpg",
    rating: 4.9,
    reviews: 89,
    isNew: false,
    colors: ["black", "white", "gray"],
  },
  {
    id: 3,
    name: "Chuck Taylor All Star",
    brand: "Converse",
    price: 65.99,
    image: "/converse-chuck-taylor-high-top-red.jpg",
    rating: 4.6,
    reviews: 256,
    isNew: false,
    colors: ["red", "black", "white"],
  },
  {
    id: 4,
    name: "Old Skool Classic",
    brand: "Vans",
    price: 79.99,
    image: "/vans-old-skool-skateboard-shoe-black-white.jpg",
    rating: 4.7,
    reviews: 178,
    isNew: true,
    colors: ["black", "navy", "burgundy"],
  },
]

export function FeaturedProducts() {
  const [favorites, setFavorites] = useState<number[]>([])
  const { addItem } = useCart()
  const [quickViewProduct, setQuickViewProduct] = useState<(typeof products)[0] | null>(null)

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const handleQuickAdd = (product: (typeof products)[0]) => {
    setQuickViewProduct(product)
  }

  return (
    <>
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Featured Products</h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Discover our most popular and trending sneakers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && <Badge className="bg-primary text-primary-foreground">New</Badge>}
                      {product.originalPrice && <Badge variant="destructive">Sale</Badge>}
                    </div>

                    {/* Favorite Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                        }`}
                      />
                    </Button>

                    {/* Quick Add Button */}
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button className="w-full" size="sm" onClick={() => handleQuickAdd(product)}>
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Quick Add
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                      <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium ml-1">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>

                    {/* Colors */}
                    <div className="flex items-center gap-2">
                      {product.colors.map((color) => (
                        <div
                          key={color}
                          className={`w-4 h-4 rounded-full border-2 border-gray-300 ${
                            color === "white"
                              ? "bg-white"
                              : color === "black"
                                ? "bg-black"
                                : color === "blue"
                                  ? "bg-blue-500"
                                  : color === "red"
                                    ? "bg-red-500"
                                    : color === "gray"
                                      ? "bg-gray-500"
                                      : color === "navy"
                                        ? "bg-navy-500"
                                        : color === "burgundy"
                                          ? "bg-red-800"
                                          : "bg-gray-400"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Product Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={(item) => {
            addItem(item)
            setQuickViewProduct(null)
          }}
        />
      )}
    </>
  )
}
