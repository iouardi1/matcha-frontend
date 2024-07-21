'use client'

import React, { useState } from "react";
import { cn } from "@/utils/cn";
import {
  IconBrandGoogle,
} from "@tabler/icons-react";
import { SparklesCore } from "../ui/sparkles";
import { authUser, registerUser } from "@/redux/authUser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";

export function RegisterForm() {
	const dispatch = useDispatch();
	const users = useSelector(state => state.items);
	const loading = useSelector(state => state.loading);
  	const error = useSelector(state => state.error);
	const [formData, setFormData] = useState({
		firstname: '',
		lastname: '',
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	  });
      // Handle form input change
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
	e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.error('Passwords do not match');
      return;
	}
    try {
      const response = await dispatch(registerUser(formData));
      setFormData({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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
	<div className="flex h-screen items-center">
		<div className="w-full absolute inset-0 h-screen">
			<SparklesCore
				id="tsparticlesfullpage"
				background="transparent"
				minSize={0.6}
				maxSize={1.4}
				particleDensity={100}
				className="w-full h-full"
				particleColor="#FFFFFF"
			/>
		</div>
		<div className="max-w-md w-full h-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input  z-10">
			<h2 className="font-bold text-xl text-center text-white">
				Welcome to Matcha
			</h2>
			<form className="my-8" onSubmit={handleSubmit}>
				{/* onSubmit={handleSubmit} */}
				<div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
					<LabelInputContainer>
						<label className="block text-sm font-medium leading-6 text-white">
							First Name
						</label>
						<input
							id="firstname"
							name="firstname"
							type="text"
							autoComplete=""
							onChange={handleChange}
							required
							// placeholder="First Name"
							className="pl-2 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</LabelInputContainer>

					<LabelInputContainer>
						<label className="block text-sm font-medium leading-6 text-white">
							Last Name
						</label>
						<input
							id="lastname"
							name="lastname"
							type="text"
							autoComplete=""
							onChange={handleChange}
							required
							// placeholder="Last Name"
							className="pl-2 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</LabelInputContainer>
				</div>

				<LabelInputContainer className="mb-4">
					<label className="block text-sm font-medium leading-6 text-white">
						Username
					</label>
					<div className="mt-2">
						<input
							id="username"
							name="username"
							type="text"
							autoComplete=""
							onChange={handleChange}
							required
							// placeholder="Username"
							className="pl-2 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</LabelInputContainer>

				<LabelInputContainer className="mb-4">
					<label className="block text-sm font-medium leading-6 text-white">
						Email address
					</label>
					<div className="mt-2">
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							onChange={handleChange}
							required
							// placeholder="projectmayhem@fc.com"
							className="pl-2 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</LabelInputContainer>

				<LabelInputContainer className="mb-4">
					<label className="block text-sm font-medium leading-6 text-white">
						Password
					</label>
					<div className="mt-2">
						<input
							id="password"
							name="password"
							type="password"
							autoComplete="current-password"
							onChange={handleChange}
							required
							placeholder="••••••••"
							className="pl-2 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</LabelInputContainer>

				<LabelInputContainer className="mb-8">
					<label className="block text-sm font-medium leading-6 text-white">
						Confirm Password
					</label>
					<div className="mt-2">
						<input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							autoComplete="current-password"
							onChange={handleChange}
							required
							placeholder="••••••••"
							className="pl-2 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</LabelInputContainer>

				<button
					className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					type="submit"
				>
					Sign up &rarr;
				</button>

				<div className="bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-8 h-[1px] w-full" />
			</form>
			<form action={process.env.API + "/auth/google"}>
				<div className="flex flex-col space-y-4 items-center">
					<button
						className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-[50%] text-black rounded-md h-10 font-medium shadow-input bg-gray-50"
						type="submit"
					>
						<IconBrandGoogle className="h-4 w-4 text-neutral-800" />
						<span className="text-neutral-700 text-sm">
							Google
						</span>
					</button>
				</div>
			</form>
		</div>
	</div>
	);
}

const LabelInputContainer = ({children, className}: {children: React.ReactNode; className?: string;}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default RegisterForm