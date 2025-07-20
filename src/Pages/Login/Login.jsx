import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import useAuth from '../../hooks/useAuth';
import { saveUserInDb } from '../../api/utils';
import LoadingSpinner from '../../Component/Shared Comonent/LoadingSpinner/LoadingSpinner';
import axios from 'axios';
import { useEffect } from 'react';

const Login = () => {
  const { signIn, signInWithGoogle, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';
useEffect(() => {
    document.title = `${import.meta.env.VITE_site_name} | Login`;
  }, []);
  if (user) return <Navigate to={from} replace />;
  if (loading) return <LoadingSpinner />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn(email, password);
      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      };

      await saveUserInDb(userData);
      localStorage.setItem('auth-token', (await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email })).data.token);
      toast.success('Login Successful');
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.message || 'Login failed');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      };
      localStorage.setItem('auth-token', (await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email: result?.user?.email })).data.token);
      await saveUserInDb(userData);
      toast.success('Login Successful');
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err?.message || 'Google Sign-In failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9EDE1] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FBD536]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FBD536]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#FBD536] text-white rounded-lg font-semibold transition hover:brightness-90"
          >
            {loading ? <TbFidgetSpinner className="animate-spin mx-auto" size={20} /> : 'Log In'}
          </button>
        </form>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium shadow-sm hover:shadow-md transition cursor-pointer"
        >
          <FcGoogle size={24} />
          Continue with Google
        </button>

        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-[#FBD536] font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
