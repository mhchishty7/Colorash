import { Icon } from '@iconify/react'

interface Props {
	color: string
	bgColor: string
	largeTextColor: string
	normalTextColor: string
	iconTextColor: string
}

const ContrastTemplateExample = ({
	color,
	bgColor,
	largeTextColor,
	normalTextColor,
	iconTextColor,
}: Props) => {
	return (
		<div
			className='bg-[#F1EEE5] p-4 px-6 rounded-md flex flex-col gap-3 order-1'
			style={{ color: color, backgroundColor: bgColor }}>
			<header
				className='text-fs-10 font-bold'
				style={{
					color: largeTextColor,
				}}>
				Example
			</header>
			<p
				style={{
					color: normalTextColor,
				}}>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui obcaecati assumenda velit nam
				natus, quis voluptate neque blanditiis, possimus porro error! Sint libero doloribus eveniet
				voluptatibus deserunt maxime
			</p>
			<footer
				className='flex gap-4 mt-5'
				style={{
					color: iconTextColor,
				}}>
				<Icon
					icon='ph:dice-six-fill'
					className='icon xl'
				/>
				<Icon
					icon='ph:divide-bold'
					className='icon xl'
				/>
				<Icon
					icon='fluent:sport-american-football-24-filled'
					className='icon xl'
				/>
				<Icon
					icon='material-symbols:headphones'
					className='icon xl'
				/>
				<Icon
					icon='ic:round-image'
					className='icon xl'
				/>
				<Icon
					icon='bi:lightning-charge-fill'
					className='icon xl'
				/>
			</footer>
		</div>
	)
}

export default ContrastTemplateExample
