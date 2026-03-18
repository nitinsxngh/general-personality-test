import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getFirebaseAdmin } from '@/lib/firebaseAdmin';

const COOKIE_NAME = process.env.ILC_SESSION_COOKIE_NAME || 'ilc_session';

export async function GET() {
  const sessionCookie = cookies().get(COOKIE_NAME)?.value;
  if (!sessionCookie) {
    return NextResponse.json({ ok: true, hasCookie: false, verified: false });
  }

  try {
    const admin = getFirebaseAdmin();
    const decoded = await admin.auth().verifySessionCookie(sessionCookie, true);
    return NextResponse.json({
      ok: true,
      hasCookie: true,
      verified: true,
      uid: decoded.sub
    });
  } catch (e: any) {
    return NextResponse.json({
      ok: true,
      hasCookie: true,
      verified: false,
      error: e?.message || 'Verification failed'
    });
  }
}

