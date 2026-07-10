import ReactMarkdown from 'react-markdown';
import { T, FS } from './tokens';

// Post content rendered as ink on paper: Special Elite prose, blueprint-blue
// headings and rules, radius 0 everywhere. No raw HTML is rendered.
export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h2 style={{ fontFamily: T.mono, fontSize: FS.heading, color: T.blue, letterSpacing: 2, textTransform: 'uppercase', margin: '32px 0 14px' }}>
            {children}
          </h2>
        ),
        h2: ({ children }) => (
          <h3 style={{ fontFamily: T.mono, fontSize: FS.prose, color: T.blue, letterSpacing: 2, textTransform: 'uppercase', margin: '28px 0 12px' }}>
            {children}
          </h3>
        ),
        h3: ({ children }) => (
          <h4 style={{ fontFamily: T.mono, fontSize: FS.detail, color: T.blue, letterSpacing: 1, textTransform: 'uppercase', margin: '24px 0 10px' }}>
            {children}
          </h4>
        ),
        p: ({ children }) => (
          <p style={{ fontFamily: T.body, fontSize: FS.prose, color: T.ink, lineHeight: 1.8, margin: '0 0 14px' }}>
            {children}
          </p>
        ),
        a: ({ href, children }) => (
          <a href={href} style={{ color: T.blue, textDecorationColor: 'rgba(24,56,90,0.4)' }}>
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul style={{ fontFamily: T.body, fontSize: FS.prose, color: T.ink, lineHeight: 1.8, margin: '0 0 14px', paddingLeft: 22 }}>
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol style={{ fontFamily: T.body, fontSize: FS.prose, color: T.ink, lineHeight: 1.8, margin: '0 0 14px', paddingLeft: 22 }}>
            {children}
          </ol>
        ),
        blockquote: ({ children }) => (
          <blockquote style={{ borderLeft: `2px solid ${T.blue}`, margin: '0 0 14px', padding: '2px 0 2px 16px', color: T.ink2 }}>
            {children}
          </blockquote>
        ),
        code: ({ children, className }) => className ? (
          // Fenced block (react-markdown adds language-* className)
          <code style={{ fontFamily: T.mono, fontSize: FS.detail, color: T.ink2, display: 'block' }}>
            {children}
          </code>
        ) : (
          <code style={{ fontFamily: T.mono, fontSize: FS.detail, color: T.ink2, background: 'rgba(24,56,90,0.08)', padding: '1px 5px' }}>
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre style={{
            border: '1px solid rgba(24,56,90,0.27)',
            background: 'rgba(244,234,204,0.5)',
            padding: '14px 16px',
            margin: '0 0 14px',
            overflowX: 'auto',
          }}>
            {children}
          </pre>
        ),
        hr: () => (
          <div style={{ fontFamily: T.mono, fontSize: FS.detail, color: T.fade, letterSpacing: 3, textAlign: 'center', margin: '26px 0' }}>
            * * *
          </div>
        ),
        img: ({ src, alt }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt ?? ''} style={{ maxWidth: '100%', border: '1px solid rgba(24,56,90,0.27)' }} />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
