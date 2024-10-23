import React from 'react'

export default function CurrentUserInfo({ user }: any) {
    return (
        <>
            <div className="mx-4 mb-4 text-center">
                <h2 className="sm:text-2xl text-xl font-extrabold text-white mb-1 inline-block capitalize">
                    {user.firstname} &nbsp;
                </h2>
                <h2 className="sm:text-2xl text-xl font-extrabold text-white mb-1 inline-block capitalize">
                    {user.lastname}&nbsp;
                </h2>
                <p className="text-sm text-gray-400">@{user.username}</p>
            </div>

            {/* User Details */}
            <div className="px-4 text-center">
                <p className=" font-bold text-white mb-2">About Me</p>
                <p className="text-md text-gray-200 leading-relaxed mb-4">
                    {user.aboutme}
                </p>
                <p className="font-bold text-white mb-2">Birthday</p>
                <p className="text-md text-gray-200 leading-relaxed mb-4">
                    {user.birthday
                        ? new Date(
                              new Date(user.birthday).getTime() + 60 * 60 * 1000
                          )
                              .toISOString()
                              .split('T')[0]
                        : 'N/A'}
                </p>
                <p className="font-bold text-white mb-2">Gender</p>
                <p className="text-md text-gray-200 leading-relaxed mb-4">{user.gender}</p>
                <p className="font-bold text-white mb-2">Email</p>
                <p className="text-md text-gray-200 leading-relaxed mb-4">{user.email}</p>
            </div>
        </>
    )
}
