import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/redux/slices/authSlice';
import { cn } from '@/utils/cn';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import { authUser } from '@/redux/authUser';

const LabelInputContainer = ({children, className}: {children: React.ReactNode; className?: string;}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.items);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
      // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await dispatch(authUser(formData));
        console.log('Login successful', response);
        setFormData({
          email: '',
          password: ''
        });
      } catch (error) {
        console.error('Login failed', error);
      }
  };


  if (error) {
    return <div>Error! {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    // <div className="flex h-screen items-center justify-center">
      <div className="background flex h-screen items-center justify-center">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      <div className="relative max-w-md w-full p-4 md:p-8 shadow-input bg-white dark:bg-black rounded-none md:rounded-2xl">
        <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
          Welcome to Matcha
        </h2>
        <form className="my-8" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <LabelInputContainer>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="example@example.com"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password"
                placeholder="••••••••" 
                type="password"
                value={formData.password}
                onChange={handleChange} />
            </LabelInputContainer>
            
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#">Forgot Password?</a>
                </div>
            <button
              className="relative group/btn bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] w-full"
              type="submit"
              >
              Sign in &rarr;
              <BottomGradient />
            </button>
              <div className="register-link">
                <p>Don't have an account? <a href="/auth/register">Register</a></p>
              </div>
            </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
