import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

const fetchFriends = () => {
  return axios.get('http://localhost:4000/friends')
}

export const ParallelQueriesPage = () => {
  const { data: superheroes } = useQuery('super-heroes', fetchSuperHeroes)
  const { data: friends } = useQuery('friends', fetchFriends)

  return (
    <>
      <h2>ParallelQueries Page</h2>
      {superheroes?.data.map(({ id, name, alterEgo }) => (
        <div key={id}>{name} - {alterEgo}</div>
      ))}
      {friends?.data.map(({ id, name }) => (
        <div key={id}>{name}</div>
      ))}
    </>
  )
}
