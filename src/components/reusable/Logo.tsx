import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { AppRoutes } from '../../constants/routes.constants'

const Logo = () => {
	return (
		<Link
			to={AppRoutes.Home}
			className='flex text-fs-7 lg:text-fs-6 items-center gap-x-2 text-primary'>
			<Icon icon='ph:paint-brush-fill' />
			<span className='font-bold'>Colorash</span>
		</Link>
	)
}

export default Logo
