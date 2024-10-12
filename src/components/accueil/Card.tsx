import React from 'react'

const Card = ({ zIndex = 0, children }: any) => (
    <div
        className="flex flex-col items-center justify-end top-0 w-[250px] h-[400px] cursor-pointer select-none bg-white rounded-[15px] absolute"
        style={{ zIndex }}
    >
        {children}
    </div>
)

export default Card
