import { createContext } from 'react'

export type ContrastActionsType = {
	handleBgColorChange: (color: string) => void
	handleColorChange: (color: string) => void
}

type ContrastContextType = {
	bgColor: string
	color: string
	largeTextColor: string
	normalTextColor: string
	iconTextColor: string
	actions: ContrastActionsType
}

export const initialContrast: ContrastContextType = {
	bgColor: '#F1EEE5',
	color: '#000000',
	largeTextColor: '#000000',
	normalTextColor: '#000000',
	iconTextColor: '#000000',
	actions: {
		handleBgColorChange: () => {},
		handleColorChange: () => {},
	},
}

export const ContrastCheckerContext = createContext<ContrastContextType>(initialContrast)
