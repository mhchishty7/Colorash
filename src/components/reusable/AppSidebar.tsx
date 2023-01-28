import appNavigation from '../../jsons/appNavigation.json'
import Logo from './Logo'
import NavigationMenu from './navigation/NavigationMenu'

interface AppSidebarProps {
	isOpen: boolean
}

const AppSidebar = ({ isOpen }: AppSidebarProps) => {
	return (
		<aside
			className={`${
				isOpen && 'fadeInLeft'
			} w-[235px] px-3 border border-r-gray-200 min-h-screen flex flex-col py-4 gap-y-8 fixed  top-left bg-base-100`}>
			<header className='px-3 pt-2'>
				<Logo />
			</header>
			<NavigationMenu items={appNavigation} />
		</aside>
	)
}

export default AppSidebar
