import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { name, ingredients } = body;

  const mix = await prisma.mix.create({
    data: {
      name,
      ingredients: {
        create: ingredients
      }
    },
    include: {
      ingredients: true
    }
  });

  return new Response(JSON.stringify(mix), { status: 201 });
}
