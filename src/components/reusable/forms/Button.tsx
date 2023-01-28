import { Icon } from '@iconify/react'
import { TButtonVariant, TSize } from '../../../types/tailwind.types'

interface ButtonProps {
	variant?: TButtonVariant
	fullWidth?: boolean
	size?: TSize
	color?: string
	isBlock?: boolean
	isCircle?: boolean
	isSuare?: boolean
	isAnimated?: boolean
	isLoading?: boolean
	isGlass?: boolean
	leftIcon?: string
	rightIcon?: string
	iconSize?: string
	text?: string
	label?: string
	onClick?: () => void
	iconColor?: string
	htmlFor?: string
	className?: string
	disabled?: boolean
	ref?: any
}

const Button = ({
	variant = 'outline',
	size = 'md',
	fullWidth = false,
	isBlock = false,
	isCircle = false,
	isSuare = false,
	isAnimated = false,
	isLoading = false,
	isGlass = false,
	leftIcon,
	rightIcon,
	iconSize = 'md',
	text,
	label,
	onClick,
	color,
	iconColor,
	htmlFor,
	className,
	disabled = false,
	ref,
}: ButtonProps) => {
	return (
		<div>
			{label && (
				<label
					className='label'
					ref={ref}>
					{label}
				</label>
			)}
			<label
				ref={ref}
				htmlFor={htmlFor}
				onClick={disabled ? () => {} : onClick}
				style={{ color: color }}
				className={`btn ${disabled && 'btn-disabled'} gap-2
			${(leftIcon || rightIcon) && !text && 'btn-square'} btn-${variant} btn-${size} ${
					isBlock && 'btn-block'
				} ${isCircle && 'btn-circle'} ${isSuare && 'btn-square'} ${isAnimated && 'loading'} ${
					isLoading && 'btn-loading'
				} ${isGlass && 'btn-glass'} ${fullWidth && 'w-full'}  ${className}`}>
				{leftIcon && !isAnimated && (
					<Icon
						icon={leftIcon}
						className={`icon ${iconSize || size} ${iconColor} `}
					/>
				)}
				{text && <span className='btn-text  capitalize'>{text}</span>}
				{rightIcon && !isAnimated && (
					<Icon
						icon={rightIcon}
						className={`icon ${iconSize || size} ${iconColor} `}
					/>
				)}
			</label>
		</div>
	)
}

export default Button
