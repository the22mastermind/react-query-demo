import { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`)
}

export const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const { isLoading, isError, error, data, isFetching } = useQuery(['colors', pageNumber], () => fetchColors(pageNumber), {
    keepPreviousData: true,
  })

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>PaginatedQueries Page</h2>
      <div>
        {data?.data.map(({ id, label }) => {
          return (
            <div key={id}>
              <h2>{id} - {label}</h2>
            </div>
          )
        })}
      </div>
      <div>
        <button onClick={() => setPageNumber((page) => page - 1)} disabled={pageNumber === 1}>Prev page</button>
        <button onClick={() => setPageNumber((page) => page + 1)} disabled={pageNumber === 4}>Next page</button>
      </div>
      {isFetching && 'Loading'}
    </>
  )
}
