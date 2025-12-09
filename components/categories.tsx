import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "Running",
    image: "/running-shoes-on-track.jpg",
    href: "/category/running",
    description: "Performance running shoes",
  },
  {
    name: "Basketball",
    image: "/basketball-sneakers-on-court.jpg",
    href: "/category/basketball",
    description: "High-top basketball shoes",
  },
  {
    name: "Lifestyle",
    image: "/casual-lifestyle-sneakers.jpg",
    href: "/category/lifestyle",
    description: "Everyday casual wear",
  },
  {
    name: "Training",
    image: "/cross-training-athletic-shoes.jpg",
    href: "/category/training",
    description: "Cross-training footwear",
  },
]

export function Categories() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Shop by Category</h2>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Find the perfect shoes for every activity and lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.href} className="group">
              <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
