import type {Metadata} from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'AgentBase',
  description: 'An AI Tools and Agents Catalog',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
