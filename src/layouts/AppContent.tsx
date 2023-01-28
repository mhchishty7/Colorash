import React from 'react'

interface Props {
	children?: React.ReactNode
	className?: string
	style?: React.CSSProperties
}

const AppContent = ({ children, className, style }: Props) => {
	return (
		<div
			className={`my-6 px-6 ${className}`}
			style={style}>
			{children}
		</div>
	)
}

export default AppContent
