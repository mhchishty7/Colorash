import { createContext } from 'react'

export type SolidColorsActionsType = {
	handleBgColorChange: (color: string) => void
}

interface SolidColorsContextType {
	colorsPalette: any[]
	bgColor: string
	actions: SolidColorsActionsType
}

export const initialSolidColors: SolidColorsContextType = {
	colorsPalette: [],
	bgColor: '#FCFCFD',
	actions: { handleBgColorChange: () => {} },
}

export const SolidColorsContext = createContext<SolidColorsContextType>(initialSolidColors)
