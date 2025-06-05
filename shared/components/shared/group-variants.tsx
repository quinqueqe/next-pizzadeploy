import { cn } from '@/shared/lib'
import React from 'react'

export type Item = {
	value: number
	name: string
}

type Props = {
	items: Item[]
	disabled?: boolean
	onClick: (i: number) => void
	active: number
	classNameBtn?: string
}

export const GroupVariants = ({
	items,
	onClick,
	active,
	classNameBtn,
}: Props) => {
	return (
		<div className='rounded-[30px] bg-[#ececec] pb-5 w-[420px] h-[42px] flex max-[1100px]:w-full'>
			{items.map((item: Item, i: number) => (
				<div key={i} className={cn('p-1', '')}>
					<button
						className={cn(
							'text-[#000] text-center py-[5px] rounded-4xl select-none transition-all duration-400',
							active === i && 'bg-white',

							classNameBtn
						)}
						onClick={() => onClick(i)}
					>
						{item.name}
					</button>
				</div>
			))}
		</div>
	)
}
