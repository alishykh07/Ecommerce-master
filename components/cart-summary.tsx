"use client"

import { useCart } from "@/lib/cart-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

export function CartSummary() {
  const { total, itemCount } = useCart()
  const { isAuthenticated } = useAuth()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)

  const shipping = total > 100 ? 0 : 9.99
  const tax = total * 0.08 // 8% tax
  const finalTotal = total + shipping + tax - discount

  const handleApplyPromo = async () => {
    setIsApplyingPromo(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock promo code logic
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(total * 0.1) // 10% discount
    } else if (promoCode.toLowerCase() === "welcome20") {
      setDiscount(Math.min(total * 0.2, 50)) // 20% discount, max $50
    } else {
      setDiscount(0)
    }

    setIsApplyingPromo(false)
  }

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal ({itemCount} items)</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>

        {total < 100 && (
          <p className="text-sm text-muted-foreground">Add ${(100 - total).toFixed(2)} more for free shipping!</p>
        )}

        <div className="space-y-2">
          <Label htmlFor="promo">Promo Code</Label>
          <div className="flex gap-2">
            <Input
              id="promo"
              placeholder="Enter code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <Button variant="outline" onClick={handleApplyPromo} disabled={isApplyingPromo || !promoCode}>
              {isApplyingPromo ? "Applying..." : "Apply"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Try: SAVE10 or WELCOME20</p>
        </div>

        <div className="space-y-2">
          {isAuthenticated ? (
            <Button className="w-full" size="lg" asChild>
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          ) : (
            <div className="space-y-2">
              <Button className="w-full" size="lg" asChild>
                <Link href="/login?redirect=/checkout">Sign In to Checkout</Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/checkout">Checkout as Guest</Link>
              </Button>
            </div>
          )}
          <Button variant="outline" className="w-full bg-transparent" asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          <p>Secure checkout with SSL encryption</p>
        </div>
      </CardContent>
    </Card>
  )
}
