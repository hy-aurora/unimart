import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between gap-8">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-primary">UniMart</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            The marketplace for university students to buy and sell items safely within their campus community.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-muted-foreground hover:text-foreground">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/sell" className="text-sm text-muted-foreground hover:text-foreground">
                  Sell an item
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-sm text-muted-foreground hover:text-foreground">
                  Safety Tips
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container px-4 md:px-6 mt-8 pt-6 border-t">
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} UniMart. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
