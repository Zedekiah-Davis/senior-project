// app/api/memberships/route.ts
import { createMembership } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const userData = await request.json();
    const result = await createMembership(userData);
    
    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Membership creation failed:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}