import { prisma } from '@/lib/prisma';
import HomeClient from './HomeClient';

function stamp(d: Date) {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())}`;
}

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    select: { title: true, slug: true, content: true, type: true, createdAt: true },
  });

  const articles = posts
    .filter((p) => p.type === 'article')
    .map(({ title, slug }) => ({ title, slug }));

  const stories = posts
    .filter((p) => p.type === 'story')
    .map(({ title, slug, content, createdAt }) => ({
      title,
      slug,
      content,
      date: stamp(createdAt),
    }));

  return <HomeClient articles={articles} stories={stories} />;
}
