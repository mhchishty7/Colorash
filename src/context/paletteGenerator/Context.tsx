import { createContext } from 'react'
import frameOptions, { Frame } from '../../jsons/frameOpetions.json'
import templates, { TemplateType } from '../../templates'

export type PaletteActionsType = {
	handleChangePaletteColor: (index: number, color: string) => void
	handleRefreshPalette: () => void
	handleChangeFrame: (frame: Frame) => void
	handleChangeFrameIndex: (type: 'decrement' | 'increment') => void
	handleInitializeFromURL: () => void
	handleSavePalette: () => void
}

type PaletteContextType = {
	palette: string[]
	frame: Frame
	frameIndex: number
	template: TemplateType
	totalTemplates: number
	isPaletteAlreadySaved: boolean
	actions: PaletteActionsType
}

export const initialContext: PaletteContextType = {
	palette: templates[frameOptions[0].value][0].colors,
	frame: frameOptions[0].value as Frame,
	frameIndex: 0,
	template: templates[frameOptions[0].value][0],
	totalTemplates: Object.keys(templates[frameOptions[0].value]).length - 1,
	isPaletteAlreadySaved: false,
	actions: {
		handleChangePaletteColor: () => {},
		handleRefreshPalette: () => {},
		handleChangeFrame: () => {},
		handleChangeFrameIndex: () => {},
		handleInitializeFromURL: () => {},
		handleSavePalette: () => {},
	},
}

export const PaletteGeneratorContext = createContext<PaletteContextType>(initialContext)
