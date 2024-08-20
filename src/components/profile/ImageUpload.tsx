import Image from "@/components/profile/Image";
import { addImage, uploadFile } from "@/redux/features/profileSetupSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconUpload, IconUserFilled } from "@tabler/icons-react";
import { generateId } from "@/utils/helpers/functions";
import ImagePlaceholder from "./ImagePlaceholder";

export default function ImageUpload() {
	const uploadInput: any = useRef(null);
	const uploadImage: any = useRef(null);
	const gallery: any = useRef(null);
	let isEventListenerAdded = false;
	// const [files, setFiles]:any = useState([]);

	const dispatch = useDispatch();
	const images = useSelector((state: any) => state.profileSetup.images);
	const placeholder = useSelector(
		(state: any) => state.profileSetup.imagesPlaceHolders,
	);

	useEffect(() => {
		function uploadEvent(event: any) {
			const file = event.target.files[0];

			if (file) {
				const reader = new FileReader();
				const imageId = generateId();
				reader.onload = (e: any) => {
					dispatch(addImage({ id: imageId, src: e.target.result, path: null }));
				};
				reader.readAsDataURL(file);
				dispatch(uploadFile(file));
			}
			uploadInput.current.addEventListener("click", (event: any) => {
				event.stopPropagation();
			});
		}

		if (!isEventListenerAdded) {
			uploadImage.current.addEventListener("click", () => {
				uploadInput.current.click();
			});
			isEventListenerAdded = true;
		}
		if (uploadInput && uploadInput.current) {
			uploadInput.current.addEventListener("change", uploadEvent);
			return function cleanup() {
				uploadInput.current?.removeEventListener("change", uploadEvent);
			};
		}
	}, []);

	return (
		<section className="flex flex-col justify-center mx-auto items-center max-w-[70%]">
			<div className="mb-4">
				<h1>Profile photos</h1>
			</div>
			<div className="flex items-center justify-center w-full">
				{!images.length ? (
					<IconUserFilled
						className="rounded-full ring-2 ring-indigo-300"
						size={60}
					/>
				) : (
					<img
						className="object-cover w-[60px] h-[60px] p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
						src={images[0].src}
						alt="Bordered avatar"
					/>
				)}
				<div
					ref={uploadImage}
					id="uploadImage"
					className="flex w-8 h-8 ml-4 bg-gray-100 border-gray-400 rounded-lg items-center cursor-pointer"
				>
					<input
						id="upload"
						ref={uploadInput}
						type="file"
						className="hidden"
						accept="image/*"
						disabled={images.length > 4 ? true : false}
					/>
					<IconUpload className="w-4 h-4 text-gray-700 mx-auto" />
				</div>
			</div>
			<div
				ref={gallery}
				id="gallery"
				className="grid grid-cols-2 md:grid-cols-3 gap-1 w-[70%] mt-5"
			>
				{images.map((image: any) => (
					<Image key={image.id} image={image} />
				))}
				{placeholder.map((image: any) => (
					<ImagePlaceholder key={image.id} />
				))}
			</div>
			<div className="mb-4">
				<p>
					upload 1 photo to start, add up to 4 to make your profile stand out
				</p>
			</div>
		</section>
	);
}
