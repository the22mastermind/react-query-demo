import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSuperHeroesData, useAddSuperHeroData } from '../hooks/useSuperHeroesData'

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState('')
  const [alterEgo, setAlterEgo] = useState('')

  const onSuccess = (data) => {
    console.log('Side effect after data fetching', data)
  }

  const onError = (error) => {
    console.log('Side effect after error', error)
  }

  const handleAddHero = () => {
    console.log({ name, alterEgo })
    const hero = { name, alterEgo }
    addHero(hero)
  }

  const { isLoading, data, isError, error, refetch } = useSuperHeroesData(onSuccess, onError)

  const { mutate: addHero } = useAddSuperHeroData()

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <div>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHero}>Add Hero</button>
      </div>
      <div>
        <button onClick={refetch}>Fetch heroes</button>
      </div>
      {data?.data.map(({ id, name }) => {
        return (
          <div key={id}>
            <Link to={`/rq-super-heroes/${id}`}>{name}</Link>
          </div>
        )
      })}
    </>
  )
}
