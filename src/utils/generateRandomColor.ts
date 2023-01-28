import { colord, random } from 'colord'

export const generateRandomColor = (quantity: number, prevColors?: string[]): string[] => {
	const colors: string[] = []
	const colorsNames = [
		'#008F7A',
		'#2C73D2',
		'#845EC2',
		'#D65DB1',
		'#FF9671',
		'#7a918d',
		'#E2F0F7',
		'#e9c46a',
		'#BED3CC',
		'#467E70',
		'#e8eddf',
		'#023e7d',
		'#925e78',
		'#e2c044',
		'#774e62',
		'#8fb996',
		'#858ae3',
		'#59989D',
	]

	const getRandomColor = () => {
		const color = colorsNames[Math.floor(Math.random() * colorsNames.length)]
		return colord(color).toHex()
	}

	const randomNumber = (min?: number, max?: number) => {
		const minNumber = min || 3
		const maxNumber = max || 10
		return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber)
	}

	const getRandomShadeColor = (): string =>
		colord(getRandomColor()).shades(30)[randomNumber(5, 10)].toHex()

	const getRandomTintColor = (): string => colord(random()).tints(20)[randomNumber(12, 15)].toHex()
	const getRandomTonesColor = (): string => colord(random()).tones(10)[randomNumber(2, 4)].toHex()

	while (colors.length < quantity) {
		const randomNumber = Math.floor(Math.random() * 3)
		const color =
			randomNumber === 1
				? getRandomShadeColor()
				: randomNumber === 2
				? getRandomTintColor()
				: getRandomTonesColor()

		const isAlreadyInPrevArray = prevColors?.includes(color)
		if (!colors.includes(color) || !isAlreadyInPrevArray) {
			colors.push(color)
		}
	}

	return colors
}
