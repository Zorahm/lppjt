import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
  })

  const isAuthenticated = !!token
  const path = request.nextUrl.pathname

  console.log("Middleware:", { path, isAuthenticated, token: !!token })

  // Если пользователь не аутентифицирован и пытается получить доступ к защищенным маршрутам
  if (!isAuthenticated && (path.startsWith("/dashboard") || path === "/schedule" || path === "/vacation")) {
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  // Если пользователь аутентифицирован и пытается зайти на страницу логина
  if (isAuthenticated && path === "/login") {
    const userRole = token.role as string

    // Перенаправляем в зависимости от роли
    if (["admin", "hr", "section_manager"].includes(userRole)) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    } else {
      return NextResponse.redirect(new URL("/schedule", request.url))
    }
  }

  // Если пользователь аутентифицирован
  if (isAuthenticated) {
    const userRole = token.role as string

    // Если обычный сотрудник или менеджер участка пытается получить доступ к админке
    if (path.startsWith("/dashboard") && !["admin", "hr", "section_manager"].includes(userRole)) {
      return NextResponse.redirect(new URL("/schedule", request.url))
    }

    // Если админ или HR пытается получить доступ к странице расписания, НЕ перенаправляем
    // Позволяем им видеть страницу расписания, если они хотят
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/schedule", "/vacation", "/login"],
}
