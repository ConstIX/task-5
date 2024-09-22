import { Refresh } from '@mui/icons-material'
import { Box, Button, IconButton, MenuItem, Slider, TextField } from '@mui/material'
import { FC } from 'react'

const regions = [
  { label: 'USA', value: 'us' },
  { label: 'Polska', value: 'pl' },
  { label: 'Россия', value: 'ru' }
]

interface IFilter {
  region: string
  setRegion: (i: string) => void
  seed: string
  setSeed: (i: string) => void
  errors: number
  setErrors: (i: number) => void
  page: number
}

const Filter: FC<IFilter> = ({ region, setRegion, seed, setSeed, errors, setErrors, page }) => {
  const handleRandomSeed = () => {
    setSeed(String(Math.floor(Math.random() * 10000000)))
  }

  const handleSliderChange = (_e: Event, value: number | number[]) => {
    setErrors(value as number)
  }

  const handleExport = async () => {
    const response = await fetch(
      `server-production-67ba.up.railway.app/api/export-csv?region=${region}&seed=${seed}&errors=${errors}&count=${page * 10}`
    )

    if (response.ok) {
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'data.csv'
      a.click()
      window.URL.revokeObjectURL(url)
    } else {
      console.error('Ошибка при экспорте данных')
    }
  }

  return (
    <Box className="flex justify-between gap-10 md2:flex-col md2:gap-5">
      <Box className="flex items-center gap-5 md4:flex-col">
        <TextField
          select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          label="Region"
          variant="outlined"
          size="small"
          fullWidth
          sx={{ minWidth: '200px' }}>
          {regions.map((obj) => (
            <MenuItem key={obj.value} value={obj.value}>
              {obj.label}
            </MenuItem>
          ))}
        </TextField>

        <Box className="flex w-full items-center">
          <TextField
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            label="Seed"
            variant="outlined"
            size="small"
            fullWidth
          />
          <IconButton onClick={handleRandomSeed} color="primary">
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      <Box className="flex items-center gap-5 md4:flex-col-reverse md4:gap-1">
        <Slider value={errors} onChange={handleSliderChange} step={0.25} min={0} max={10} sx={{ minWidth: '150px' }} />
        <TextField
          label="Errors"
          type="number"
          value={errors}
          onChange={(e) => setErrors(parseFloat(e.target.value))}
          variant="outlined"
          size="small"
          fullWidth
          sx={{ minWidth: '150px' }}
          slotProps={{ htmlInput: { min: 0, max: 1000, step: 0.1 } }}
        />
      </Box>

      <Button onClick={handleExport} variant="contained" disableElevation>
        Export
      </Button>
    </Box>
  )
}

export default Filter
