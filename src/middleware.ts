import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const middleware = async (req: NextRequest) => {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL('/', req.nextUrl).href);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/home'],
};
export default middleware;
