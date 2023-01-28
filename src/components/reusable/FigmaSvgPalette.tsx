import { AnyColor, colord } from 'colord'

const FigmaSvgPalette = ({ colors }: { colors: AnyColor[] }) => (
	<svg
		viewBox={`0 0 ${100 * colors.length} 70`}
		height='70'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'>
		{colors.map((color: AnyColor, index: number) => {
			return (
				<rect
					width={100}
					height={70}
					fill={colord(color).toHex()}
					x={100 * index}
					y={0}
				/>
			)
		})}
	</svg>
)
export default FigmaSvgPalette
