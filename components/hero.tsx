import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-balance">
                Step Into
                <span className="block text-primary">Your Style</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-md">
                Discover the latest collection of premium sneakers and athletic footwear from top brands.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
                <Link href="/collections">View Collections</Link>
              </Button>
            </div>

            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Free Shipping
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                30-Day Returns
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Authentic Products
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
              <img src="/modern-athletic-sneaker-floating-on-gradient-backg.jpg" alt="Featured sneaker" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-full p-4 shadow-lg">
              <span className="text-sm font-semibold">New Arrivals</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
