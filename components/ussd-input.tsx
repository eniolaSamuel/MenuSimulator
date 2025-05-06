"use client"

import type React from "react"

interface USSDInputProps {
    onSubmit: (code: string) => void
    ussdCode: string
    setUssdCode: (code: string) => void
}

export function USSDInput({ onSubmit, ussdCode, setUssdCode }: USSDInputProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(ussdCode)
    }

    return (
        <div className="p-6">
            <p className="text-center mb-4 text-gray-600">Enter the USSD code to access the hair salon menu</p>
            <p className="text-center mb-6 text-sm text-gray-500">(Use *465# to access COCOALATE CROWN CRAFT)</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={ussdCode}
                    onChange={(e) => setUssdCode(e.target.value)}
                    placeholder="Enter USSD code (e.g., *465#)"
                    className="w-full p-2 border border-gray-300 rounded text-center text-lg"
                />
                <button type="submit" className="w-full p-2 rounded text-#1d1108" style={{ backgroundColor: "#ffffff" }}>
                    Submit
                </button>
            </form>
        </div>
    )
}
