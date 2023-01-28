import { lazy, useContext } from 'react'
import ColorPicker from '../components/reusable/ColorPicker'
import Button from '../components/reusable/forms/Button'
import Dropdown from '../components/reusable/forms/Dropdown'
import { PaletteGeneratorContext } from '../context/paletteGenerator/Context'
import PaletteGeneratorProvider from '../context/paletteGenerator/Provider'
import frameOptions from '../jsons/frameOpetions.json'
import AppContent from '../layouts/AppContent'
import AppHeader from '../layouts/AppHeader'
import InputGroup from '../layouts/InputGroup'
const ExportColorModal = lazy(() => import('../components/reusable/modals/ExportColorModal'))

const PaletteGenerator = () => {
	const { palette, frame, frameIndex, template, totalTemplates, isPaletteAlreadySaved, actions } =
		useContext(PaletteGeneratorContext)

	return (
		<div>
			<AppHeader>
				<InputGroup
					minWidth={palette.length <= 2 ? (palette.length + 1) * 90 : palette.length * 75}>
					<div className='w-full'>
						<label className='label'>Color Palette</label>
						<section className='border-base-300 border flex justify-between items-center px-3 gap-x-3 rounded-md py-2 h-[45px] text-gray-200'>
							<Button
								variant='ghost'
								size='sm'
								leftIcon='charm:refresh'
								iconColor='text-gray-600'
								onClick={actions.handleRefreshPalette}
								iconSize='text-fs-5'
							/>
							{palette.map((color: string, index: number) => (
								<ColorPicker
									key={index}
									color={color}
									size='xs'
									value
									saturation
									box
									hue
									withRandomBtn
									withInput
									direction='none'
									onChange={(color) => actions.handleChangePaletteColor(index, color)}
								/>
							))}
							<Button
								variant='ghost'
								size='sm'
								leftIcon='charm:download'
								iconColor='text-gray-600'
								htmlFor='export-color-modal'
							/>
							<Button
								variant='ghost'
								size='sm'
								leftIcon={isPaletteAlreadySaved ? 'mdi:cards-heart' : 'mdi:cards-heart-outline'}
								iconColor='text-gray-600'
								onClick={actions.handleSavePalette}
							/>
						</section>
					</div>
					<Dropdown
						label='Select Frame'
						withIcon
						variant='outline'
						options={frameOptions}
						value={frame}
						onChange={actions.handleChangeFrame as any}
						minButtonWidth={200}
					/>
				</InputGroup>
			</AppHeader>
			<AppContent className='mt-0'>
				<section className='flex justify-end gap-x-3'>
					<Button
						leftIcon='material-symbols:chevron-left-rounded'
						iconSize='xl'
						size='sm'
						isCircle
						disabled={frameIndex === 0}
						onClick={() => actions.handleChangeFrameIndex('decrement')}
					/>
					<Button
						leftIcon='material-symbols:chevron-right-rounded'
						iconSize='xl'
						size='sm'
						isCircle
						disabled={frameIndex === totalTemplates}
						onClick={() => actions.handleChangeFrameIndex('increment')}
					/>
				</section>
				<AppContent
					className='grid fadeIn mt-3 resize overflow-auto place-items-center sm:px-8 sm:py-10 p-4  border border-gray-100 rounded-lg sm:rounded-[30px]'
					style={{
						backgroundColor: template?.background,
					}}>
					{template.component({
						palette,
					})}
				</AppContent>
			</AppContent>
			<ExportColorModal
				colorsPalette={palette}
				generateColorFor='palette'
			/>
		</div>
	)
}

export default () => (
	<PaletteGeneratorProvider>
		<PaletteGenerator />
	</PaletteGeneratorProvider>
)
