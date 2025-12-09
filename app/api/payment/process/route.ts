import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { paymentMethod, amount, currency = "USD", cardDetails, billingAddress } = body

    // Validate required fields
    if (!paymentMethod || !amount) {
      return NextResponse.json({ error: "Payment method and amount are required" }, { status: 400 })
    }

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock payment validation
    if (paymentMethod === "card") {
      if (!cardDetails || !cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv) {
        return NextResponse.json({ error: "Card details are required" }, { status: 400 })
      }

      // Mock card validation
      const cardNumber = cardDetails.cardNumber.replace(/\s/g, "")
      if (cardNumber.length < 16) {
        return NextResponse.json({ error: "Invalid card number" }, { status: 400 })
      }

      // Simulate payment failure for testing (if card number ends with 0000)
      if (cardNumber.endsWith("0000")) {
        return NextResponse.json({ error: "Payment declined by bank" }, { status: 402 })
      }
    }

    // Generate mock payment ID
    const paymentId = `pay_${Math.random().toString(36).substr(2, 9)}`
    const transactionId = `txn_${Math.random().toString(36).substr(2, 9)}`

    // Mock successful payment response
    const paymentResult = {
      id: paymentId,
      transactionId,
      status: "succeeded",
      amount,
      currency,
      paymentMethod,
      createdAt: new Date().toISOString(),
      receipt: {
        id: paymentId,
        amount,
        currency,
        description: "SoleStore Purchase",
        receiptUrl: `https://solestore.com/receipts/${paymentId}`,
      },
    }

    return NextResponse.json({
      success: true,
      payment: paymentResult,
      message: "Payment processed successfully",
    })
  } catch (error) {
    console.error("Payment processing error:", error)
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 })
  }
}
