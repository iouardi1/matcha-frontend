import { getImage } from '@/utils/helpers/functions'
import React from 'react'

export default function NotifItem({ notif }: any) {
    return (
        <div className="bg-slate-50 items-center justify-around w-full h-[50px] flex flex-row border-b-solid border-b-[1px] mt-[3px] border-b-white">
            <img
                src={getImage(notif.profile_picture)}
                className="w-[40px] h-[80%] rounded-[20px]"
            />
            <div className="w-[40%] text-center text-[15px]">
                {notif.sender}{' '}
                {notif.type == 'like'
                    ? 'liked your profile'
                    : notif.type == 'dislike'
                    ? 'disliked your profile'
                    : notif.type == 'message'
                    ? 'sent you a message'
                    : notif.type == 'view'
                    ? 'viewed your profile'
                    : notif.type == 'match'
                    ? 'matched you'
                    : ''}
            </div>
            <div className="flex justify-around w-[40%] h-full items-center">
                {notif.type == 'like' ||
                notif.type == 'message' ||
                notif.type == 'match' ? (
                    <>view profile</>
                ) : (
                    <></>
                )}
                <></>
            </div>
        </div>
    )
}