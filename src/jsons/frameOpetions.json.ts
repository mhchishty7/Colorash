import { DropdownOptions } from '../types/dropdown.type'

export type Frame =
	| 'Mobile'
	| 'Website'
	| 'Brochure'
	| 'logo'
	| 'branding'
	| 'social'
	| 'illustration'

export interface FrameOptions extends DropdownOptions {
	label: Frame
	value: Frame
}

const frameOptions: FrameOptions[] = [
	{
		key: '1',
		label: 'Website',
		value: 'Website',
	},
	{
		key: '2',
		label: 'Mobile',
		value: 'Mobile',
		disabled: true,
	},
	{
		key: '3',
		label: 'Brochure',
		value: 'Brochure',
		disabled: true,
	},
	{
		key: '4',
		label: 'social',
		value: 'social',
		disabled: true,
	},
	{
		key: '5',
		label: 'illustration',
		value: 'illustration',
		disabled: true,
	},
]
export default frameOptions
