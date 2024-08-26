"use client"
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { auth } from '../../lib/firebaseConfig';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/todo');
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/todo');
    } catch (error) {
      console.error(error);
    }
  };

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/todo');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="grid w-4/5 h-[50rem] grid-cols-1 md:grid-cols-2 gap-0 bg-white p-4 rounded-2xl">
        <div className="flex justify-center items-center">
          <div className="flex justify-between flex-col h-full">
            <div className='h-4/5 flex flex-col justify-center mt-20'>
              <h1 className="text-lg font-semibold mb-4 text-[#0C1421]">Welcome back 👋</h1>
              <h5 className="text-sm text-[#313957] mb-4">
                Today is a new day. It's your day. You shape it. <br />
                Sign in to start managing your projects.
              </h5>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className='mt-5'>
                  <label className='text-[#0C1421] text-sm mb-4'>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full placeholder:text-sm px-3 py-2 border bg-[#F7FbFF] border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className='text-[#0C1421] text-sm mb-4'>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 Characters"
                    className="w-full placeholder:text-sm px-3 py-2 border bg-[#F7FbFF] border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <p className='text-right font-medium text-[#1e4ae9bd] text-xs'>Forgot Password?</p>

                <button type="submit" className="w-full h-12 bg-[#162D3A] font-medium text-sm text-white px-3 py-2 rounded-md">
                  Sign in
                </button>
              </form>
              <div className="flex items-center justify-center my-4">
                <div className="border-t border-gray-300 flex-grow mr-3"></div>
                <span className="text-gray-500">Or</span>
                <div className="border-t border-gray-300 flex-grow ml-3"></div>
              </div>
              <div className="mt-4 flex flex-col space-y-2">
                <button onClick={handleGoogleSignIn} className="bg-[#F3F9F4] flex items-center justify-center h-12 w-full text-sm font-medium text-[#313957] px-3 py-2 rounded">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center">
                    <img
                      src="/google.png"
                      alt="Avatar"
                      className="object-cover w-full h-full mr-3"
                    />
                  </div>
                  <span>Sign in with Google</span>
                </button>
                <button onClick={handleFacebookSignIn} className="bg-[#F3F9F4] flex items-center justify-center h-12 w-full text-sm font-medium text-[#313957] px-3 py-2 rounded">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center">
                    <img
                      src="/facebook.png"
                      alt="Avatar"
                      className="object-cover w-full h-full mr-3"
                    />
                  </div>
                  <span>Sign in with Facebook</span>
                </button>
              </div>
            </div>
            <p className='text-center text-[#31395779] text-xs font-semibold uppercase mt-10'>©️ 2024 All rights reserved</p>
          </div>
        </div>
        <div className="rounded-2xl hidden bg-center text-[#313957] p-4 md:flex justify-center items-center" style={{ backgroundImage: "url('/auth_cover.png')" }}>
        </div>
      </div>
    </div>
  );
}
