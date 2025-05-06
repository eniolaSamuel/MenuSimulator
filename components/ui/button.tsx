import type * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost"
    size?: "default" | "sm" | "lg"
}

export function Button({ className = "", variant = "default", size = "default", ...props }: ButtonProps) {
    const variantClasses = {
        default: "bg-[#1d1108] text-white hover:opacity-90",
        outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
        ghost: "bg-transparent hover:bg-gray-100",
    }

    const sizeClasses = {
        default: "py-2 px-4",
        sm: "py-1 px-3 text-sm",
        lg: "py-3 px-6 text-lg",
    }

    const baseClasses = "rounded font-medium transition-colors focus:outline-none"

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

    return <button className={combinedClasses} {...props} />
}
