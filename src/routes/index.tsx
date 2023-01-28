import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AppRoutes } from '../constants/routes.constants'

const Root = lazy(() => import('../Root'))
const Home = lazy(() => import('../pages/Home'))
const PaletteGenerator = lazy(() => import('../pages/PaletteGenerator'))
const ColorToner = lazy(() => import('../pages/ColorToner'))
const SolidColors = lazy(() => import('../pages/SolidColors'))
const ColorConverter = lazy(() => import('../pages/ColorConverter'))
const ContrastChecker = lazy(() => import('../pages/ContrastChecker'))
const Collections = lazy(() => import('../pages/Collections'))

export const routes = createBrowserRouter([
	{
		path: AppRoutes.Home,
		element: <Home />,
	},
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: `${AppRoutes.PaletteGenerator}/*`,
				element: <PaletteGenerator />,
			},
			{
				path: AppRoutes.ColorToner,
				element: <ColorToner />,
			},
			{
				path: AppRoutes.SolidColors,
				element: <SolidColors />,
			},
			{
				path: AppRoutes.ColorConverter,
				element: <ColorConverter />,
			},
			{
				path: AppRoutes.ContrastChecker,
				element: <ContrastChecker />,
			},
			{
				path: AppRoutes.Collection,
				element: <Collections />,
			},
		],
	},
])
