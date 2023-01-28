import { createContext } from 'react'
import colorFormatOptions from '../../jsons/colorFormats.json'
import colorModeOptions from '../../jsons/colorMode.json'
import { ColorMode } from '../../types/color.type'

export type ColorTonerActionsType = {
	handleBgColorChange: (color: string) => void
	handleColorChange: (color: string) => void
	handleDropdownChange: (value: string) => void
	handleQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleRefreshColor: () => void
}

interface ColorTonerContextType {
	color: string
	bgColor: string
	quantity: number
	colorMode: ColorMode
	colorsPalette: any[]
	actions: ColorTonerActionsType
}

export const initialColorToner: ColorTonerContextType = {
	color: '#f2f3f4',
	bgColor: '#FCFCFD',
	quantity: 24,
	colorMode: colorModeOptions[0].value as ColorMode,
	colorsPalette: [],
	actions: {
		handleBgColorChange: () => {},
		handleColorChange: () => {},
		handleDropdownChange: () => {},
		handleQuantityChange: () => {},
		handleRefreshColor: () => {},
	},
}

export const ColorTonerContext = createContext<ColorTonerContextType>(initialColorToner)
