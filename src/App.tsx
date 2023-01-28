import { extend } from 'colord'
import a11yPlugin from 'colord/plugins/a11y'
import mixPlugin from 'colord/plugins/mix'
import namesPlugin from 'colord/plugins/names'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import FallBackLoader from './components/reusable/FallBackLoader'
import { routes } from './routes'

extend([namesPlugin, mixPlugin, a11yPlugin])

const App = () => {
	return (
		<>
			<RouterProvider
				router={routes}
				fallbackElement={<FallBackLoader />}
			/>
			<Toaster position='bottom-center' />
		</>
	)
}

export default App
