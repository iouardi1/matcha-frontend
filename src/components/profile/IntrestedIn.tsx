import React from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { IconCheck } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { changeGenderValue } from "@/redux/features/profileSetupSlice";

export default function IntrestedIn() {
	const IntrestedIn = useSelector(
		(state: any) => state.profileSetup.intrestedIn,
	);
	const genderList = useSelector((state: any) => state.profileSetup.genderList);

	return (
		<div className="px-4 mt-5">
			<div className="mx-auto max-w-xl flex">
				<label className="block text-sm font-medium leading-6 text-white min-w-[100px]">
					Intrested In
				</label>
				<RadioGroup value={IntrestedIn} className="w-full flex justify-start">
					{genderList.map((item: string) => {
						return (
							<Radio
								disabled
								key={item}
								value={item}
								className={`group relative flex cursor-pointer rounded-full h-10 bg-white/5 py-4 px-5 text-white mx-3 border ${
									IntrestedIn === item ? "border-indigo-500" : ""
								}`}
							>
								<div className="flex w-full items-center justify-between">
									<div className="text-sm/6">
										<p className="font-semibold text-white">{item}</p>
									</div>
									<IconCheck
										className={IntrestedIn === item ? "visible" : "hidden"}
									/>
								</div>
							</Radio>
						);
					})}
				</RadioGroup>
			</div>
		</div>
	);
}
