import { colord } from 'colord'
import { useMemo } from 'react'

interface Props {
	bgColor: string
	largeTextColor: string
	normalTextColor: string
	iconTextColor: string
}

const ContrastInfo = ({ largeTextColor, normalTextColor, iconTextColor, bgColor }: Props) => {
	const isLargeTextReadable = useMemo(
		() => colord(largeTextColor).contrast(colord(bgColor)) > 1.5,
		[largeTextColor, bgColor]
	)

	const isNormalTextReadable = useMemo(
		() => colord(normalTextColor).contrast(colord(bgColor)) > 4.5,
		[normalTextColor, bgColor]
	)

	const isIconReadable = useMemo(
		() => colord(iconTextColor).contrast(colord(bgColor)) > 3,
		[iconTextColor, bgColor]
	)

	return (
		<div className='bg-gray-200 p-4 px-6 rounded-md order-2 md:order-1'>
			<header className='font-bold text-fs-7 mb-5'>Ratio 15.45:1</header>
			<ul className='md:w-1/2 flex flex-col gap-5'>
				<li className='flex justify-between'>
					<h4 className='font-bold'>Large text</h4>
					<span>{isLargeTextReadable ? 'Readable' : 'Not readable'}</span>
				</li>
				<li className='flex justify-between'>
					<h4 className='font-bold'>Normal Text</h4>
					<span>{isNormalTextReadable ? 'Readable' : 'Not readable'}</span>
				</li>
				<li className='flex justify-between'>
					<h4 className='font-bold'>Graphics</h4>
					<span>{isIconReadable ? 'Readable' : 'Not readable'}</span>
				</li>
			</ul>
		</div>
	)
}

export default ContrastInfo
