import type { Metadata } from 'next';
import './globals.css';
import SessionProvider from '@/components/SessionProvider';

export const metadata: Metadata = {
  title: 'Shannonware — Shannon Douglas Ware',
  description: 'Software engineer · Bantry, Co. Cork · Interface Systems · Applied Computing · Hire Inquiries Open',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
