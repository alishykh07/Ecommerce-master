import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  return (
    <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-balance">Stay in the Loop</h2>
            <p className="text-lg opacity-90 text-pretty">
              Get the latest updates on new releases, exclusive deals, and sneaker drops delivered straight to your
              inbox.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email" className="bg-white text-black border-0 flex-1" />
            <Button variant="secondary" className="px-8">
              Subscribe
            </Button>
          </div>

          <p className="text-sm opacity-75">Join 50,000+ sneaker enthusiasts. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  )
}
