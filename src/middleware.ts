import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname?.startsWith('/listen-with-me')) {
    // get fetch auth token
  }

  return NextResponse.next()
}
