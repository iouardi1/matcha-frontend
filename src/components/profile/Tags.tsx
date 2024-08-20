import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addSelectedInterest,
	deleteSelectedInterest,
} from "@/redux/features/profileSetupSlice";
export default function Tags() {
	const dispatch = useDispatch();

	const suggestedInterests = useSelector(
		(state: any) => state.profileSetup.interests,
	);

	const selectedInterests = useSelector(
		(state: any) => state.profileSetup.selectedInterests,
	);

	return (
		<div className="flex flex-col items-center mt-4">
			<div className="mb-4">
				<h1>Choose Your Interests</h1>
			</div>
			<div className="flex flex-wrap gap-2">
				{suggestedInterests.map((interest: any) => (
					<span
						key={interest}
						className=" cursor-pointer center relative inline-block select-none whitespace-nowrap rounded-lg bg-indigo-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white"
						onClick={() => dispatch(addSelectedInterest(interest))}
					>
						{interest}
					</span>
				))}
			</div>

			<div className="mt-4 flex flex-col items-center">
				<h3 className="mb-2">Selected Interests:</h3>
				<div className="flex flex-wrap gap-2">
					{selectedInterests.map((interest: any) => (
						<span
							key={interest}
							className="cursor-pointer center relative inline-block select-none whitespace-nowrap rounded-lg bg-purple-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white"
							onClick={() => dispatch(deleteSelectedInterest(interest))}
						>
							{interest} &times;
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
