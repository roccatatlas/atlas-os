import Link from 'next/link'

const FOOTER_LINKS = {
  Discover: [
    { href: '/tools', label: 'All Tools' },
    { href: '/categories', label: 'Categories' },
    { href: '/stacks', label: 'Stack Library' },
    { href: '/search', label: 'Search' },
  ],
  Build: [
    { href: '/generate', label: 'Stack Generator' },
    { href: '/stacks', label: 'Browse Stacks' },
  ],
  Company: [
    { href: '#', label: 'About' },
    { href: '#', label: 'Blog' },
    { href: '#', label: 'Contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <span className="text-black font-black text-sm">A</span>
              </div>
              <span className="font-bold text-white">RunAtlas</span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed">
              Discover, compare, and deploy the best AI tools for your workflow.
            </p>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white/70 mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white/70 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} RunAtlas. All rights reserved.
          </p>
          <p className="text-sm text-white/20">
            Built on{' '}
            <span className="text-cyan-400/60">ATLAS OS</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
