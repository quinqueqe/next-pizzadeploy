import { axiosInstance } from './instance'
import { ApiRoutes } from './constants'
import { CartDTO, CreateCartItemValues } from './dto/cart.dto'

export const getCart = async (): Promise<CartDTO> => {
	const { data } = await axiosInstance.get<CartDTO>(ApiRoutes.CART)

	return data
}

export const updateQuantityItem = async (
	id: number,
	quantity: number
): Promise<CartDTO> => {
	const { data } = await axiosInstance.patch<CartDTO>('/cart/' + id, {
		quantity,
	})

	return data
}

export const removeCartItem = async (id: number): Promise<CartDTO> => {
	const { data } = await axiosInstance.delete<CartDTO>(`/cart/${id}`)

	return data
}
export const addCartItem = async (
	values: CreateCartItemValues
): Promise<CartDTO> => {
	const { data } = await axiosInstance.post<CartDTO>(`/cart/`, values)

	return data
}
