import { lazy } from 'react'
import { Frame } from '../jsons/frameOpetions.json'

const UintyWebTemplate = lazy(() => import('./website/Unity'))
const MalikoWebTemplate = lazy(() => import('./website/Maliko'))
const Folio = lazy(() => import('./website/Folio'))
const RocketX = lazy(() => import('./website/RocketX'))

export type TemplateType = {
	component: (props: any) => JSX.Element
	colors: string[]
	background: string
	id: string
}

type TemplatesProps = {
	[key in Frame]: {
		[key: string]: TemplateType
	}
}

const templates: TemplatesProps = {
	Website: {
		'0': {
			id: '0',
			component: (props: any) => <UintyWebTemplate {...props} />,
			colors: ['#6C61D0', '#F7E0EB', '#A0D7E7'],
			background: '#ebedef',
		},
		'1': {
			id: '1',
			component: (props: any) => <RocketX {...props} />,
			colors: ['#1B867F', '#E1E0FF', '#FFE4B0', '#C3EDFF'],
			background: '#D0E2F2',
		},
		'2': {
			id: '2',
			component: (props: any) => <MalikoWebTemplate {...props} />,
			colors: ['#E29044', '#D6E3DD'],
			background: '#E5E0DA',
		},
		'3': {
			id: '3',
			component: (props: any) => <Folio {...props} />,
			colors: ['#448ACA'],
			background: '#d6e2e5',
		},
	},
	Mobile: {},
	Brochure: {},
	logo: {},
	branding: {},
	social: {},
	illustration: {},
}

export default templates
