import React from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { IconCheck } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { changeGenderValue } from "@/redux/features/profileSetupSlice";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
export default function Gender() {
	const dispatch = useDispatch();
	const gender = useSelector((state: any) => state.profileSetup.gender);
	const genderList = useSelector((state: any) => state.profileSetup.genderList);

	return (
		<div className="px-4">
			<div className="mx-auto max-w-xl flex items-center">
				<label className="inline-block text-sm font-medium leading-6 text-white min-w-[100px]">
					Gender
				</label>
				<RadioGroup
					value={gender}
					onChange={(e: string) => dispatch(changeGenderValue(e))}
					className="w-full flex justify-start"
				>
					{genderList.map((item: string) => {
						return (
							<Radio
								key={item}
								value={item}
								className={`group relative flex cursor-pointer rounded-full h-10 bg-white/5 py-4 px-5 text-white mx-3 border ${
									gender === item ? "border-indigo-500" : ""
								}`}
							>
								<div className="flex w-full items-center justify-between">
									<div className="text-sm/6">
										<p className="font-semibold text-white">{item}</p>
									</div>
									<IconCheck
										className={gender === item ? "visible" : "hidden"}
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
