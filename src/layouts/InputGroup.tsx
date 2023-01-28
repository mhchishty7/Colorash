import React from 'react'

interface Props {
	children: React.ReactNode
	className?: string
	minWidth?: number
}

const InputGroup = ({ children, className, minWidth = 250 }: Props) => {
	return (
		<div
			className={`grid gap-4 ${className}`}
			style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))` }}>
			{children}
		</div>
	)
}

export default InputGroup
