import { lazy, useContext } from 'react'
import Input from '../components/reusable/forms/Input'
import { ContrastCheckerContext } from '../context/contrastChecker/Context'
import ContrastCheckerProvider from '../context/contrastChecker/Provider'
import AppContent from '../layouts/AppContent'
import AppHeader from '../layouts/AppHeader'
import InputGroup from '../layouts/InputGroup'
const ColorPicker = lazy(() => import('../components/reusable/ColorPicker'))
const ContrastTemplateExample = lazy(
	() => import('../components/contrastChecker/ContrastTemplateExample')
)
const ContrastInfo = lazy(() => import('../components/contrastChecker/ContrastInfo'))

const ContrastChecker = () => {
	const { bgColor, color, largeTextColor, normalTextColor, iconTextColor, actions } =
		useContext(ContrastCheckerContext)

	return (
		<>
			<AppHeader>
				<InputGroup>
					<Input
						label='Background'
						value={bgColor}
						onChange={(e) => actions.handleBgColorChange(e.target.value)}
						rightSlot={
							<ColorPicker
								color={bgColor}
								value
								saturation
								box
								hue
								size='xs'
								direction='left'
								onChange={actions.handleBgColorChange}
							/>
						}
					/>
					<Input
						label='Foreground'
						value={color}
						onChange={(e) => actions.handleColorChange(e.target.value)}
						rightSlot={
							<ColorPicker
								color={color}
								value
								saturation
								box
								hue
								size='xs'
								direction='left'
								onChange={actions.handleColorChange}
							/>
						}
					/>
				</InputGroup>
			</AppHeader>
			<AppContent className='grid grid-cols-1 md:grid-cols-2 gap-10'>
				<ContrastInfo
					bgColor={bgColor}
					largeTextColor={largeTextColor}
					normalTextColor={normalTextColor}
					iconTextColor={iconTextColor}
				/>
				<ContrastTemplateExample
					color={color}
					bgColor={bgColor}
					largeTextColor={largeTextColor}
					normalTextColor={normalTextColor}
					iconTextColor={iconTextColor}
				/>
			</AppContent>
		</>
	)
}

export default () => (
	<ContrastCheckerProvider>
		<ContrastChecker />
	</ContrastCheckerProvider>
)
