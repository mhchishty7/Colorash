import { useEffect } from 'react'

interface IUseClickOutside {
	(ref: React.RefObject<HTMLElement>, handler: (event: MouseEvent) => void): void
}

const useClickOutside: IUseClickOutside = (ref, handler) => {
	useEffect(() => {
		let startedInside = false
		let startedWhenMounted = false

		const listener = (event: MouseEvent) => {
			if (startedInside || !startedWhenMounted) return
			if (!ref.current || ref.current.contains(event.target as Node)) return
			handler(event)
		}

		const validateEventStart = (event: MouseEvent | TouchEvent) => {
			startedWhenMounted = ref.current !== null
			startedInside = (ref.current && ref.current.contains(event.target as Node)) || false
		}

		document.addEventListener('mousedown', validateEventStart)
		document.addEventListener('touchstart', validateEventStart)
		document.addEventListener('click', listener)

		return () => {
			document.removeEventListener('mousedown', validateEventStart)
			document.removeEventListener('touchstart', validateEventStart)
			document.removeEventListener('click', listener)
		}
	}, [ref, handler])
}

export default useClickOutside
