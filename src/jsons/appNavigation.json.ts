import { AppRoutes } from '../constants/routes.constants'

export interface INavigationItem {
	label: string
	icon: string
	path: string
}

const appNavigation: INavigationItem[] = [
	{
		label: 'Palette Generator',
		icon: 'ic:baseline-color-lens',
		path: AppRoutes.PaletteGenerator,
	},
	{
		label: 'Color Toner',
		icon: 'ic:twotone-format-color-fill',
		path: AppRoutes.ColorToner,
	},
	{
		label: 'Solid Colors',
		icon: 'carbon:circle-solid',
		path: AppRoutes.SolidColors,
	},
	{
		label: 'Contrast Checker',
		icon: 'ic:baseline-contrast',
		path: AppRoutes.ContrastChecker,
	},
	{
		label: 'Color Converter',
		icon: 'entypo:code',
		path: AppRoutes.ColorConverter,
	},
	{
		label: 'Collection',
		icon: 'ph:heart-fill',
		path: AppRoutes.Collection,
	},
]

export default appNavigation
