import React, { useEffect, useState } from 'react';
import { getImage } from '@/utils/helpers/functions';

const UserImageSlider = ({ images }: { images: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    useEffect(() => {
        const intervalId = setInterval(nextSlide, 5000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="mb-6">
            <img
                src={getImage(images[currentIndex])}
                alt={`User Image ${currentIndex}`}
                className="h-72 w-50% object-fill rounded-3xl shadow-lg m-auto"
            />
            <div className="flex justify-center mt-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 mx-1 rounded-full ${currentIndex === index ? 'bg-pink-500' : 'bg-gray-300'}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default UserImageSlider;