import { Icon } from '@iconify/react'
import { NavLink as RouterNavLink } from 'react-router-dom'

interface INavLinkProps {
	label: string
	path: string
	icon: string
}

const NavLink = ({ label, path, icon }: INavLinkProps) => {
	return (
		<RouterNavLink
			key={label}
			to={path}
			className={({ isActive }) =>
				`flex items-center gap-x-3 ${isActive ? 'active' : 'text-gray-500'}`
			}>
			<Icon
				icon={icon}
				className='text-fs-2'
			/>
			{label}
		</RouterNavLink>
	)
}

export default NavLink
