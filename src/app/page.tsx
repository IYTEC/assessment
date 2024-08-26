"use client"
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

export default function HomePage() {
  const { user } = useAuth();

  if (user) {
    return <div>
      <Link href="/todo">Go to Todo list</Link>
    </div>
  } else {
    return <div>
      <p>Sign up/Login using Google Auth</p>
      <Link href="/login">Go to Login</Link>;
      </div>
  }
}
