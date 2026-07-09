'use client';

import { deletePost } from '@/app/actions/posts';
import { T, FS } from '@/components/tokens';

export default function DeleteButton({ id }: { id: number }) {
  async function handleDelete() {
    if (!confirm('Delete this post?')) return;
    await deletePost(id);
  }

  return (
    <button
      onClick={handleDelete}
      style={{
        fontFamily: T.mono, fontSize: FS.label, color: '#a00',
        border: '1px solid #a0000066', padding: '3px 8px',
        background: 'none', cursor: 'pointer', letterSpacing: 1,
      }}
    >
      DELETE
    </button>
  );
}
