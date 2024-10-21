import React from 'react'

export default function CurrentUserInfo({ user }: any) {
  return (
    <>
        <div className="text-center mt-4">
            <h2 className="text-3xl font-extrabold mb-2 text-pink-500">
                {user.firstname} {user.lastname}
            </h2>
            <p className="text-sm text-gray-400">@{user.username}</p>
        </div>

        {/* User Details */}
        <div className="grid grid-cols-2 gap-y-2 mt-6">
            <p className="col-span-2 text-lg font-semibold text-pink-500 text-center mb-2">
                About Me
            </p>
            <p className="col-span-2 text-sm text-gray-200 text-center mb-4">
                {user.aboutme || 'No bio provided'}
            </p>

            <p className="font-semibold text-gray-400">Birthday</p>
            <p className="text-gray-200">
                {user.birthday
                    ? new Date(
                          new Date(user.birthday).getTime() + 60 * 60 * 1000
                      )
                          .toISOString()
                          .split('T')[0]
                    : 'N/A'}
            </p>
            <p className="font-semibold text-gray-400">Gender</p>
            <p className="text-gray-200">{user.gender}</p>
            <p className="font-semibold text-gray-400">Email</p>
            <p className="text-gray-200">{user.email}</p>
        </div>
    </>
)
}
