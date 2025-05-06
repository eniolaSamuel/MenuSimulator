import type React from "react"


interface InputProps {
    type?: string
    value?: string | number | readonly string[]
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    placeholder?: string
    className?: string
    disabled?: boolean
    required?: boolean
    name?: string
    id?: string
    autoComplete?: string
    min?: number | string
    max?: number | string
    maxLength?: number
    minLength?: number
    pattern?: string
    readOnly?: boolean
}

export function Input({ type = "text", className = "", ...props }: InputProps) {
    const baseClasses =
        "w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#1d1108] focus:border-[#1d1108]"
    const combinedClasses = `${baseClasses} ${className}`

    return <input type={type} className={combinedClasses} {...props} />
}
