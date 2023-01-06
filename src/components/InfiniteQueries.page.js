import { useInfiniteQuery } from 'react-query'
import axios from 'axios'
import { Fragment } from 'react'

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

export const InfiniteQueriesPage = () => {
  const { isLoading, isError, error, data, hasNextPage, fetchNextPage } = useInfiniteQuery(['colors'], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1
      } else {
        return undefined
      }
    }
  })

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>InfiniteQueries Page</h2>
      <div>
        {data?.pages.map((group, index) => {
          return (
            <Fragment key={index}>
              {group.data.map(({ id, label }) => (
                <h3 key={id}>
                  {id} - {label}
                </h3>
              ))}
            </Fragment>
          )
        })}
      </div>
      <div>
        <button onClick={fetchNextPage} disabled={!hasNextPage}>Load more</button>
      </div>
    </>
  )
}
