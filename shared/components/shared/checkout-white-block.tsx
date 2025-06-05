import React from 'react'
import { cn } from '@/shared/lib'
import { Trash2 } from 'lucide-react'

type Props = {
	title: string
	hasClearCartBtn?: boolean
	className?: string
	classNamePb?: string
	children?: React.ReactNode
}

export const CheckoutWhiteBlock = ({
	title,
	hasClearCartBtn = false,
	className,
	classNamePb,
	children,
}: Props) => {
	return (
		<div
			className={cn(
				'rounded-4xl bg-white p-[35px] pb-0',
				'w-[752px] max-w-[752px]',
				'max-[787px]:w-screen max-[787px]:rounded-none',
				className
			)}
		>
			<div className={cn('flex justify-between items-center pb-6 border-b-2 border-[#f6f6f6]', classNamePb)}>
				<h4 className='text-[24px] font-bold'>{title}</h4>
				{hasClearCartBtn && (
					<button
						type='button'
						className='text-[16px] flex items-center gap-2 text-[#b8b8b8] hover:text-[#414141] transition duration-300'
					>
						<Trash2 size={16} />
						Очистить корзину
					</button>
				)}
			</div>
			<div>{children}</div>
		</div>
	)
}
