import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { FC, useEffect } from 'react'
import { useGetFakeDataQuery } from '../redux/services/users'

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'fullName', label: 'Name' },
  { id: 'address', label: 'Address' },
  { id: 'phoneNumber', label: 'Phone' }
]

interface IDataTable {
  region: string
  seed: string
  errors: number
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const DataTable: FC<IDataTable> = ({ region, seed, errors, page, setPage }) => {
  const { data, isFetching } = useGetFakeDataQuery({
    region,
    seed: parseInt(seed),
    errors,
    count: page * 10
  })

  useEffect(() => setPage(2), [region, seed, setPage])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetching) {
        setPage((prev: number) => prev + 1)
      }
    })

    const target = document.getElementById('load-more')
    if (target) {
      observer.observe(target)
    }

    return () => {
      if (target) {
        observer.unobserve(target)
      }
    }
  }, [isFetching, setPage])

  return (
    <Box className="mt-20 md2:mt-16 md4:mt-10">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              {columns.map((obj) => (
                <TableCell key={obj.id} sx={{ fontWeight: 600 }}>
                  {obj.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data &&
              data.map((row, idx) => (
                <TableRow key={row.id}>
                  <TableCell>{idx + 1}</TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{row[column.id]}</TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div id="load-more" />
    </Box>
  )
}

export default DataTable
