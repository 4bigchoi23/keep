import { NextRequest, NextResponse } from 'next/server';
// import { auth } from "@/auth";
// import { PrismaClient } from '@/prisma/client';
// const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  // const session = await auth();
  try {
    const req = await request.json();
    const res = NextResponse.next();
    console.log(req, res);
    return NextResponse.json(
      { message: 'Hello, World!' }, 
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // const session = await auth();
  try {
    const req = await request.json();
    const res = NextResponse.next();
    console.log(req, res);
    return NextResponse.json(
      { message: 'Hello, World!' }, 
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  // const session = await auth();
  try {
    const req = await request.json();
    const res = NextResponse.next();
    console.log(req, res);
    return NextResponse.json(
      { message: 'Hello, World!' }, 
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}
