import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import { cn } from "@/utils/cn";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { authUser } from "@/redux/authUser";
import { IconBrandGoogle, IconBrandTinder } from "@tabler/icons-react";
import { SparklesCore } from "../ui/sparkles";

const LoginForm = () => {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.items);
	const loading = useSelector((state) => state.loading);
	const error = useSelector((state) => state.error);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	// Handle form input change
	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await dispatch(authUser(formData));
			setFormData({
				email: "",
				password: "",
			});
		} catch (error) {
			console.error("Login failed", error);
		}
	};

	if (error) {
		return <div>Error! {error.message}</div>;
	}

	if (loading) {
		return <div>Loading...</div>;
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
				action={`${process.env.API}/auth/google`}
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
						<label className="block text-sm font-medium leading-6 text-white ">
							Email address
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="email"
								type="email"
								onChange={handleChange}
								autoComplete="email"
								required
								className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
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
								onChange={handleChange}
								autoComplete="current-password"
								required
								className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
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
						href="./register"
						className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
					>
						<span></span> register
					</a>
				</p>
			</div>
		</div>
	);
};

export default LoginForm;
