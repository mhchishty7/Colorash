import React from 'react'

interface Props {
	children: React.ReactNode
	className?: string
}

const AppHeader = ({ children, className }: Props) => {
	return (
		<div
			className={`px-6 py-0 lg:py-3 ${
				!className?.includes('static') && 'sticky'
			} ${className}  top-0 bg-base-100 z-50 `}>
			{children}
		</div>
	)
}

export default AppHeader
