import { colord } from 'colord'
import React, { useMemo, useState } from 'react'
import { ContrastActionsType, ContrastCheckerContext, initialContrast } from './Context'

export const ContrastCheckerProvider = ({ children }: { children: React.ReactNode }) => {
	const [color, setColor] = useState<string>(initialContrast.color)
	const [bgColor, setBgColor] = useState(initialContrast.bgColor)

	const largeTextColor = useMemo(() => colord(color).toHex(), [color])
	const normalTextColor = useMemo(() => colord(color).lighten(0.2).toHex(), [color])
	const iconTextColor = useMemo(() => colord(color).lighten(0.3).toHex(), [color])

	const actions: ContrastActionsType = {
		handleBgColorChange: (color: string) => setBgColor(color),
		handleColorChange: (color: string) => setColor(color),
	}

	return (
		<ContrastCheckerContext.Provider
			value={{
				bgColor,
				color,
				largeTextColor,
				normalTextColor,
				iconTextColor,
				actions,
			}}>
			{children}
		</ContrastCheckerContext.Provider>
	)
}

export default ContrastCheckerProvider
