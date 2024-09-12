import * as Yup from "yup";

export const BioShema = () =>
	Yup.object().shape({
		bio: Yup.string().required("Field is mandatory").min(20, "Bio too short"),
	});
