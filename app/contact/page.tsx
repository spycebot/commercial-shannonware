import StaticPage from '@/components/StaticPage';

export const metadata = { title: 'Contact — Shannonware' };

export default function ContactPage() {
  return (
    <StaticPage label="CONTACT" title="Contact">
      <p>
        To reach{' '}
        <a href="http://www.terzotechnical.com" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>
          Terzo Technical
        </a>{' '}
        please contact{' '}
        <a href="https://shannonware.com" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>
          Shannon Ware
        </a>{' '}
        at{' '}
        <a
          href="mailto:photius@shannonware.com?subject=Incoming%20Email%20from%20Internet%20Web%20Page&body=Hello%20Terzo%20Technical!"
          target="_blank"
          rel="noreferrer"
          style={{ color: 'inherit' }}
        >
          photius at shannonware dot com
        </a>
        .
      </p>
    </StaticPage>
  );
}
