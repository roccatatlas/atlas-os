import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="text-8xl font-black text-white/10 mb-4">404</p>
      <h1 className="text-2xl font-bold text-white mb-2">Page not found</h1>
      <p className="text-white/40 mb-8">This page doesn&apos;t exist in the atlas.</p>
      <Link
        href="/"
        className="px-5 py-2.5 bg-cyan-400 text-black font-semibold rounded-xl hover:bg-cyan-300 transition-all"
      >
        ← Back to Atlas
      </Link>
    </div>
  )
}
