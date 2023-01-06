import { useParams } from 'react-router-dom'
import { useSuperHeroDetails } from '../hooks/useSuperHeroDetails'

export const RQSuperHeroPage = () => {
  const { heroId } = useParams()

  // const onSuccess = (data) => {
  //   console.log('Side effect after data fetching', data)
  // }

  // const onError = (error) => {
  //   console.log('Side effect after error', error)
  // }

  const { isLoading, data, isError, error, refetch } = useSuperHeroDetails(heroId)

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>RQ Super Hero Details Page</h2>
      <button onClick={refetch}>Fetch heroes</button>
      <div>
        {data?.data.name} - {data?.data.alterEgo}
      </div>
    </>
  )
}
