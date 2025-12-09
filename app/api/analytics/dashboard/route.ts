import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "30d" // 7d, 30d, 90d, 1y

    // Mock analytics data
    const analytics = {
      revenue: {
        current: 45231.89,
        previous: 37654.21,
        change: 20.1,
        trend: "up",
      },
      orders: {
        current: 2350,
        previous: 1298,
        change: 81.1,
        trend: "up",
      },
      customers: {
        current: 573,
        previous: 372,
        change: 54.0,
        trend: "up",
      },
      products: {
        current: 1234,
        previous: 1156,
        change: 6.7,
        trend: "up",
      },
      conversionRate: {
        current: 3.2,
        previous: 2.8,
        change: 14.3,
        trend: "up",
      },
      averageOrderValue: {
        current: 89.45,
        previous: 82.31,
        change: 8.7,
        trend: "up",
      },
      topProducts: [
        { id: 1, name: "Air Max Revolution", sales: 234, revenue: 30426.66 },
        { id: 2, name: "Ultra Boost 22", sales: 189, revenue: 35898.11 },
        { id: 3, name: "Chuck Taylor All Star", sales: 156, revenue: 10294.44 },
        { id: 4, name: "Old Skool Classic", sales: 143, revenue: 11438.57 },
      ],
      recentOrders: [
        {
          id: "ORD-001",
          customer: "John Doe",
          amount: 129.99,
          status: "completed",
          date: "2024-01-15",
        },
        {
          id: "ORD-002",
          customer: "Jane Smith",
          amount: 189.99,
          status: "processing",
          date: "2024-01-14",
        },
        {
          id: "ORD-003",
          customer: "Mike Johnson",
          amount: 65.99,
          status: "shipped",
          date: "2024-01-13",
        },
      ],
      salesChart: {
        labels: ["Jan 1", "Jan 8", "Jan 15", "Jan 22", "Jan 29"],
        data: [12500, 15200, 18900, 22100, 25800],
      },
    }

    return NextResponse.json({ analytics, period })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
