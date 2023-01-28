import { lazy, useContext } from 'react'
import Button from '../components/reusable/forms/Button'
import Input from '../components/reusable/forms/Input'
import { ColorTonerContext } from '../context/colorToner/Context'
import ColorTonerProvider from '../context/colorToner/Provider'
import colorModeOptions from '../jsons/colorMode.json'
import AppContent from '../layouts/AppContent'
import AppHeader from '../layouts/AppHeader'
import InputGroup from '../layouts/InputGroup'
const ColorList = lazy(() => import('../components/reusable/ColorList'))
const ColorPicker = lazy(() => import('../components/reusable/ColorPicker'))
const ExportColorModal = lazy(() => import('../components/reusable/modals/ExportColorModal'))
const Dropdown = lazy(() => import('../components/reusable/forms/Dropdown'))

const ColorToner = () => {
	const { color, bgColor, quantity, colorMode, colorsPalette, actions } =
		useContext(ColorTonerContext)

	return (
		<>
			<AppHeader className='static md:sticky'>
				<InputGroup minWidth={185}>
					<Input
						label='Background'
						value={bgColor}
						onChange={(e) => actions.handleBgColorChange(e.target.value)}
						leftSlot={
							<ColorPicker
								color={bgColor}
								value
								saturation
								box
								hue
								onChange={actions.handleBgColorChange}
								size='xs'
								direction='none'
							/>
						}
					/>
					<Input
						label='Colour'
						value={color}
						onChange={(e) => actions.handleColorChange(e.target.value)}
						leftSlot={
							<ColorPicker
								color={color}
								value
								saturation
								box
								hue
								onChange={actions.handleColorChange}
								size='xs'
								direction='none'
							/>
						}
						rightSlot={
							<Button
								leftIcon='charm:refresh'
								variant='ghost'
								size='sm'
								onClick={actions.handleRefreshColor}
							/>
						}
					/>
					<Dropdown
						label='Mode'
						withIcon
						variant='outline'
						options={colorModeOptions}
						value={colorMode}
						onChange={actions.handleDropdownChange}
						minButtonWidth='100%'
					/>
					<Input
						type='number'
						label='Quantity'
						value={quantity}
						min={2}
						max={100}
						onChange={actions.handleQuantityChange}
					/>
					<Button
						leftIcon='charm:download'
						label='Export'
						htmlFor='export-color-modal'
					/>
				</InputGroup>
			</AppHeader>
			<AppContent>
				<ColorList colorsPalette={colorsPalette} />
				<ExportColorModal
					colorsPalette={colorsPalette}
					generateColorFor='tones'
				/>
			</AppContent>
		</>
	)
}

export default () => (
	<ColorTonerProvider>
		<ColorToner />
	</ColorTonerProvider>
)
