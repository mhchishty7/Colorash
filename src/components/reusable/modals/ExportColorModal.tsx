import { colord } from 'colord'
import { useEffect, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import toast from 'react-hot-toast'
import colorCodesOptions from '../../../jsons/colorCodes.json'
import colorFormatOptions from '../../../jsons/colorFormats.json'
import InputGroup from '../../../layouts/InputGroup'
import { ColorFormat } from '../../../types/color.type'
import FigmaSvgPalette from '../FigmaSvgPalette'
import Button from '../forms/Button'
import Dropdown from '../forms/Dropdown'
import HighlightCode from '../HighlightCode'

interface ExportColorModalProps {
	colorsPalette: string[]
	generateColorFor: 'palette' | 'tones'
}

const ExportColorModal = ({ colorsPalette, generateColorFor }: ExportColorModalProps) => {
	const [colorFormat, setColorFormat] = useState(colorFormatOptions[0].value)
	const [colorCode, setColorCode] = useState<ColorFormat>(colorCodesOptions[0].value as ColorFormat)
	const [colorValue, setColorValue] = useState<string>('')

	const generateColorValues = () => {
		let colors: any = {}
		const colorName: any = colord(colorsPalette[0]).toName({ closest: true })
		colorsPalette
			.map((color: any) => {
				const colorValue = typeof color === 'object' ? color.parsed : color
				if (colorCode === 'rgb') return colord(colorValue).toRgbString()
				if (colorCode === 'hsl') return colord(colorValue).toHslString()
				return colord(colorValue).toHex()
			})
			.map((color: string, index: number) => {
				const name =
					generateColorFor === 'palette' ? colord(color).toName({ closest: true }) : colorName
				if (colorFormat === 'css')
					return generateColorFor === 'palette'
						? (colors[`--${name}`] = color)
						: (colors[`--${name + '-' + (index + 1)}00`] = color)
				if (colorFormat === 'scss')
					return generateColorFor === 'palette'
						? (colors[`$${name}`] = color)
						: (colors[`$${name + '-' + (index + 1)}00`] = color)
				return generateColorFor === 'palette'
					? (colors[`${name}`] = color)
					: (colors[`${index + 1}00`] = color)
			})

		setColorValue(JSON.stringify(colors, null, 3))
	}

	const copyToClipboard = (value: any) => {
		navigator.clipboard.writeText(value)
		toast.success('Copied to clipboard', {
			icon: '👏',
			style: {
				borderRadius: '8px',
			},
		})
	}

	const handleCopy = () => {
		if (colorFormat === 'figma') {
			const element = FigmaSvgPalette({ colors: colorsPalette })
			const svg = ReactDOMServer.renderToStaticMarkup(element)
			copyToClipboard(svg)
		} else {
			copyToClipboard(colorValue)
		}
	}

	useEffect(() => {
		generateColorValues()
	}, [colorsPalette, colorFormat, colorCode, colorsPalette])

	return (
		<div>
			<input
				type='checkbox'
				id='export-color-modal'
				className='modal-toggle'
			/>
			<label
				htmlFor='export-color-modal'
				className='modal zoomIn cursor-pointer'>
				<label
					className='modal-box p-0 rounded-t-xl rounded-b-xl relative min-h-[80vh] min-w-[50vw]'
					htmlFor=''>
					<header className='flex p-3 px-5 rounded-t bg-gray-200 justify-between items-center sticky top-0  z-[1000] '>
						<h2 className='text-fs-3 font-bold text-gray-900'>Export your theme</h2>
						<Button
							leftIcon='charm:cross'
							variant='ghost'
							htmlFor='export-color-modal'
							isCircle
							iconSize='xl'
						/>
					</header>
					<main className='px-4 pb-3'>
						<InputGroup
							className='my-4 flex gap-2'
							minWidth={150}>
							<Button
								text='Copy Code'
								onClick={handleCopy}
								leftIcon='material-symbols:content-copy'
								fullWidth
							/>
							{colorFormat !== 'figma' && (
								<Dropdown
									options={colorCodesOptions}
									value={colorCode}
									onChange={setColorCode as any}
									minButtonWidth='100%'
								/>
							)}
							<Dropdown
								options={colorFormatOptions}
								value={colorFormat}
								onChange={setColorFormat}
								minButtonWidth='100%'
							/>
						</InputGroup>
						{colorFormat === 'figma' ? (
							<div
								className='text-fs-0  overflow-auto'
								style={{ height: 'calc(100vh - 300px)' }}>
								<div className='rounded-xl overflow-auto max-w-full w-max'>
									<FigmaSvgPalette colors={colorsPalette} />
								</div>
								<HighlightCode
									component={<FigmaSvgPalette colors={colorsPalette} />}
									className='mt-4'
								/>
							</div>
						) : (
							<textarea
								className='input h-full input-bordered w-full mt-4'
								value={
									colorFormat !== 'javascript'
										? colorValue.replace(/"/g, '').replace(/,/g, ';')
										: colorValue
								}
								style={{ height: 'calc(100vh - 300px)' }}
								rows={30}
								onChange={(event) => setColorValue(event.target.value)}
							/>
						)}
					</main>
				</label>
			</label>
		</div>
	)
}

export default ExportColorModal
