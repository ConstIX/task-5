export const deleteRandomChar = (str) => {
	if (str.length <= 1) return str
	const index = Math.floor(Math.random() * str.length)
	return str.slice(0, index) + str.slice(index + 1)
}

export const addRandomChar = (str, region) => {
	const alphabet = region === 'us' ? 'abcdefghijklmnopqrstuvwxyz' : 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'
	const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)]
	const index = Math.floor(Math.random() * str.length)
	return str.slice(0, index) + randomChar + str.slice(index)
}

export const swapAdjacentChars = (str) => {
	if (str.length < 2) return str
	const index = Math.floor(Math.random() * (str.length - 1))
	return str.slice(0, index) + str[index + 1] + str[index] + str.slice(index + 2)
}

export const applyRandomError = (str, region) => {
	const errorType = Math.floor(Math.random() * 3)
	switch (errorType) {
		case 0:
			return deleteRandomChar(str)
		case 1:
			return addRandomChar(str, region)
		case 2:
			return swapAdjacentChars(str)
		default:
			return str
	}
}

export const applyErrors = (str, errors, region) => {
	const fullErrors = Math.floor(errors)
	const fractionalError = errors - fullErrors
	let result = str

	for (let i = 0; i < fullErrors; i++) {
		result = applyRandomError(result, region)
	}

	if (Math.random() < fractionalError) {
		result = applyRandomError(result, region)
	}

	return result
}
