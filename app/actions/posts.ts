'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { PostType } from '@prisma/client';

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/');
}

export async function createPost(formData: FormData) {
  await requireAdmin();

  const title   = formData.get('title') as string;
  const content = formData.get('content') as string;
  const type    = formData.get('type') as PostType;
  const published = formData.get('published') === 'on';

  const baseSlug = slugify(title);
  let slug = baseSlug;
  let i = 1;
  while (await prisma.post.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${i++}`;
  }

  await prisma.post.create({ data: { title, slug, content, type, published } });
  revalidatePath('/');
  revalidatePath('/edit');
  redirect('/edit');
}

export async function updatePost(id: number, formData: FormData) {
  await requireAdmin();

  const title     = formData.get('title') as string;
  const content   = formData.get('content') as string;
  const type      = formData.get('type') as PostType;
  const published = formData.get('published') === 'on';

  await prisma.post.update({
    where: { id },
    data: { title, content, type, published },
  });

  revalidatePath('/');
  revalidatePath('/edit');
  redirect('/edit');
}

export async function deletePost(id: number) {
  await requireAdmin();
  await prisma.post.delete({ where: { id } });
  revalidatePath('/');
  revalidatePath('/edit');
}
