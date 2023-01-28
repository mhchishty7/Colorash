import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { generateColorCodes } from '../../utils/generateColorCodes'
import Button from '../reusable/forms/Button'

interface ColorCodesProps {
	color: string
}
const ColorCodeList = ({ color }: ColorCodesProps) => {
	const handleCopy = (color: string) => {
		navigator.clipboard.writeText(color)
		toast.success(`${color} copied to clipboard`, {
			icon: '👏',
			style: {
				borderRadius: '8px',
			},
		})
	}

	const colorCodes = useMemo(() => {
		return generateColorCodes(color)
	}, [color])

	return (
		<ul>
			{colorCodes.map((colorCode, index) => (
				<li
					key={index}
					className=' flex justify-between py-2 border mb-3 hover:bg-gray-200 rounded-md items-center px-4 '>
					<div className='menu-title'>{colorCode}</div>
					<Button
						text='Copy'
						onClick={() => handleCopy(colorCode)}
					/>
				</li>
			))}
		</ul>
	)
}

export default ColorCodeList
