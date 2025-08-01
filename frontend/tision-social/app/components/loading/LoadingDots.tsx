import React from 'react'

const LoadingDots = () => {
    return (
        <div className="flex justify-center items-center h-screen text-xl font-medium text-gray-600">
            <span className="animate-blink-1 text-6xl">.</span>
            <span className="animate-blink-2 text-6xl">.</span>
            <span className="animate-blink-3 text-6xl">.</span>
        </div>
    )
}

export default LoadingDots