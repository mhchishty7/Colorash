import { Icon } from '@iconify/react'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import useClickOutside from '../../../hooks/useClickOutside'
import { DropdownOptions } from '../../../types/dropdown.type'
import { TButtonVariant, TRadius, TShadow, TSize } from '../../../types/tailwind.types'

interface DropdownProps {
	options?: DropdownOptions[]
	value?: string
	placeholder?: string
	label?: string
	dropDownwidth?: number | string
	children?: React.ReactNode | JSX.Element
	button?: React.ReactNode
	minButtonWidth?: number | string
	buttonSize?: TSize
	withIcon?: boolean
	icon?: string
	iconSize?: TSize
	iconPosition?: 'left' | 'right'
	iconColor?: string
	variant?: TButtonVariant
	directionX?: 'left' | 'end' | 'right' | 'none'
	directionY?: 'top' | 'bottom' | 'none'
	contentMargin?: string
	contentPadding?: string
	contentWidth?: string
	contentHeight?: string
	contentBorderRadius?: TRadius
	contentBorder?: string
	contentBoxShadow?: TShadow
	contentBackgroundColor?: string
	contentColor?: string
	hover?: boolean
	onChange?: (value: string) => void
	search?: boolean
	isScrollable?: boolean
	tabIndex?: number
	setIsDropdownOpen?: (value: boolean) => void
	onOpen?: () => void
	onClose?: () => void
}

const Dropdown = ({
	options,
	placeholder,
	label,
	value,
	dropDownwidth,
	children,
	button,
	buttonSize = 'md',
	minButtonWidth = 140,
	withIcon = true,
	icon = 'akar-icons:chevron-vertical',
	iconSize = 'md',
	iconPosition = 'right',
	iconColor = 'text-gray-600',
	variant,
	directionY = 'bottom',
	directionX = 'left',
	hover,
	contentMargin = 'mt-2',
	contentPadding = 'p-2',
	contentWidth = 'w-56',
	contentHeight = 'max-h-[220px]',
	contentBorderRadius = 'md',
	contentBoxShadow = 'shadow',
	contentBackgroundColor = 'bg-base-100',
	contentColor = 'text-base-content',
	onChange,
	search = false,
	isScrollable = true,
	tabIndex = 0,
	onOpen,
	onClose,
	setIsDropdownOpen,
}: DropdownProps) => {
	const popover = useRef(null)
	const [isOpen, toggle] = useState(false)

	const close = useCallback(() => {
		toggle(false)
		onClose && onClose()
	}, [])

	const handleToggle = () => {
		onOpen && onOpen()
		toggle(!isOpen)
	}

	useClickOutside(popover, close)

	const [searchValue, setSearchValue] = React.useState('')
	const [error, setError] = React.useState('')

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}

	const handleOptionClick = (value: string) => onChange && onChange(value)

	const filteredOptions = useMemo(() => {
		if (!searchValue) {
			setError('')
			return options
		}
		const filtered = options?.filter((option: DropdownOptions) =>
			option.label.toLowerCase().includes(searchValue.toLowerCase())
		)
		!filtered || filtered.length === 0 ? setError('No results found') : setError('')
		return filtered
	}, [options, searchValue])

	return (
		<div>
			{label && <label className='label'>{label}</label>}
			<div
				className={`dropdown  ${directionY} ${directionX} w-full rounded-md   ${
					hover && 'dropdown-hover'
				} dropdown-open `}
				style={{
					width: dropDownwidth,
					backgroundColor: 'transparent',
				}}>
				{button ? (
					<span
						className='contents'
						onClick={handleToggle}>
						{button}
					</span>
				) : (
					<label
						className={`btn btn-${buttonSize} btn-${variant} gap-3 justify-between `}
						style={{ minWidth: minButtonWidth }}
						onClick={handleToggle}>
						{withIcon && iconPosition === 'left' && (
							<Icon
								icon={icon}
								className={`icon ${iconSize} ${iconColor}`}
							/>
						)}
						<span>{value || placeholder}</span>
						{withIcon && iconPosition === 'right' && (
							<Icon
								icon={icon}
								className={`icon ${iconSize} ${iconColor}`}
							/>
						)}
					</label>
				)}

				{isOpen &&
					(children ? (
						<div
							ref={popover}
							className='dropdown-content'>
							{children}
						</div>
					) : (
						<div
							ref={popover}
							className={`dropdown-content menu flex-nowrap ${contentWidth} ${contentBackgroundColor}   ${contentBoxShadow}  rounded-${contentBorderRadius}  ${contentPadding} ${contentMargin}  `}>
							{search && (
								<input
									type='text'
									className='input input-sm mb-2 input-bordered w-full sticky top-0 z-10'
									placeholder='Search'
									onChange={handleSearchChange}
								/>
							)}
							<ul
								className={` ${contentColor} ${contentHeight}  ${
									isScrollable ? 'overflow-auto' : 'max-h-max'
								} `}>
								{filteredOptions?.map((option: DropdownOptions) => (
									<li onClick={() => !option.disabled && handleOptionClick(option.value)}>
										<a
											className={`${value === option.value && 'bg-primary text-white'} ${
												option.disabled && 'disabled'
											} `}>
											{option.label}
										</a>
									</li>
								))}
								{error && (
									<li>
										<a>{error}</a>
									</li>
								)}
							</ul>
						</div>
					))}
			</div>
		</div>
	)
}

export default Dropdown
