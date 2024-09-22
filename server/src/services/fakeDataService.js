import {faker as fakerEN_US} from '@faker-js/faker/locale/en_US'
import {faker as fakerPL} from '@faker-js/faker/locale/pl'
import {faker as fakerRU} from '@faker-js/faker/locale/ru'
import {applyErrors} from '../utils/errorUtils.js'

export const getFakeData = (seed, region, errors, count) => {
	let fakerInstance

	switch (region) {
		case 'pl':
			fakerInstance = fakerPL
			break
		case 'ru':
			fakerInstance = fakerRU
			break
		default:
			fakerInstance = fakerEN_US
	}

	fakerInstance.seed(seed)
	const data = []

	for (let i = 0; i < count; i++) {
		const entry = {
			id: fakerInstance.string.uuid(),
			fullName: fakerInstance.person.fullName(),
			address: fakerInstance.location.streetAddress(),
			phoneNumber: fakerInstance.phone.number(),
		}

		data.push({
			...entry,
			fullName: applyErrors(entry.fullName, errors, region),
			address: applyErrors(entry.address, errors, region),
			phoneNumber: applyErrors(entry.phoneNumber, errors, region),
		})
	}

	return data
}
