"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { useAuth } from '../hooks/useAuth';
import { AuthProvider } from '../contexts/AuthContext';
import NotificationProvider from '../contexts/NotificationProvider';
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

