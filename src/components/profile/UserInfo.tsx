import React from 'react'

function getRandomColor() {
    const colors = [
        'bg-pink-200',
        'bg-red-200',
        'bg-yellow-200',
        'bg-green-200',
        'bg-blue-200',
        'bg-purple-200',
    ]
    return colors[Math.floor(Math.random() * colors.length)]
}
export default function UserInfo({ user }: any) {
    return (
        <>
            <div className="mx-4 mb-4 text-center">
                <h2 className="sm:text-2xl text-xl font-extrabold text-white mb-1 inline-block capitalize">
                    {user.firstname} &nbsp;
                </h2>
                <h2 className="sm:text-2xl text-xl font-extrabold text-white mb-1 inline-block capitalize">
                {user.lastname}&nbsp;
                </h2>
                <h2 className="sm:text-2xl text-lg font-extrabold text-white mb-1 inline-block">
                {user.age}yo
                </h2>
                <p className="text-sm text-gray-300">
                    {user.distance}km away
                </p>
            </div>
            <div className="px-4 text-center">
                <p className=" font-bold text-white mb-2">About Me</p>
                <p className="text-md text-gray-200 leading-relaxed mb-4">
                    {user.aboutme}
                </p>
                <p className="text-sm font-bold text-white mb-2">
                    Interests
                </p>
                <div className="flex flex-wrap justify-center mt-2">
                    {user.interests &&
                        user.interests.map((interest, index) => (
                            <span
                                key={index}
                                className={`text-sm border rounded-full px-3 py-1 m-1 text-black ${getRandomColor()}`}
                            >
                                #{interest}
                            </span>
                        ))}
                </div>
            </div>
        </>
    )
}
