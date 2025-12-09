"use client"

import { useCart } from "@/lib/cart-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useState } from "react"

export function CartItems() {
  const { items, updateQuantity, removeItem } = useCart()
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set())

  const handleQuantityChange = async (id: number, size: string, color: string, newQuantity: number) => {
    const itemKey = `${id}-${size}-${color}`
    setUpdatingItems((prev) => new Set(prev).add(itemKey))

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    updateQuantity(id, size, color, newQuantity)
    setUpdatingItems((prev) => {
      const newSet = new Set(prev)
      newSet.delete(itemKey)
      return newSet
    })
  }

  const handleRemoveItem = (id: number, size: string, color: string) => {
    removeItem(id, size, color)
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const itemKey = `${item.id}-${item.size}-${item.color}`
        const isUpdating = updatingItems.has(itemKey)

        return (
          <Card key={itemKey} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.brand}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <span>Size: {item.size}</span>
                    <span>Color: {item.color}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => handleQuantityChange(item.id, item.size, item.color, item.quantity - 1)}
                        disabled={isUpdating || item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = Number.parseInt(e.target.value) || 1
                          handleQuantityChange(item.id, item.size, item.color, newQuantity)
                        }}
                        className="w-16 text-center"
                        min="1"
                        disabled={isUpdating}
                      />

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => handleQuantityChange(item.id, item.size, item.color, item.quantity + 1)}
                        disabled={isUpdating}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => handleRemoveItem(item.id, item.size, item.color)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
