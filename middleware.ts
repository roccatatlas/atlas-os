import { NextRequest, NextResponse } from "next/server";

// Einfachster möglicher Schutz für /admin:
// ADMIN_SECRET in .env.local setzen, dann mit ?secret=... aufrufen
// oder später durch Supabase Auth ersetzen.
//
// Für Production: Supabase Auth + Session-Check empfohlen.

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const secret = req.nextUrl.searchParams.get("secret");
    const cookie = req.cookies.get("atlas_admin")?.value;

    const adminSecret = process.env.ADMIN_SECRET ?? "changeme";

    // Cookie gesetzt → durchlassen
    if (cookie === adminSecret) return NextResponse.next();

    // Secret als Query-Param → Cookie setzen + redirect
    if (secret === adminSecret) {
      const res = NextResponse.redirect(
        new URL("/admin", req.url)
      );
      res.cookies.set("atlas_admin", adminSecret, {
        httpOnly: true,
        maxAge: 60 * 60 * 8, // 8 Stunden
        path: "/admin",
      });
      return res;
    }

    // Kein Zugang
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
