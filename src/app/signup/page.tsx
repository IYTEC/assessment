"use client"

import { useState, useContext } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { auth } from '../../lib/firebaseConfig';
import { useRouter } from 'next/navigation';
import RenderNotificationPopup from '../../components/Notification';
import { NotificationContext } from '../../contexts/NotificationProvider';
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const { state: notification, dispatch: setNotificationProp } = useContext(NotificationContext)


  const handleNotification = (message:string, status:boolean, type:string) => {
    setNotificationProp({
      type: 'UPDATE_MESSAGE',
      payload: { message, status, type }
    })
  }

  const handleSignupError = (error: any) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        handleNotification(error.message, true, 'error')
        break;    
      case 'auth/invalid-credential':
        handleNotification(error.message, true, 'error')
        break;    
      case 'auth/popup-closed-by-user':
        handleNotification(error.message, true, 'error')
        break;    
      default:
        break;
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      handleNotification("Passwords don't match", true, 'error')
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/todo');
    } catch (error) {
      console.error(error);
      handleSignupError(error)
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/todo');
    } catch (error) {
      console.error(error);
      handleSignupError(error)
    }
  };

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/todo');
    } catch (error) {
      console.error(error);
      handleSignupError(error)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="grid w-4/5 h-[50rem] grid-cols-1 md:grid-cols-2 gap-0 bg-white p-4 rounded-2xl">
        <div className="flex justify-center items-center">
          <div className="flex justify-between flex-col h-full">
            <div className='h-4/5 flex flex-col justify-center mt-10'>
              <h1 className="text-lg font-semibold mb-4 text-[#0C1421]">Hi 👋</h1>
              <h5 className="text-sm text-[#313957] mb-2">
                Today is a new day. It's your day. You shape it. <br />
                Sign up to get started.
              </h5>
              {notification?.status && <RenderNotificationPopup />}
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className='text-[#0C1421] text-sm mb-4'>Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="w-full placeholder:text-sm px-3 py-2 border bg-[#F7FbFF] border-gray-300 rounded-lg"

                    required
                  />
                </div>
                <div>
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
                    placeholder="Password"
                    className="w-full placeholder:text-sm px-3 py-2 border bg-[#F7FbFF] border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className='text-[#0C1421] text-sm mb-4'>Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <button type="submit" className="w-full h-12 bg-[#162D3A] font-medium text-sm text-white px-3 py-2 rounded-md">
                  Sign up
                </button>
                <div className='text-center'>
                  <Link className='underline' href="/login">Already have an account, Login</Link>
                </div>
              </form>
              <div className="flex items-center justify-center my-2">
                <div className="border-t border-gray-300 flex-grow mr-1"></div>
                <span className="text-gray-500">Or</span>
                <div className="border-t border-gray-300 flex-grow ml-1"></div>
              </div>
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
            <p className='text-center text-[#31395779] text-xs font-semibold uppercase mt-10'>©️ 2024 All rights reserved</p>
          </div>
        </div>
        <div className="rounded-2xl hidden bg-center text-[#313957] p-4 md:flex justify-center items-center" style={{ backgroundImage: "url('/auth_cover.png')" }}>
        </div>
      </div>
    </div>
  )
}
