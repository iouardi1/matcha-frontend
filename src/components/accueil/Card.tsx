import React from 'react'

const Card = ({ zIndex = 0, children }: any) => (
    <div
        className="flex items-center justify-center top-0 w-[250px] h-[400px] cursor-pointer select-none bg-white rounded-[15px] absolute "
        style={{ zIndex }}
    >
        {children}
    </div>
)

export default Card
