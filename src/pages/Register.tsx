import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import AuthLayout from '../components/AuthLayout';
import { EyeIcon, EyeOffIcon, UserIcon, LockIcon, MailIcon } from 'lucide-react';
const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    isLoading
  } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !name || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    const success = await register(email, name, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Email already in use');
    }
  };
  return <AuthLayout title="Create your account">
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div className="relative">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <MailIcon className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-t-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="relative">
            <label htmlFor="name" className="sr-only">
              Full name
            </label>
            <UserIcon className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <input id="name" name="name" type="text" autoComplete="name" required className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <LockIcon className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="button" className="absolute top-3 right-3" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOffIcon className="h-5 w-5 text-gray-400" /> : <EyeIcon className="h-5 w-5 text-gray-400" />}
            </button>
          </div>
          <div className="relative">
            <label htmlFor="confirm-password" className="sr-only">
              Confirm password
            </label>
            <LockIcon className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <input id="confirm-password" name="confirm-password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required className="appearance-none rounded-b-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          </div>
        </div>
        <div>
          <button type="submit" disabled={isLoading} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            {isLoading ? <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              </span> : null}
            Sign up
          </button>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>;
};
export default Register;