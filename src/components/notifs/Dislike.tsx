import { getImage } from '@/utils/helpers/functions'
import React from 'react'

export default function Dislike({senderData} : any) {
    return (
        <div className="bg-slate-50 items-center justify-around w-full h-[50px] flex flex-row border-b-solid border-b-[1px] mt-[3px] border-b-white">
            <img
                src={getImage(senderData.profile_picture)}
                className="w-[40px] h-[80%] rounded-[20px]"
            />
            <div className="w-[40%] text-center text-[15px]">
                {senderData.username} disliked your profile
            </div>
            <div className="flex justify-around w-[40%] h-full items-center">
              
            </div>
        </div>
    )
}
