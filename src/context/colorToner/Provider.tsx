import { colord, random } from 'colord'
import React, { useEffect, useMemo, useState } from 'react'
import { ColorMode } from '../../types/color.type'
import { ColorTonerActionsType, ColorTonerContext, initialColorToner } from './Context'

export const ColorTonerProvider = ({ children }: { children: React.ReactNode }) => {
	const [color, setColor] = useState<string>(initialColorToner.color)
	const [bgColor, setBgColor] = useState(initialColorToner.bgColor)
	const [quantity, setQuantity] = useState(initialColorToner.quantity)
	const [colorMode, setColorMode] = useState<ColorMode>(initialColorToner.colorMode)

	const colorsPalette: any[] = useMemo(() => {
		const baseColor = colord(color)
		if (colorMode === 'tints') return baseColor.tints(quantity)
		if (colorMode === 'shades') return baseColor.shades(quantity)
		return baseColor.tones(quantity)
	}, [color, quantity, colorMode])

	const actions: ColorTonerActionsType = {
		handleBgColorChange: (color: string) => setBgColor(color),
		handleColorChange: (color: string) => setColor(color),
		handleDropdownChange: (value: string) => setColorMode(value as ColorMode),
		handleRefreshColor: () => setColor(random().toHex()),
		handleQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target
			if (parseInt(value) > 100 || parseInt(value) < 2) return
			setQuantity(parseInt(value))
		},
	}

	useEffect(() => {
		document.body.style.backgroundColor = bgColor
		return () => {
			document.body.style.backgroundColor = ''
		}
	}, [bgColor])

	return (
		<ColorTonerContext.Provider
			value={{
				color,
				bgColor,
				quantity,
				colorMode,
				colorsPalette,
				actions: actions,
			}}>
			{children}
		</ColorTonerContext.Provider>
	)
}

export default ColorTonerProvider
