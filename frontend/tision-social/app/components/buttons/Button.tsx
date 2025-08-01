import React from 'react'

type ButtonProps = {
    text: string;
    color?: 'primary' | 'secondary' | 'tertiary';
    size: 'small' | 'medium' | 'large'
    onClick?: () => void;
    className?: string;
}

const colorClasses = {
    primary: 'bg-primary text-text-color hover:bg-secondary',
    secondary: 'bg-secondary text-text-color hover:bg-primary',
    tertiary: 'bg-tertiary text-text-color hover:bg-secondary'
}

const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-5 py-2 text-lg'
}

const Button = ({ text, size, color, className, onClick }: ButtonProps) => {
    const combinedClasses = `${colorClasses[color]} ${sizeClasses[size]} rounded shadow-md border border-gray-500`
    return (
        <button className={`${combinedClasses} ${className}`} onClick={onClick}>
            {text}
        </button>
    )
}

export default Button