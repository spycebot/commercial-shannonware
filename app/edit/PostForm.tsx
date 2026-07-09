'use client';

import { useRef } from 'react';
import { createPost, updatePost } from '@/app/actions/posts';
import { T, FS } from '@/components/tokens';
import type { Post } from '@prisma/client';

const input: React.CSSProperties = {
  width: '100%',
  fontFamily: T.body,
  fontSize: FS.prose,
  color: T.ink,
  background: 'rgba(255,255,255,0.35)',
  border: `1px solid ${T.blue}66`,
  padding: '8px 10px',
  boxSizing: 'border-box',
  outline: 'none',
  marginBottom: 14,
};

export default function PostForm({ post }: { post: Post | null }) {
  const formRef = useRef<HTMLFormElement>(null);

  const action = post
    ? updatePost.bind(null, post.id)
    : createPost;

  return (
    <form ref={formRef} action={action}>
      {/* Title */}
      <label style={{ fontFamily: T.mono, fontSize: FS.label, color: T.blue, letterSpacing: 2, display: 'block', marginBottom: 4 }}>
        TITLE
      </label>
      <input
        name="title"
        required
        defaultValue={post?.title ?? ''}
        style={input}
      />

      {/* Type */}
      <label style={{ fontFamily: T.mono, fontSize: FS.label, color: T.blue, letterSpacing: 2, display: 'block', marginBottom: 4 }}>
        TYPE
      </label>
      <select
        name="type"
        defaultValue={post?.type ?? 'article'}
        style={{ ...input, marginBottom: 14 }}
      >
        <option value="article">Article</option>
        <option value="story">Story</option>
      </select>

      {/* Content */}
      <label style={{ fontFamily: T.mono, fontSize: FS.label, color: T.blue, letterSpacing: 2, display: 'block', marginBottom: 4 }}>
        CONTENT (MARKDOWN)
      </label>
      <textarea
        name="content"
        required
        defaultValue={post?.content ?? ''}
        rows={20}
        style={{ ...input, resize: 'vertical', lineHeight: 1.6 }}
      />

      {/* Published */}
      <label style={{
        display: 'flex', alignItems: 'center', gap: 8,
        fontFamily: T.body, fontSize: FS.detail, color: T.ink,
        cursor: 'pointer', marginBottom: 20,
      }}>
        <input
          type="checkbox"
          name="published"
          defaultChecked={post?.published ?? false}
          style={{ accentColor: T.blue }}
        />
        Published
      </label>

      <div style={{ display: 'flex', gap: 10 }}>
        <button type="submit" style={{
          fontFamily: T.mono, fontSize: FS.label, letterSpacing: 2,
          color: '#fff', background: T.blue,
          border: 'none', padding: '10px 20px', cursor: 'pointer',
        }}>
          {post ? 'SAVE CHANGES' : 'CREATE POST'}
        </button>
        {post && (
          <a href="/edit" style={{
            fontFamily: T.mono, fontSize: FS.label, letterSpacing: 2,
            color: T.blue, border: `1px solid ${T.blue}`,
            padding: '10px 20px', textDecoration: 'none',
          }}>
            CANCEL
          </a>
        )}
      </div>
    </form>
  );
}
