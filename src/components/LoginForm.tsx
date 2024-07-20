"use client"

import { IconBrandGoogle, IconBrandTinder } from "@tabler/icons-react";
import React from "react";
import { SparklesCore } from "./ui/sparkles";

export default function LoginForm() {

	const handleSubmit =async (e:any) => {
		e.preventDefault()
		console.log('object');
		const res = await fetch(`http://localhost:3005/api/auth/login`, {
			method:"POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: "test@gmail.com" , password: "test"}),
		});
		console.log(res);
		if (res.status === 200) {
			location.href = "./profile"
		}
	}

	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
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
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<IconBrandTinder className="mx-auto h-10 w-auto" />
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
					Sign in to your account
				</h2>
			</div>
			
			<form
				action={"http://localhost:3005/api/auth/google"}
				className="flex flex-col mt-10 space-y-4 items-center sm:mx-auto sm:w-full sm:max-w-sm z-50"
			>
				<button
					className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
					type="submit"
				>
					<IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
					<span className="text-neutral-700 dark:text-neutral-300 text-sm">
						Continue with Google
					</span>
				</button>
			</form>

			<div className="flex flex-col mt-10 space-y-4 items-center sm:mx-auto sm:w-full sm:max-w-sm">
				Or
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm z-10">
				<form className="space-y-6" method="POST" onSubmit={handleSubmit}>
					<div>
						<label className="block text-sm font-medium leading-6 text-white">
							Email address
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label className="block text-sm font-medium leading-6 text-white">
								Password
							</label>
							<div className="text-sm">
								<a
									href="#"
									className="font-semibold text-indigo-600 hover:text-indigo-500"
								>
									Forgot password?
								</a>
							</div>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Sign in
						</button>
					</div>
				</form>
				<p className="mt-10 text-center text-sm text-gray-500">
					Not a member?
					<a
						href="./signup"
						className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
					>
						<span></span> register
					</a>
				</p>
			</div>
		</div>
	);
}
