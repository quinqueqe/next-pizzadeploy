import { ChooseProductModal } from '@/shared/components/shared'
import { notFound } from 'next/navigation'
import React from 'react'
import prisma from '@/prisma/prisma'

type Props = {
	params: Promise<{
		id: string
	}>
}

export default async function Modal({ params }: Props) {
	const { id } = await params
	const product = await prisma?.product.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			ingredients: true, // включил в product все его ингредиенты
			variations: true, // включил в product все его вариации
		},
	})

	if (!product) {
		// если не найдется продукт, то будет редирект на страницу notFound
		return notFound()
	}

	return (
		<div>
			<ChooseProductModal product={product} />
		</div>
	)
}
