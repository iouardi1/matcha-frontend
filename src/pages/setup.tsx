import Bio from "@/components/profile/Bio";
import ImageUpload from "@/components/profile/ImageUpload";
import Tags from "@/components/profile/Tags";
import { profileInit, profileSetup } from "@/redux/features/profileSetupSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@/components/profile/Modal";
import Gender from "@/components/profile/Gender";
import IntrestedIn from "@/components/profile/IntrestedIn";
import Birthday from "@/components/profile/Birthday";
import Username from "@/components/profile/Username";
import Loading from "@/components/ui/loading";

export default function setup() {
	const dispatch = useDispatch();
	const error = useSelector((state: any) => state.profileSetup.error);
	const loading = useSelector((state: any) => state.profileSetup.loading);

	useEffect(() => {
		dispatch(profileInit())
	}, [])

	if(loading)
		return <Loading/>
	return (
		<>
			<Modal error={error} />
			<div className="w-full m-auto flex justify-center">
				<h1 className="font-bold text-xl">Create Account</h1>
			</div>
			<div className="flex items-center h-[calc(100vh-100px)]">
				<div className="w-1/2">
					<Birthday />
					<Gender />
					<IntrestedIn />
					<Bio />
					<Username/>
					<Tags />
				</div>
				<div className="w-1/2">
					<ImageUpload />
				</div>
			</div>
			<div className="flex items-center justify-center">
				<button
					className="bg-indigo-900 rounded-lg shadow text-center text-white text-base font-semibold w-[100px] py-3"
					onClick={() => dispatch(profileSetup())}
				>
					Continue
				</button>
			</div>
		</>
	);
}
