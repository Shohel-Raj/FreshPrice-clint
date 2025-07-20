import { Link, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import { imageUpload, saveUserInDb } from '../../api/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
useEffect(() => {
    document.title = `${import.meta.env.VITE_site_name} | Sign Up`;
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form?.image?.files[0];

    try {
      const imageUrl = await imageUpload(image);
      const result = await createUser(email, password);
      await updateUserProfile(name, imageUrl);

      const userData = { name, email, image: imageUrl };
      await saveUserInDb(userData);

      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email });
      localStorage.setItem('auth-token', data.token);

      toast.success('Signup Successful');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error(err?.message || 'Signup failed');
    } finally {
      setSubmitting(false);
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
      await saveUserInDb(userData);

      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
        email: result?.user?.email,
      });
      localStorage.setItem('auth-token', data.token);

      toast.success('Signup Successful');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error(err?.message || 'Google Sign-In failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F9EDE1] px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#FBD536]">Sign Up</h1>
          <p className="text-gray-500 mt-2">Welcome to FreshPrice!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your full name"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FBD536]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full mt-1 cursor-pointer file:rounded-md file:border-0 file:px-3 file:py-2 file:bg-[#FBD536]/20 file:text-[#FBD536]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FBD536]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              required
              autoComplete="new-password"
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#FBD536]"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || loading}
            className="w-full py-3 rounded-lg bg-[#FBD536] text-white font-semibold hover:bg-[#f6c400] transition-all duration-200 cursor-pointer"
          >
            {submitting || loading ? (
              <TbFidgetSpinner className="animate-spin mx-auto" size={24} />
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-2">
          <span className="w-full h-px bg-gray-200" />
          <p className="w-full text-center">or continue with</p>
          <span className="w-full h-px bg-gray-200" />
        </div>

        <motion.div
          whileTap={{ scale: 0.95 }}
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-3 border py-2 rounded-lg cursor-pointer hover:bg-[#f9f2e5] transition-all"
        >
          <FcGoogle size={24} />
          <span className="text-sm font-medium text-gray-700">Sign up with Google</span>
        </motion.div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-[#FBD536] hover:underline hover:text-[#f6c400] cursor-pointer"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
