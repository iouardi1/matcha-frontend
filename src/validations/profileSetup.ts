import * as Yup from 'yup'

export const profileSetupSchema = () =>
    Yup.object().shape({
        bio: Yup.string()
            .required('Field is mandatory')
            .min(10, 'Bio too short')
            .max(100, 'Bio too long')
            .test(
                'no-whitespace',
                'Bio must contain non-space characters',
                (value: any) => value && value.trim().length > 0
            ),
        username: Yup.string()
            .required('Field is mandatory')
            .min(5, 'Username too short')
            .max(12, 'Username too long')
            .test(
                'no-whitespace',
                'Username must contain non-space characters',
                (value: any) => value && value.trim().length > 0
            ),
    })
