import express from 'express'
import cors from 'cors'
import fakeData from './routes/fakeData.js'
import exportData from './routes/exportData.js'

const app = express()
app.use(cors())

app.use('/api/fake-data', fakeData)
app.use('/api/export-csv', exportData)

app.listen(5000, () => {
	console.log(`Server is running on port ${5000}`)
})
