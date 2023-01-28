import { lazy, useContext } from 'react'
import Input from '../components/reusable/forms/Input'
import { SolidColorsContext } from '../context/solidColors/Context'
import SolidColorsProvider from '../context/solidColors/Provider'
import AppContent from '../layouts/AppContent'
import AppHeader from '../layouts/AppHeader'
import InputGroup from '../layouts/InputGroup'
const ColorList = lazy(() => import('../components/reusable/ColorList'))
const ColorPicker = lazy(() => import('../components/reusable/ColorPicker'))

const SolidColors = () => {
	const { colorsPalette, bgColor, actions } = useContext(SolidColorsContext)
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
								box
								value
								saturation
								hue
								size='xs'
								direction='left'
								onChange={actions.handleBgColorChange}
							/>
						}
					/>
				</InputGroup>
			</AppHeader>
			<AppContent>
				<ColorList
					rowGap={16}
					colGap={16}
					parentRadius='none'
					childRadius='lg'
					colorsPalette={colorsPalette}
				/>
			</AppContent>
		</>
	)
}

export default () => (
	<SolidColorsProvider>
		<SolidColors />
	</SolidColorsProvider>
)
