import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { T, PAPER } from '@/components/tokens';
import Link from 'next/link';

export const metadata = { title: 'Edit — Shannonware' };

export default async function EditPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

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
        <Link href="/" style={{
          fontFamily: T.mono,
          fontSize: 10,
          color: T.blue,
          textDecoration: 'none',
          letterSpacing: 2,
        }}>
          ← SHANNONWARE
        </Link>
        <span style={{ fontFamily: T.mono, fontSize: 9, color: T.fade, letterSpacing: 2 }}>
          EDIT MODE
        </span>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>
        <h1 style={{
          fontFamily: T.mono,
          fontSize: 22,
          color: T.blue,
          letterSpacing: 3,
          borderBottom: `1px solid ${T.blue}44`,
          paddingBottom: 12,
          marginBottom: 32,
          textTransform: 'uppercase',
        }}>
          Content Editor
        </h1>

        <p style={{ fontFamily: T.body, fontSize: 14, color: T.ink, lineHeight: 1.8, marginBottom: 24 }}>
          Content editor coming soon. Articles and stories will be authored here in Markdown and saved to the database.
        </p>

        <div style={{
          border: `1px solid ${T.blue}44`,
          padding: '16px',
          fontFamily: T.mono,
          fontSize: 10,
          color: T.fade,
          letterSpacing: 1,
        }}>
          OPERATOR: {session.user?.email}
        </div>
      </div>
    </div>
  );
}
