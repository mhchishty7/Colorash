import { useState } from 'react'
import { TInputVariant, TSize } from '../../../types/tailwind.types'

interface InputProps {
	label?: string
	placeholder?: string
	value?: string | number
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	type?: string
	disabled?: boolean
	isError?: boolean
	errorMessage?: string
	className?: string
	size?: TSize
	leftSlot?: React.ReactNode
	rightSlot?: React.ReactNode
	variant?: TInputVariant
	required?: boolean
	min?: number
	max?: number
}

const Input = ({
	label,
	placeholder,
	value,
	onChange,
	type,
	disabled,
	isError,
	errorMessage,
	className,
	size = 'md',
	leftSlot,
	rightSlot,
	variant = 'bordered',
	required = false,
	min,
	max,
}: InputProps) => {
	const [isFocused, setIsFocused] = useState(false)

	const handleFocus = () => setIsFocused(true)
	const handleBlur = () => setIsFocused(false)

	return (
		<div>
			{label && (
				<label
					htmlFor={label}
					className='label justify-start gap-1'>
					{label}
					{required && <span className='text-red-500'>*</span>}
				</label>
			)}
			<div
				className={`flex items-center input-${variant} px-0 py-0 input
                input-${size}
                ${!isError && isFocused && 'border border-primary'} ${className}
                    ${isError && 'input-error'}
                `}
				onFocus={handleFocus}
				onBlur={handleBlur}>
				{leftSlot && <div className='px-2'>{leftSlot}</div>}
				<input
					type={type}
					id={label}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					disabled={disabled}
					min={min}
					max={max}
					className={`unstyled-input h-full ${leftSlot ? 'pl-1' : 'pl-3'} ${
						rightSlot ? 'pr-1' : 'pr-3'
					} w-full`}
				/>
				{rightSlot && <div className='px-2'>{rightSlot}</div>}
			</div>
			{errorMessage && <p className='text-error mt-1'>{errorMessage}</p>}
		</div>
	)
}

export default Input
