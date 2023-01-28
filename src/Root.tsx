import { lazy, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Button from './components/reusable/forms/Button'
import Logo from './components/reusable/Logo'
import AppContent from './layouts/AppContent'
const AppSidebar = lazy(() => import('./components/reusable/AppSidebar'))

const Root = () => {
	const sidebarRef = useRef(null)
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div
			className='flex'
			ref={sidebarRef}>
			<aside className={`${!isOpen && 'hidden'} lg:flex w-screen absolute left-0 bg-black `}>
				<AppSidebar isOpen={isOpen} />
			</aside>
			<section className='lg:pl-[235px] pl-0 w-full min-h-screen'>
				<AppContent
					className='block lg:hidden sticky top-0 z-[199] py-5 bg-base-100'
					style={{ margin: 0 }}>
					<div className='flex lg:hidden justify-between items-center '>
						<Logo />
						<Button
							leftIcon='octicon:three-bars-16'
							onClick={() => setIsOpen(!isOpen)}
						/>
					</div>
				</AppContent>
				<div onClick={() => isOpen && setIsOpen(false)}>
					<Outlet />
				</div>
			</section>
		</div>
	)
}

export default Root
