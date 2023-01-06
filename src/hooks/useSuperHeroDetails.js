import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'

const fetchSuperHeroDetails = ({ queryKey }) => {
  const heroId = queryKey[1]
  return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const useSuperHeroDetails = (heroId) => {
  const queryClient = useQueryClient()

  return useQuery(['super-hero', heroId], fetchSuperHeroDetails, {
    initialData: () => {
      const hero = queryClient.getQueryData('super-heroes')?.data?.find((hero) => hero.id === parseInt(heroId))

      if (hero) {
        return {
          data: hero
        }
      } else {
        return undefined
      }
    }
  })
}
