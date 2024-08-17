import React from "react";
import { LabelInputContainer } from "../ui/labelInputContainer";
import { useDispatch, useSelector } from "react-redux";
import { changeBio } from "@/redux/features/profileSetupSlice";

export default function Bio() {
	const dispatch = useDispatch();

	return (
		<div className="px-4 mt-5">
			<div className="mx-auto max-w-xl flex items-center">
				<label className="inline-block text-sm font-medium leading-6 text-white min-w-[100px]">
					Bio
				</label>
				<textarea
					id="bio"
					rows={3}
					maxLength={100}
					className="auth-input max-w-[300px] max-h-[120px]"
					placeholder="Write your bio here..."
					onChange={(e: any) => dispatch(changeBio(e.target.value))}
				></textarea>
			</div>
		</div>
	);
}
