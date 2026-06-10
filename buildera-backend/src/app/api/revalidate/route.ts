import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const secret = process.env.NEXTJS_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: 'Not configured' }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get('x-revalidate-signature') ?? '';
  const expected = crypto.createHmac('sha256', secret).update(body).digest('hex');

  if (
    signature.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
  ) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  let tag: string;
  try {
    const parsed = JSON.parse(body) as { tag?: unknown };
    tag = parsed.tag as string;
    if (!tag || typeof tag !== 'string') throw new Error('missing tag');
  } catch {
    return NextResponse.json({ message: 'Invalid payload' }, { status: 422 });
  }

  revalidateTag(tag);
  return NextResponse.json({ revalidated: true, tag }, { status: 200 });
}
