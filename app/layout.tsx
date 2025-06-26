import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { StoreProvider } from '../components/providers/StoreProvider';
import { CustomThemeProvider } from '../components/providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dynamic Data Table Manager',
  icons: {
    icon: '/favicon.png',
  },
  description: 'Advanced data table with import/export, sorting, filtering, and inline editing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <CustomThemeProvider>
            {children}
          </CustomThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}