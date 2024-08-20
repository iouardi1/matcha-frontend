import React from "react";
import { IconTrash } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { deleteFile, deleteImage, profileImage } from "@/redux/features/profileSetupSlice";

export default function Image({ image }: any) {
	const dispatch = useDispatch();
	return (
		<div className="relative hover:blur-none flex max-w-[100px] w-full h-[150px] max-h-[150px]">
			<img className="h-auto w-full rounded-lg" src={image.src} alt="" />
			<div className="absolute top-2 right-2 flex space-x-2">
				<button
					className="text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
					onClick={() => {
						dispatch(deleteImage(image.id));
						dispatch(deleteFile(image.path))
					}}
				>
					<IconTrash className="w-[20px] h-[20px]" />
				</button>
			</div>
		</div>
	);
}
