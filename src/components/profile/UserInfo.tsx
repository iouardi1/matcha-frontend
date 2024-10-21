import React from 'react'

export default function UserInfo({ user }: any) {
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

                <p className="font-semibold text-gray-400">Age</p>
                <p className="text-gray-200">{user.age}</p>

                <p className="font-semibold text-gray-400">Gender</p>
                <p className="text-gray-200">{user.gender}</p>

                <p className="font-semibold text-gray-400">Famerate</p>
                <p className="text-gray-200">{user.famerate}</p>

                <p className="col-span-2 text-lg font-semibold text-pink-500 text-center mt-4 mb-2">
                    Interests
                </p>
                <div className="col-span-2 flex flex-wrap justify-center mt-2">
                    {user.interests &&
                        user.interests.map((interest, index) => (
                            <span
                                key={index}
                                className=" text-pink-500 border border-pink-500 rounded-full px-3 py-1 m-1 text-sm"
                            >
                                #{interest}
                            </span>
                        ))}
                </div>
            </div>
        </>
    )
}
