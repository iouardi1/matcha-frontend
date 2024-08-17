import { setBirthday } from "@/redux/features/profileSetupSlice";
import React from "react";
import { BirthdayPicker } from "react-birthday-picker";
import { useDispatch } from "react-redux";

export default function Birthday() {
	const dispatch = useDispatch();
	return (
		<div className="px-4">
			<div className="mx-auto max-w-xl flex items-center">
				<label className="inline-block text-sm font-medium leading-6 text-white min-w-[100px]">
					Birthday
				</label>
				<div className="w-full flex justify-start py-4 px-3">
					<BirthdayPicker
						onChange={(e) => {
							dispatch(setBirthday(e));
						}}
						placeHolders={["DD", "MM", "YYYY"]}
						style={{ width: "200px" }}
					/>
				</div>
			</div>
		</div>
	);
}
