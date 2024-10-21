'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { profileDetailsFetch } from '../../redux/features/profileSlice'
import UserInfo from '@/components/profile/UserInfo'
import UserImageSlider from '@/components/profile/UserImageSlider'
import UserInfoUpdate from '@/components/profile/UserInfoUpdate'
import CurrentUserInfo from '@/components/profile/CurrentUserInfo'

export default function Profile() {
    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.profile.data)
    const images = useSelector((state: any) => state.profile.data.photos)
    const currentId = useSelector((state: any) => state.sideBar.profile.id)
    const id = useSelector((state: any) => state.profile.id)

    useEffect(() => {
        dispatch(profileDetailsFetch())
    }, [dispatch, user])

    const [isEditMode, setIsEditMode] = useState(false)
    const toggleEditMode = () => setIsEditMode(!isEditMode)

    return (
        <div className="bg-black p-6 rounded-xl shadow-lg max-w-md mx-auto text-white">
            <h2 className="text-2xl font-bold mb-4 text-pink-500 text-center">
                User Profile
            </h2>
            <div className="mt-8">
                {images && images.length > 0 && (
                    <UserImageSlider images={images} />
                )}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                {currentId === id ? (
                    isEditMode ? (
                        <>{user && <UserInfoUpdate user={user} />}</>
                    ) : (
                        <>{user && <CurrentUserInfo user={user} />}</>
                    )
                ) : (
                    <>{user ? <UserInfo user={user} /> : <></>}</>
                )}
            </div>
            {currentId === id ? (
                isEditMode ? (
                    <button
                        onClick={toggleEditMode}
                        className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
                    >
                        Save Changes
                    </button>
                ) : (
                    <button
                        onClick={toggleEditMode}
                        className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
                    >
                        Edit Profile
                    </button>
                )
            ) : (
                <></>
            )}
        </div>
    )
}