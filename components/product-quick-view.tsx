"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingBag } from "lucide-react"
import type { CartItem } from "@/lib/cart-context"

interface Product {
  id: number
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  isNew: boolean
  colors: string[]
}

interface ProductQuickViewProps {
  product: Product
  onClose: () => void
  onAddToCart: (item: Omit<CartItem, "quantity">) => void
}

const sizes = ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"]

export function ProductQuickView({ product, onClose, onAddToCart }: ProductQuickViewProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState(product.colors[0])

  const handleAddToCart = () => {
    if (!selectedSize) return

    onAddToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
    })
  }

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      white: "bg-white border-gray-300",
      black: "bg-black",
      blue: "bg-blue-500",
      red: "bg-red-500",
      gray: "bg-gray-500",
      navy: "bg-blue-900",
      burgundy: "bg-red-800",
    }
    return colorMap[color] || "bg-gray-400"
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Quick Add to Cart</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
              <h3 className="text-2xl font-bold">{product.name}</h3>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium ml-1">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              {product.isNew && <Badge>New</Badge>}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Color</label>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${getColorClass(color)} ${
                        selectedColor === color ? "border-primary ring-2 ring-primary/20" : "border-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Size</label>
                <div className="grid grid-cols-4 gap-2">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className="h-10"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={handleAddToCart} disabled={!selectedSize}>
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
