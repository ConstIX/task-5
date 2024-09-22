import { Box } from '@mui/material'
import { useState } from 'react'
import DataTable from './components/DataTable'
import Filter from './components/Filter'

const App = () => {
  const [region, setRegion] = useState<string>('us')
  const [seed, setSeed] = useState<string>('0')
  const [errors, setErrors] = useState<number>(0)
  const [page, setPage] = useState<number>(2)

  return (
    <Box className="mx-auto w-full max-w-6xl px-3 py-10">
      <Filter
        region={region}
        setRegion={setRegion}
        seed={seed}
        setSeed={setSeed}
        errors={errors}
        setErrors={setErrors}
        page={page}
      />

      <DataTable region={region} seed={seed} errors={errors} page={page} setPage={setPage} />
    </Box>
  )
}

export default App
