import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import StaticPage from '@/components/StaticPage';
import Markdown from '@/components/Markdown';

export const dynamic = 'force-dynamic';

async function getPost(slug: string) {
  return prisma.post.findFirst({ where: { slug, published: true } });
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return { title: post ? `${post.title} — Shannonware` : 'Not Found — Shannonware' };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const p = (n: number) => String(n).padStart(2, '0');
  const d = post.createdAt;
  const stamp = `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())}`;

  return (
    <StaticPage label={`${post.type.toUpperCase()} · ${stamp}`} title={post.title}>
      <Markdown>{post.content}</Markdown>
    </StaticPage>
  );
}
