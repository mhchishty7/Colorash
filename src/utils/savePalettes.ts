import { Frame } from '../jsons/frameOpetions.json'
export type Palette = {
	colors: string[]
	frame: Frame
	index: number
}

export const isPaletteSaved = (palette: Palette) => {
	const savedPalettes = localStorage.getItem('savedPalettes')
	if (savedPalettes) {
		const parsedPalettes = JSON.parse(savedPalettes)
		const isAlreadySaved = parsedPalettes.some((savedPalette: Palette) => {
			return (
				savedPalette.index == palette.index &&
				savedPalette.frame == palette.frame &&
				savedPalette.colors.every((color, index) => color == palette.colors[index])
			)
		})
		return isAlreadySaved
	}
	return false
}

export const removePalette = (palette: Palette) => {
	const savedPalettes = localStorage.getItem('savedPalettes')
	if (savedPalettes) {
		const parsedPalettes = JSON.parse(savedPalettes)
		const filteredPalettes = parsedPalettes.filter((savedPalette: Palette) => {
			return (
				savedPalette.index != palette.index ||
				savedPalette.frame != palette.frame ||
				!savedPalette.colors.every((color, index) => color == palette.colors[index])
			)
		})
		localStorage.setItem('savedPalettes', JSON.stringify(filteredPalettes))
	}
}

export const savePalette = (palette: Palette): boolean => {
	const { colors, frame, index } = palette
	let isSaved = false
	const data = {
		frame: frame,
		index: index,
		colors,
	}

	const savedPalettes = localStorage.getItem('savedPalettes')
	if (savedPalettes) {
		const parsedPalettes = JSON.parse(savedPalettes)
		if (isPaletteSaved(palette)) {
			removePalette(palette)
			isSaved = false
		} else {
			parsedPalettes.push(data)
			localStorage.setItem('savedPalettes', JSON.stringify(parsedPalettes))
			isSaved = true
		}
	} else {
		localStorage.setItem('savedPalettes', JSON.stringify([data]))
		isSaved = true
	}

	return isSaved
}
