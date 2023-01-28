import { Icon } from '@iconify/react'
import { colord } from 'colord'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { TRadius } from '../../types/tailwind.types'
import { generateColorCodes } from '../../utils/generateColorCodes'
import ColorPicker from './ColorPicker'
import Button from './forms/Button'
import Dropdown from './forms/Dropdown'

interface ColorItemProps {
	color: any
	radius?: TRadius
}

const ColorItem = ({ color, radius }: ColorItemProps) => {
	const [isHover, setIsHover] = useState(false)
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
	const [selectedColorCode, setSelectedColorCode] = useState('')
	const [colorValue, setColorValue] = useState(color)

	const copyToClipboard = (value: string) => {
		navigator.clipboard.writeText(value)
		toast.success(`${value || colorValue} copied to clipboard`, {
			icon: '👏',
			style: {
				borderRadius: '8px',
			},
		})
	}

	const colorCodes = useMemo((): string[] => {
		return generateColorCodes(colorValue)
	}, [colorValue])

	const isColorLight = useMemo(() => colord(colorValue).isLight(), [colorValue])

	useEffect(() => {
		selectedColorCode && copyToClipboard(selectedColorCode)
	}, [selectedColorCode])

	useEffect(() => {
		const isObj = typeof color === 'object'
		setColorValue(colord(isObj ? color.parsed : color).toHex())
	}, [color])

	return (
		<div
			className={`rounded-${radius} p-2 fadeIn h-[125px] text-nfs-1} `}
			style={{
				backgroundColor: colorValue,
				zIndex: isDropdownOpen || isColorPickerOpen ? 2 : 0,
			}}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}>
			<div
				className={`h-full w-full ${
					!isHover && ' invisible'
				} flex  justify-center items-center gap-2  `}>
				<ColorPicker
					color={colorValue}
					value
					saturation
					onClose={() => setIsColorPickerOpen(false)}
					onOpen={() => setIsColorPickerOpen(true)}
					onChange={(color) => setColorValue(color)}
					button={
						<Icon
							icon='codicon:color-mode'
							className={`text-${isColorLight ? 'black' : 'white'} text-fs-5 mt-1 cursor-pointer `}
							width={20}
							height={20}
						/>
					}
				/>
				<Button
					variant='ghost'
					iconColor={`text-${isColorLight ? 'black' : 'white'}`}
					rightIcon='material-symbols:content-copy'
					onClick={() => copyToClipboard(colorValue)}
					iconSize='text-fs-5'
				/>
				<Dropdown
					onClose={() => setIsDropdownOpen(false)}
					onOpen={() => setIsDropdownOpen(true)}
					children={
						<ColorCodes
							colorCodes={colorCodes}
							setSelectedColorCode={setSelectedColorCode}
						/>
					}
					setIsDropdownOpen={setIsDropdownOpen}
					button={
						<Icon
							icon='charm:code'
							className={`icon lg mt-1 cursor-pointer  text-${isColorLight ? 'black' : 'white'}`}
							width={20}
							height={20}
						/>
					}
				/>
			</div>
		</div>
	)
}

const ColorCodes = ({
	colorCodes,
	setSelectedColorCode,
}: {
	colorCodes: string[]
	setSelectedColorCode: (color: string) => void
}) => {
	return (
		<ul
			className='dropdown-content menu bg-white rounded-lg p-2'
			style={{ width: 'max-content' }}>
			{colorCodes.map((option, index) => (
				<li key={index}>
					<a className=' flex justify-between gap-x-5 '>
						{option}
						<Icon
							icon='material-symbols:content-copy'
							className='icon icon-lg text-gray-600 '
							onClick={() => setSelectedColorCode(option)}
						/>
					</a>
				</li>
			))}
		</ul>
	)
}

export default ColorItem
