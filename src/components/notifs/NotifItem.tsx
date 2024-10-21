import { getImage } from '@/utils/helpers/functions'
import React from 'react'

export default function NotifItem({ notif }: any) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4 mb-3 border-l-4 border-[#fd5564] hover:bg-pink-100 transition-all duration-200 ease-in-out">

            <img
                src={getImage(notif.profile_picture)}
                className="w-[50px] h-[50px] rounded-full shadow-md border-2 border-[#fd5564]"
                alt={`${notif.sender}'s profile picture`}
            />

            <div className="flex-1">
                <div className="text-gray-800 font-semibold text-[15px]">
                    {notif.sender}{' '}
                    <span className="text-gray-600 font-normal">
                        {notif.type === 'like'
                            ? 'liked your profile'
                            : notif.type === 'dislike'
                            ? 'disliked your profile'
                            : notif.type === 'message'
                            ? 'sent you a message'
                            : notif.type === 'view'
                            ? 'viewed your profile'
                            : notif.type === 'match'
                            ? 'matched with you'
                            : ''}
                    </span>
                </div>

                <div className="text-gray-500 text-xs mt-1">
                    {new Date(notif.date).toLocaleString()}{' '}
                </div>
            </div>

            {(notif.type === 'like' ||
                notif.type === 'message' ||
                notif.type === 'match') && (
                <div className="bg-[#fd5564] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-pink-500 transition duration-200">
                    View Profile
                </div>
            )}
        </div>
    )
}
