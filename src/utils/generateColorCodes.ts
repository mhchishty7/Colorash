import { colord } from 'colord'

export const generateColorCodes = (color: string) => {
	const hex = colord(color).toHex()
	const rgb = colord(color).toRgbString()
	const hsl = colord(color).toHslString()
	const hsv = colord(color).toHsv()
	const name = colord(color).toName({ closest: true }) || 'N/A'
	return [name, hex, rgb, hsl, `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`]
}
