import React, { useEffect, useState } from 'react'
import { generateRandomColor } from '../../utils/generateRandomColor'
import { initialSolidColors, SolidColorsActionsType, SolidColorsContext } from './Context'

export const SolidColorsProvider = ({ children }: { children: React.ReactNode }) => {
	const [colorsPalette, setColorsPalette] = useState<any[]>(generateRandomColor(50, []))
	const [bgColor, setBgColor] = useState(initialSolidColors.bgColor)

	const actions: SolidColorsActionsType = {
		handleBgColorChange: (color: string) => setBgColor(color),
	}

	const infiniteScroll = () => {
		const { scrollHeight, scrollTop, clientHeight } = document.documentElement
		if (scrollTop + clientHeight >= scrollHeight)
			setColorsPalette((prev) => [...prev, ...generateRandomColor(30, prev)])
	}

	useEffect(() => {
		window.addEventListener('scroll', infiniteScroll)
		return () => window.removeEventListener('scroll', infiniteScroll)
	}, [])

	useEffect(() => {
		document.body.style.backgroundColor = bgColor
		return () => {
			document.body.style.backgroundColor = ''
		}
	}, [bgColor])

	return (
		<SolidColorsContext.Provider
			value={{
				colorsPalette,
				bgColor,
				actions,
			}}>
			{children}
		</SolidColorsContext.Provider>
	)
}

export default SolidColorsProvider
