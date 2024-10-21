import React from 'react'

export default function UserInfoUpdate({ user }: any) {
    return (
        <>
            <label className="font-semibold">First Name:</label>
            <input
                name="firstname"
                placeholder={user.firstname}
                className="p-2 rounded-md bg-gray-800 border border-gray-500"
            />
            <label className="font-semibold">Last Name:</label>
            <input
                name="lastname"
                placeholder={user.lastname}
                className="p-2 rounded-md bg-gray-800 border border-gray-500"
            />
            <label className="font-semibold">Email:</label>
            <input
                name="email"
                placeholder={user.email}
                className="p-2 rounded-md bg-gray-800 border border-gray-500"
            />
            <label className="font-semibold">Username:</label>
            <input
                name="username"
                placeholder={user.username}
                className="p-2 rounded-md bg-gray-800 border border-gray-500"
            />
            <label className="font-semibold">About Me:</label>
            <textarea
                name="aboutme"
                placeholder={user.aboutme}
                className="p-2 rounded-md bg-gray-800 border border-gray-500"
            />
            <label className="font-semibold">Birthday:</label>
            <input
                type="date"
                name="birthday"
                value={
                    user.birthday
                        ? new Date(
                              new Date(user.birthday).getTime() + 60 * 60 * 1000
                          )
                              .toISOString()
                              .split('T')[0]
                        : ''
                }
                className="p-2 rounded-md bg-gray-800 border border-gray-500"
                onChange={() => {}}
            />
        </>
    )
}
