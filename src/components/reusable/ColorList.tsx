import { TRadius } from '../../types/tailwind.types'
import ColorItem from './ColorItem'

interface ColorListProps {
	colorsPalette: any[]
	rowGap?: number
	colGap?: number
	parentRadius?: TRadius
	childRadius?: TRadius
}

const ColorList = ({
	colorsPalette,
	rowGap = 0,
	colGap = 0,
	parentRadius = 'xl',
	childRadius = 'none',
}: ColorListProps) => {
	return (
		<div
			className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6  rounded-${parentRadius}`}
			style={{ gridRowGap: rowGap, gridColumnGap: colGap }}>
			{colorsPalette.map((color) => (
				<ColorItem
					key={color}
					color={color}
					radius={childRadius}
				/>
			))}
		</div>
	)
}

export default ColorList
