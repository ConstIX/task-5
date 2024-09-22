import {Router} from 'express'
import {getFakeData} from '../services/fakeDataService.js'

const router = Router()

router.get('/', (req, res) => {
	const seed = parseInt(req.query.seed) || 0
	const region = req.query.region || 'us'
	const errors = parseFloat(req.query.errors) || 0
	const count = parseInt(req.query.count) || 20

	const dataWithErrors = getFakeData(seed, region, errors, count)
	res.json(dataWithErrors)
})

export default router
