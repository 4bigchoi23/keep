import { NextRequest, NextResponse } from 'next/server';
import { auth } from "@/auth";
import { PrismaClient } from '@/prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  try {
    return NextResponse.json(
      { message: 'Hello, World!' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();
  try {
    const data = await request.json();
    data.userId = session?.user?.id ?? '';

    if ( !data.userId ) {
      return NextResponse.json(
        { error: 'Sign In is required.' },
        { status: 400 }
      );
    }
    if ( !data.title || !data.url ) {
      return NextResponse.json(
        { error: 'Title and URL are required.' },
        { status: 400 }
      );
    }

    await prisma.keep.create({ data });

    return NextResponse.json(
      { message: 'Keep created successfully.' },
      { status: 201 }
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
  const session = await auth();
  try {
    const data = await request.json();
    data.userId = session?.user?.id ?? '';

    if ( !data.userId ) {
      return NextResponse.json(
        { error: 'Sign In is required.' },
        { status: 400 }
      );
    }

    if (session?.user?.role === 'admin') {
      await prisma.keep.delete({
        where: {
          id: data.id,
        },
      });
    } else {
      await prisma.keep.delete({
        where: {
          id: data.id,
          userId: data.userId,
        },
      });
    }

    return NextResponse.json(
      { message: 'Keep deleted successfully.' },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}
