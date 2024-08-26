"use client"
import { useAuth } from '../hooks/useAuth';

export default function HomePage() {
  const { user } = useAuth();

  if (user) {
    return <div>Redirecting to todo page...</div>;
  } else {
    return <div>Redirecting to login page...</div>;
  }
}
