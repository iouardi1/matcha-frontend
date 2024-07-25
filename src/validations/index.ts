import * as Yup from "yup";

// login
export const SignInShema = () =>
    Yup.object().shape({
      email: Yup.string()
        .email(("Invalid Email"))
        .required(("Field is mandatory")),
      password: Yup.string()
        .min(4, ("Invalid Password"))
        .required(("Field is mandatory")),
    });
// register
export const SignUpSchema = () => 
    Yup.object().shape({
        firstname: Yup.string()
            .max(20, ("Password must be less than 20 characters"))
            .required(("Field is mandatory")),
        lastname: Yup.string()
            .max(20, ("Password must be less than 20 characters"))
            .required(("Field is mandatory")),
        username: Yup.string()
            .max(20, ("Password must be less than 20 characters"))
            .required(("Field is mandatory")),
        email: Yup.string()
            .email(("Invalid Email"))
            .required(("Field is mandatory")),
        password: Yup.string()
            .min(2, ("Password must be at least 8 characters"))
            .required(("Field is mandatory")),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], "Passwords must match")
            .required(("Field is mandatory"))
    });