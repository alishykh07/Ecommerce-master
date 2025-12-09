"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"

export function OrderSummary() {
  const { items, total, itemCount } = useCart()

  const shipping = total > 100 ? 0 : 9.99
  const tax = total * 0.08 // 8% tax
  const finalTotal = total + shipping + tax

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-3">
          {items.map((item) => {
            const itemKey = `${item.id}-${item.size}-${item.color}`
            return (
              <div key={itemKey} className="flex items-center space-x-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.brand}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Size: {item.size}</span>
                    <span>•</span>
                    <span>Color: {item.color}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
              </div>
            )
          })}
        </div>

        <Separator />

        {/* Pricing Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({itemCount} items)</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>

        {/* Shipping Info */}
        {total < 100 && (
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">Add ${(100 - total).toFixed(2)} more for free shipping!</p>
          </div>
        )}

        {/* Security Badges */}
        <div className="flex items-center justify-center space-x-4 pt-4">
          <Badge variant="outline" className="text-xs">
            SSL Secure
          </Badge>
          <Badge variant="outline" className="text-xs">
            256-bit Encryption
          </Badge>
        </div>

        {/* Estimated Delivery */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Estimated delivery: 3-5 business days</p>
        </div>
      </CardContent>
    </Card>
  )
}
