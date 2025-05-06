"use client"

import type React from "react"

import { useState } from "react"


const menuData = {
    main: {
        title: "Welcome to COCOALATE CROWN CRAFT",
        subtitle: "Which of these services would interest you?",
        options: [
            { id: 1, label: "Washing" },
            { id: 2, label: "Steaming" },
            { id: 3, label: "Braiding", hasSubmenu: true },
            { id: 4, label: "Frontal", hasSubmenu: true },
            { id: 5, label: "Sew-In", hasSubmenu: true },
            { id: 6, label: "Chemical Straightening" },
        ],
    },
    submenu1: {
        3: {
            title: "Select Your Preferred Style",
            options: [
                { id: 1, label: "Ghana Braids" },
                { id: 2, label: "Lemonade Braids" },
                { id: 3, label: "Goddess Braids" },
                { id: 4, label: "Knotless Braids" },
                { id: 5, label: "Cornrows" },
            ],
        },
        4: {
            title: "Select Your Preferred Style",
            options: [
                { id: 1, label: "Ponytail" },
                { id: 2, label: "Center Part Closure" },
                { id: 3, label: "Side Part Closure" },
                { id: 4, label: "360 Frontal" },
                { id: 5, label: "Half up- Half down" },
            ],
        },
        5: {
            title: "Select Your Preferred Style",
            options: [
                { id: 1, label: "Full" },
                { id: 2, label: "Partial" },
                { id: 3, label: "180 Leave Out" },
                { id: 4, label: "360 Leave Out" },
            ],
        },
    },
    submenu2: {
        title: "Select Your Preferred Length",
        options: [
            { id: 1, label: "Shoulder Length" },
            { id: 2, label: "Bra Length" },
            { id: 3, label: "Waist Length" },
            { id: 4, label: "Butt Length" },
            { id: 5, label: "Buss Down" },
        ],
    },
}

interface MenuContainerProps {
    onReset: () => void
}

export function MenuContainer({ onReset }: MenuContainerProps) {
    const [currentMenu, setCurrentMenu] = useState<"main" | "submenu1" | "submenu2" | "color">("main")
    const [mainSelection, setMainSelection] = useState<number | null>(null)
    const [submenu1Selection, setSubmenu1Selection] = useState<number | null>(null)
    const [submenu2Selection, setSubmenu2Selection] = useState<number | null>(null)
    const [colorInput, setColorInput] = useState("")
    const [summary, setShowSummary] = useState(false)


    const handleMainSelection = (optionId: number) => {
        setMainSelection(optionId)


        const selectedOption = menuData.main.options.find((option) => option.id === optionId)

        if (selectedOption?.hasSubmenu) {
            setCurrentMenu("submenu1")
        } else {
            setShowSummary(true)
        }
    }


    const handleSubmenu1Selection = (optionId: number) => {
        setSubmenu1Selection(optionId)
        setCurrentMenu("submenu2")
    }


    const handleSubmenu2Selection = (optionId: number) => {
        setSubmenu2Selection(optionId)
        setCurrentMenu("color")
    }


    const handleColorSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setShowSummary(true)
    }


    const getServiceName = () => {
        const service = menuData.main.options.find((option) => option.id === mainSelection)
        return service?.label || ""
    }


    const getStyleName = () => {
        if (!mainSelection || !submenu1Selection) return ""
        const submenu = menuData.submenu1[mainSelection as keyof typeof menuData.submenu1]
        if (!submenu) return ""
        const style = submenu.options.find((option) => option.id === submenu1Selection)
        return style?.label || ""
    }


    const getLengthName = () => {
        if (!submenu2Selection) return ""
        const length = menuData.submenu2.options.find((option) => option.id === submenu2Selection)
        return length?.label || ""
    }


    const renderMenu = () => {
        if (summary) {
            return (
                <div className="p-6 space-y-4">
                    <h2 className="text-xl font-bold text-center" style={{ color: "#1d1108" }}>
                        Appointment Summary
                    </h2>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="mb-2">
                            <span className="font-semibold">Service:</span> {getServiceName()}
                        </p>
                        {mainSelection && [3, 4, 5].includes(mainSelection) && (
                            <>
                                <p className="mb-2">
                                    <span className="font-semibold">Style:</span> {getStyleName()}
                                </p>
                                <p className="mb-2">
                                    <span className="font-semibold">Length:</span> {getLengthName()}
                                </p>
                                <p className="mb-2">
                                    <span className="font-semibold">Color:</span> {colorInput || "Not specified"}
                                </p>
                            </>
                        )}
                        <p className="mt-4 text-green-600 font-semibold">Your appointment has been scheduled!</p>
                    </div>
                    <button onClick={onReset} className="w-full p-2 rounded text-white" style={{ backgroundColor: "#1d1108" }}>
                        Start Over
                    </button>
                </div>
            )
        }

        if (currentMenu === "main") {
            return (
                <div className="p-6 space-y-4">
                    <h2 className="text-xl font-bold text-center" style={{ color: "#1d1108" }}>
                        {menuData.main.title}
                    </h2>
                    <p className="text-center mb-4">{menuData.main.subtitle}</p>
                    <div className="space-y-2">
                        {menuData.main.options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleMainSelection(option.id)}
                                className="w-full p-2 text-left border border-gray-300 rounded hover:bg-gray-100"
                            >
                                {option.id}. {option.label}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={onReset}
                        className="w-full p-2 rounded text-white mt-4"
                        style={{ backgroundColor: "#1d1108" }}
                    >
                        Cancel
                    </button>
                </div>
            )
        }

        if (currentMenu === "submenu1" && mainSelection) {
            const submenu = menuData.submenu1[mainSelection as keyof typeof menuData.submenu1]

            return (
                <div className="p-6 space-y-4">
                    <h2 className="text-xl font-bold text-center" style={{ color: "#1d1108" }}>
                        {submenu.title}
                    </h2>
                    <p className="text-center mb-4">For {getServiceName()}</p>
                    <div className="space-y-2">
                        {submenu.options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleSubmenu1Selection(option.id)}
                                className="w-full p-2 text-left border border-gray-300 rounded hover:bg-gray-100"
                            >
                                {option.id}. {option.label}
                            </button>
                        ))}
                    </div>
                    <div className="flex space-x-2 mt-4">
                        <button onClick={() => setCurrentMenu("main")} className="flex-1 p-2 rounded border border-gray-300">
                            Back
                        </button>
                        <button onClick={onReset} className="flex-1 p-2 rounded text-white" style={{ backgroundColor: "#1d1108" }}>
                            Cancel
                        </button>
                    </div>
                </div>
            )
        }

        if (currentMenu === "submenu2") {
            return (
                <div className="p-6 space-y-4">
                    <h2 className="text-xl font-bold text-center" style={{ color: "#1d1108" }}>
                        {menuData.submenu2.title}
                    </h2>
                    <p className="text-center mb-4">
                        For {getServiceName()} - {getStyleName()}
                    </p>
                    <div className="space-y-2">
                        {menuData.submenu2.options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleSubmenu2Selection(option.id)}
                                className="w-full p-2 text-left border border-gray-300 rounded hover:bg-gray-100"
                            >
                                {option.id}. {option.label}
                            </button>
                        ))}
                    </div>
                    <div className="flex space-x-2 mt-4">
                        <button onClick={() => setCurrentMenu("submenu1")} className="flex-1 p-2 rounded border border-gray-300">
                            Back
                        </button>
                        <button onClick={onReset} className="flex-1 p-2 rounded text-white" style={{ backgroundColor: "#1d1108" }}>
                            Cancel
                        </button>
                    </div>
                </div>
            )
        }

        if (currentMenu === "color") {
            return (
                <div className="p-6 space-y-4">
                    <h2 className="text-xl font-bold text-center" style={{ color: "#1d1108" }}>
                        Input Your Preferred Color
                    </h2>
                    <p className="text-center mb-4">
                        For {getServiceName()} - {getStyleName()} - {getLengthName()}
                    </p>
                    <form onSubmit={handleColorSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={colorInput}
                            onChange={(e) => setColorInput(e.target.value)}
                            placeholder="Enter color (e.g., Black, Brown, Blonde)"
                            className="w-full p-2 border border-gray-300 rounded text-center"
                        />
                        <button type="submit" className="w-full p-2 rounded text-white" style={{ backgroundColor: "#1d1108" }}>
                            Submit
                        </button>
                    </form>
                    <div className="flex space-x-2 mt-4">
                        <button onClick={() => setCurrentMenu("submenu2")} className="flex-1 p-2 rounded border border-gray-300">
                            Back
                        </button>
                        <button onClick={onReset} className="flex-1 p-2 rounded text-white" style={{ backgroundColor: "#1d1108" }}>
                            Cancel
                        </button>
                    </div>
                </div>
            )
        }

        return null
    }

    return <div className="min-h-[400px]">{renderMenu()}</div>
}
