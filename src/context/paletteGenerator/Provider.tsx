import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppRoutes } from '../../constants/routes.constants'
import frameOptions, { Frame } from '../../jsons/frameOpetions.json'
import templates, { TemplateType } from '../../templates'
import { generateRandomColor } from '../../utils/generateRandomColor'
import { isPaletteSaved, savePalette } from '../../utils/savePalettes'
import { initialContext, PaletteActionsType, PaletteGeneratorContext } from './Context'

export const PaletteGeneratorProvider = ({ children }: { children: React.ReactNode }) => {
	const [isPaletteAlreadySaved, setIsPaletteAlreadySaved] = useState<boolean>(false)
	const { '*': params } = useParams()

	const { _Frame, _FrameIndex, _PaletteColors } = useMemo((): any => {
		const [frame, frameIndex, colors] =
			params?.split('/') ||
			([initialContext.frame, initialContext.frameIndex, initialContext.palette] as any)

		const _Frame = frameOptions.find((item) => item.value === frame) ? frame : initialContext.frame
		const _FrameIndex = templates[frame as Frame]?.[frameIndex]
			? frameIndex
			: initialContext.frameIndex
		const _PaletteColors =
			colors && colors.includes('-')
				? colors.split('-').map((color: string) => `#${color}`)
				: initialContext.palette

		setIsPaletteAlreadySaved(
			isPaletteSaved({
				frame: _Frame,
				index: _FrameIndex,
				colors: _PaletteColors,
			} as any)
		)

		return {
			_Frame,
			_FrameIndex,
			_PaletteColors,
		}
	}, [])

	const [frame, setFrame] = useState<Frame>(_Frame)
	const [frameIndex, setFrameIndex] = useState<number>(_FrameIndex)
	const [palette, setPalette] = useState<string[]>(_PaletteColors)

	const totalTemplates = useMemo(() => Object.keys(templates[frame]).length - 1, [frame])
	const template: TemplateType = useMemo(() => templates[frame][frameIndex], [frame, frameIndex])
	const navigate = useNavigate()

	const actions: PaletteActionsType = {
		handleChangePaletteColor: (index: number, color: string) => {
			setIsPaletteAlreadySaved(false)
			const newPalette = [...palette]
			newPalette[index] = color
			setPalette(newPalette)
		},
		handleChangeFrame: (frame: Frame) => {
			setFrame(frame)
			setFrameIndex(0)
			setPalette(templates[frame][0].colors)
		},
		handleInitializeFromURL: () =>
			navigate(
				`${AppRoutes.PaletteGenerator}/${frame}/${frameIndex}/${palette
					.join('-')
					.replaceAll('#', '')}`
			),
		handleChangeFrameIndex: (type: 'decrement' | 'increment') => {
			const index = type === 'decrement' ? frameIndex - 1 : frameIndex + 1
			if (index >= 0 && index <= totalTemplates) {
				setFrameIndex(Number(index))
				setPalette(templates[frame][index].colors)
			}
		},
		handleRefreshPalette: () => {
			setPalette(generateRandomColor(palette.length, palette))
			setIsPaletteAlreadySaved(false)
		},
		handleSavePalette: () =>
			setIsPaletteAlreadySaved(savePalette({ frame, index: frameIndex, colors: palette })),
	}

	useEffect(() => {
		actions.handleInitializeFromURL()
		return () => {}
	}, [frame, frameIndex, palette])

	return (
		<PaletteGeneratorContext.Provider
			value={{
				palette,
				frame,
				frameIndex,
				template,
				totalTemplates,
				isPaletteAlreadySaved,
				actions,
			}}>
			{children}
		</PaletteGeneratorContext.Provider>
	)
}

export default PaletteGeneratorProvider
