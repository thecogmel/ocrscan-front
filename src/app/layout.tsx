import BaseProvider from 'context/BaseProvider';
import { authOptions } from 'libs/authOptions';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OCR Scan',
  description: 'Generated by Erick Medeiros',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html className="h-full bg-[#ecf0f2]" lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <BaseProvider session={session}>{children}</BaseProvider>
      </body>
    </html>
  );
}
