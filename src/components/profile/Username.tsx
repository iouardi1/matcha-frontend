import { setUsername } from '@/redux/features/profileSetupSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ErrorMessage, Field, useFormikContext } from 'formik'

export default function Username() {
    const dispatch = useDispatch()
    const username = useSelector((state: any) => state.profileSetup.username)
    const { values, errors, touched, handleChange, handleBlur }: any =
        useFormikContext()

    function handleUsernameChange(value: string) {
        if (!username.initVal) {
            dispatch(setUsername(value))
        }
    }

    return (
        <div className="px-4 mt-2">
            <div className="mx-auto max-w-xl flex items-center">
                <label className="inline-block text-[12px] font-medium leading-6 text-white min-w-[100px]">
                    Username
                </label>
                {/* <input
                    id="username"
                    maxLength={10}
                    className="auth-input max-w-[300px] max-h-[120px] text-[5px]"
                    placeholder={
                        username.initVal === null
                            ? 'Write your username'
                            : username.initVal
                    }
                    disabled={username.initVal === null ? false : true}
                    onChange={(e) => {
                        handleUsernameChange(e.target.value)
                    }}
                ></input> */}
								<Field
                    name="username"
                    type="text"
                    maxLength={10}
                    className="auth-input max-w-[300px] max-h-[120px] text-[5px]"
                    placeholder={
											username.initVal === null
													? 'Write your username'
													: username.initVal
									}
									disabled={username.initVal === null ? false : true}
                />
								{touched.username && errors.username ? (
                    <div className="text-red-500 ml-1">{errors.bio}</div>
                ) : null}
            </div>
        </div>
    )
}
