import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/prisma'
import { updateCartTotalAmount } from '@/shared/lib'

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params
	const userId = Number(id)

	const userCart = await prisma?.cart.findFirst({
		where: {
			userId,
		},
		include: {
			items: {
				include: {
					productItem: {
						include: {
							product: true,
						},
					},
					ingredients: true,
				},
			},
		},
	})

	return NextResponse.json(userCart)
}
/**
 * Это PATCH-запрос обновляет количество определенного пункта корзины
 * на основе переданного идентификатора пункта и нового количества.
 * Он также обновляет общую сумму корзины пользователя.
 *
 * Шаги:
 * 1. Извлечь идентификатор пункта из параметров запроса и новое
 *    количество из тела запроса.
 * 2. Получить токен корзины из cookies.
 * 3. Проверить наличие токена корзины и существование пункта корзины.
 * 4. Обновить количество пункта корзины в базе данных.
 * 5. Пересчитать общую сумму для корзины пользователя.
 * 6. Вернуть обновленные сведения о корзине в ответе.
 */
export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params
		const cartItemId = Number(id)
		const data = (await req.json()) as { quantity: number }
		const token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json({ error: 'Cart token not found' })
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id: cartItemId,
			},
		})

		if (!cartItem) {
			return NextResponse.json({ error: 'Cart item not found' })
		}

		await prisma.cartItem.update({
			where: {
				id: cartItemId,
			},
			data: {
				quantity: data.quantity,
			},
		})

		const updatedUserCart = await updateCartTotalAmount(token)

		return NextResponse.json(updatedUserCart)
	} catch (error) {
		console.log('[CART_PATCH] Server error', error)
		return NextResponse.json(
			{ message: 'Не удалось создать корзину' },
			{ status: 500 }
		)
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params
		const token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json({ error: 'Cart token not found' })
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id: Number(id),
			},
		})

		if (!cartItem) {
			return NextResponse.json({ error: 'Cart item not found' })
		}

		await prisma.cartItem.delete({
			where: {
				id: Number(id),
			},
		})

		const updatedUserCart = await updateCartTotalAmount(token)

		return NextResponse.json(updatedUserCart)
	} catch (error) {
		console.log('[CART_DELETE] Server error', error)
		return NextResponse.json(
			{ message: 'Не удалось создать корзину' },
			{ status: 500 }
		)
	}
}
