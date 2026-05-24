import StaticPage from '@/components/StaticPage';

export const metadata = { title: 'Terms of Use — Shannonware' };

export default function TermsPage() {
  return (
    <StaticPage label="TERMS OF USE" title="Terms of Use">
      <p>The web application Shannon Douglas Ware (shannonware.com) is provided as-is and without warranty.</p>
      <h3 style={{ fontFamily: 'inherit', fontSize: 15, color: 'inherit', marginTop: 24, marginBottom: 8 }}>Advisory</h3>
      <p>Google anonymised usage statistics cookies are used on this site.</p>
      <h3 style={{ fontFamily: 'inherit', fontSize: 15, color: 'inherit', marginTop: 24, marginBottom: 8 }}>Disclaimer</h3>
      <p>To the extent permitted by law, we exclude all warranties, express, statutory, or implied. We expressly disclaim the warranties or conditions of noninfringement, merchantability, and fitness for a particular purpose.</p>
    </StaticPage>
  );
}
