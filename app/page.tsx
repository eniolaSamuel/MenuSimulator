"use client"

import { useState } from "react"
import { MenuContainer } from "@/components/menu-container"
import { USSDInput } from "@/components/ussd-input"

export default function Home() {
  const [menuActive, setMenuActive] = useState(false)
  const [ussdCode, setUssdCode] = useState("")

  const handleCodeSubmit = (code: string) => {
    if (code === "*465#") {
      setMenuActive(true)
    } else {
      alert("Invalid code. Please try *465#")
    }
  }

  const resetMenu = () => {
    setMenuActive(false)
    setUssdCode("")
  }

  return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 bg-purple-700 text-white text-center">
            <h1 className="text-xl font-bold">Hair Salon Menu Simulator</h1>
          </div>

          {!menuActive ? (
              <USSDInput onSubmit={handleCodeSubmit} ussdCode={ussdCode} setUssdCode={setUssdCode} />
          ) : (
              <MenuContainer onReset={resetMenu} />
          )}
        </div>
      </main>
  )
}
