import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const mixes = await prisma.mix.findMany({
    include: { ingredients: true },
    orderBy: { createdAt: 'desc' },
  });

  return new Response(JSON.stringify(mixes), { status: 200 });
}
