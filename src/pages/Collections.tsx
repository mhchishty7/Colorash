import React, { lazy } from 'react'
import FallBackLoader from '../components/reusable/FallBackLoader'
import AppContent from '../layouts/AppContent'
import { Palette, removePalette } from '../utils/savePalettes'
const ExportColorModal = lazy(() => import('../components/reusable/modals/ExportColorModal'))
const CollectionItem = lazy(() => import('../components/collection/CollectionItem'))

const Collections = () => {
	const [collections, setCollections] = React.useState<Palette[]>([])
	const [loading, setLoading] = React.useState(true)
	const [selectedPalette, setSelectedPalette] = React.useState<string[]>([])

	React.useEffect(() => {
		const savedPalettes = localStorage.getItem('savedPalettes')
		if (savedPalettes) {
			setCollections(JSON.parse(savedPalettes))
		}
		setLoading(false)
	}, [])

	const handleRemovePalette = (palette: Palette) => {
		removePalette(palette)
		setCollections((prev) => prev.filter((item) => item !== palette))
	}

	return (
		<div className=''>
			<AppContent>
				<h1 className='text-fs-6 font-medium mb-5'>Collections</h1>
				{loading ? (
					<FallBackLoader />
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 gap-10 lg:grid-cols-3'>
						{collections.map((collection: Palette, index) => {
							return (
								<CollectionItem
									collection={collection}
									handleRemovePalette={handleRemovePalette}
									setSelectedPalette={setSelectedPalette}
								/>
							)
						})}
					</div>
				)}
				{!loading && collections.length === 0 && (
					<div className='flex flex-col items-center gap-4'>
						<span className='text-gray-500'>You don't have any saved palettes</span>
					</div>
				)}
			</AppContent>
			<ExportColorModal
				colorsPalette={selectedPalette}
				generateColorFor='palette'
			/>
		</div>
	)
}

export default Collections
