import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { removeByAttr, findByAttr } from "@/utils/helpers/functions";
import { axiosInstance } from "@/_axios/instance";

export interface profileSetupState {
	images: any[];
	imagesPlaceHolders: any[];
	bio: string;
	interests: string[];
	selectedInterests: string[];
	error: {
		message: string;
		exists: boolean;
	};
	gender: string;
	username: {
		initVal: any;
		val: string;
	};
	intrestedIn: string;
	genderList: string[];
	birthday: string;
	loading: boolean;
}

const initialState: profileSetupState = {
	images: [],
	bio: "",
	genderList: ["Man", "Woman"],
	imagesPlaceHolders: [
		{ id: "placeholder-1" },
		{ id: "placeholder-2" },
		{ id: "placeholder-3" },
		{ id: "placeholder-4" },
		{ id: "placeholder-5" },
	],
	interests: ["Music", "Travel", "Sports", "Movies", "Art", "Technology"],
	selectedInterests: [],
	error: {
		message: "",
		exists: false,
	},
	gender: "",
	username: {
		initVal: null,
		val: "",
	},
	intrestedIn: "",
	birthday: "",
	loading: false,
};

function verifyData(data: any) {
	if (
		data.images.length < 1 ||
		data.bio.length === "" ||
		data.selectedInterests < 3
	)
		return false;
	return true;
}

export const profileInit: any = createAsyncThunk("profile/init", async () => {
	const response = await axiosInstance.get("/api/profile/setup");
	return response.data;
});

export const profileSetup: any = createAsyncThunk(
	"profile/setup",
	async (arg, { getState }) => {
		const { profileSetup }: any = getState();

		if (verifyData(profileSetup)) {
			await axiosInstance.post("/api/profile/setup", {
				images: profileSetup.images.map((item: any) => ({ path: item.path })),
				bio: profileSetup.bio,
				interests: profileSetup.selectedInterests,
				gender: profileSetup.gender,
				intrestedIn: profileSetup.intrestedIn,
				username: profileSetup.username.val,
				birthday: profileSetup.birthday,
			});
		}
		return Promise.reject("insufficient data");
	},
);

export const uploadFile: any = createAsyncThunk(
	"files/uploadFile",
	async (file: any, { rejectWithValue }) => {
		try {
			const formData = new FormData();
			formData.append("file", file);

			const response = await axiosInstance.post("/api/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.response.data);
		}
	},
);

export const deleteFile: any = createAsyncThunk(
	"files/deleteFile",
	async (filename: any, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.delete("/api/upload", {
				data: filename,
			});
			return response.data;
		} catch (error: any) {
			return rejectWithValue(error.response.data);
		}
	},
);

export const profileSetupSlice = createSlice({
	name: "profileSetup",
	initialState,
	reducers: {
		// Image actions
		addImage(state, action) {
			state.images.push(action.payload);
			state.imagesPlaceHolders.pop();
		},
		deleteImage(state, id: PayloadAction<number>) {
			removeByAttr(state.images, "id", id.payload);
			state.imagesPlaceHolders.push({
				id: `placeholde-${state.imagesPlaceHolders.length + 1}`,
			});
		},
		profileImage(state, id: PayloadAction<number>) {
			let index = findByAttr(state.images, "id", id.payload);
			state.images[index].isProfilePic = !state.images[index].isProfilePic;
		},
		// Bio actions
		changeBio(state, bio: PayloadAction<string>) {
			state.bio = bio.payload;
		},
		// Interest actions
		addSelectedInterest(state, interest: PayloadAction<any>) {
			if (!state.selectedInterests.includes(interest.payload)) {
				state.selectedInterests.push(interest.payload);
			}
		},
		deleteSelectedInterest(state, interest: PayloadAction<any>) {
			state.selectedInterests = state.selectedInterests.filter((i) => {
				return i !== interest.payload;
			});
		},
		changeErrorProps(state) {
			state.error.exists = false;
		},
		changeGenderValue(state, gender: PayloadAction<any>) {
			state.gender = gender.payload;
			if (gender.payload === "Man") state.intrestedIn = "Woman";
			else state.intrestedIn = "Man";
		},
		setBirthday(state, birthday: PayloadAction<any>) {
			if (birthday.payload) {
				// var timestamp = Date.parse(birthday.payload);
				var dateObject: any = new Date(birthday.payload);
				if (!isNaN(dateObject)) {
					state.birthday = birthday.payload;
				} else {
					state.error.exists = true;
					state.error.message = "invalide Date";
				}
			}
		},
		setUsername(state, username: PayloadAction<any>) {
			if (!state.username.initVal) {
				state.username.val = username.payload;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(uploadFile.pending, (state) => {})
			.addCase(uploadFile.fulfilled, (state, action) => {
				const i = state.images.length - 1;
				state.images[i].path = action.payload;
			})
			.addCase(uploadFile.rejected, (state, action) => {})
			.addCase(profileSetup.rejected, (state, action) => {
				state.error = { message: action.error.message, exists: true };
			})
			.addCase(profileInit.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(profileInit.fulfilled, (state, action) => {
				state.username.initVal = action.payload.username;
				state.loading = false;
			});
	},
});

export const {
	addImage,
	deleteImage,
	profileImage,
	changeBio,
	addSelectedInterest,
	deleteSelectedInterest,
	changeErrorProps,
	changeGenderValue,
	setBirthday,
	setUsername,
} = profileSetupSlice.actions;

export default profileSetupSlice.reducer;
