import { useSet } from 'react-use'
import { filteredPizzasByType } from '../lib'
import { useModal } from '../store'
import { sizes, types } from '../constants/pizza'
import { Variation } from '@prisma/client'

/**
 * Этот хук предоставляет опции и детали для выбора пиццы.
 *
 * @param variations - Массив доступных вариаций пиццы.
 * @returns Объект, содержащий активные выбранные значения, обработчики и вычисленные детали.
 * /** */
export const usePizzaOptions = (variations: Variation[]) => {
	const { activeSize, activeType, setActiveSize, setActiveType } = useModal()
	const [selectedIds, { add, remove }] = useSet(new Set<number>())
	const size = sizes[activeSize].value
	const productItemId =
		variations.find(item => item.pizzaType === activeType && item.size === size)
			?.id ?? 0
	filteredPizzasByType(variations!, types, activeType)

	return {
		activeSize,
		activeType,
		setActiveSize,
		setActiveType,
		selectedIds,
		add,
		remove,
		size,
		sizes,
		types,
		productItemId,
	}
}
