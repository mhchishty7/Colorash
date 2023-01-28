import ReactDOMServer from 'react-dom/server'

interface HighlightCodeProps {
	component: JSX.Element
	className?: string
}

const HighlightCode = ({ component, className }: HighlightCodeProps) => {
	const code =
		typeof component === 'string' ? component : ReactDOMServer.renderToStaticMarkup(component)

	return (
		<div className={`bg-gray-700 text-white p-5 rounded-xl  italic ${className}`}>
			<div className='flex gap-x-2 mb-3'>
				<div className='bg-[#FC605B] h-[10px] w-[10px] rounded-xl'></div>
				<div className='bg-[#FCBB40] h-[10px] w-[10px] rounded-xl'></div>
				<div className='bg-[#33C648] h-[10px] w-[10px] rounded-xl'></div>
			</div>
			<code>
				{code.split(' ').map((word, index) => {
					return (
						<span key={index}>
							{word.includes('>')
								? word.split('').map((word, index) => {
										return (
											<span key={index}>
												{word === '>' ? (
													<>
														{word} <br />
													</>
												) : (
													word
												)}
											</span>
										)
								  })
								: ' ' + word + ' '}
						</span>
					)
				})}
			</code>
		</div>
	)
}

export default HighlightCode
