import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { T, FS, PAPER } from '@/components/tokens';
import PostForm from './PostForm';
import DeleteButton from './DeleteButton';

export const metadata = { title: 'Edit — Shannonware' };

export default async function EditPage({
  searchParams,
}: {
  searchParams: { edit?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/');

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const editingId = searchParams.edit ? parseInt(searchParams.edit) : null;
  const editingPost = editingId ? posts.find(p => p.id === editingId) ?? null : null;

  return (
    <div style={{ ...PAPER, minHeight: '100vh', padding: '0 0 60px' }}>
      {/* Top bar */}
      <div style={{
        borderBottom: `2px solid ${T.blue}`,
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ fontFamily: T.mono, fontSize: FS.label, color: T.blue, textDecoration: 'none', letterSpacing: 2 }}>
          ← SHANNONWARE
        </Link>
        <span style={{ fontFamily: T.mono, fontSize: FS.label, color: T.fade, letterSpacing: 2 }}>
          EDIT MODE · {session.user?.email}
        </span>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>

        {/* Form: new or edit */}
        <h2 style={{ fontFamily: T.mono, fontSize: FS.heading, color: T.blue, letterSpacing: 3, marginBottom: 24, textTransform: 'uppercase' }}>
          {editingPost ? `Editing: ${editingPost.title}` : 'New Post'}
        </h2>
        <PostForm post={editingPost} />

        {/* Post list */}
        {posts.length > 0 && (
          <>
            <div style={{ borderTop: `1px solid ${T.blue}44`, margin: '40px 0 24px' }} />
            <h2 style={{ fontFamily: T.mono, fontSize: FS.heading, color: T.blue, letterSpacing: 3, marginBottom: 20, textTransform: 'uppercase' }}>
              All Posts
            </h2>
            {posts.map(post => (
              <div key={post.id} style={{
                borderBottom: `1px solid ${T.blue}22`,
                padding: '12px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
              }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: T.body, fontSize: FS.prose, color: T.ink }}>{post.title}</span>
                  <span style={{ fontFamily: T.mono, fontSize: FS.label, color: T.fade, marginLeft: 10, letterSpacing: 1 }}>
                    {post.type.toUpperCase()} · {post.published ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Link
                    href={`/edit?edit=${post.id}`}
                    style={{
                      fontFamily: T.mono, fontSize: FS.label, color: T.blue,
                      border: `1px solid ${T.blue}`, padding: '3px 8px',
                      textDecoration: 'none', letterSpacing: 1,
                    }}
                  >
                    EDIT
                  </Link>
                  <DeleteButton id={post.id} />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
