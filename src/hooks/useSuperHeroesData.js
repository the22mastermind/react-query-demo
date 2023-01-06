import { useQuery, useMutation, useQueryClient } from 'react-query'
import { request } from '../utils/axios-utils'

const fetchSuperHeroes = () => {
  // return axios.get('http://localhost:4000/superheroes')
  return request({ url: '/superheroes' })
}

const addSuperHero = (hero) => {
  // return axios.post('http://localhost:4000/superheroes', hero)
  return request({ url: '/superheroes', method: 'post', data: hero })
}

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery('super-heroes', fetchSuperHeroes, {
    staleTime: 5000,
    // refetchOnMount: false,
    // refetchOnWindowFocus: true,
    onSuccess,
    onError,
    // select: (data) => {
    //   const superHeroesNames = data.data.map((hero) => hero.name)
    //   return superHeroesNames
    // }
  })
}

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient()
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries('super-heroes')
    //   queryClient.setQueryData('super-heroes', (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [
    //         ...oldQueryData.data,
    //         data.data,
    //       ],
    //     }
    //   })
    // },
    // Optimistic updates used the following onMutate, onError and onSettled callbacks
    onMutate: async (newHero) => {
      // In case mutation succeeds, update cache and display it
      await queryClient.cancelQueries('super-heroes')
      const previousHeroDetails = queryClient.getQueryData('super-heroes')
      queryClient.setQueryData('super-heroes', (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newHero }
          ]
        }
      })
      return {
        previousHeroDetails
      }
    },
    onError: (_error, _hero, context) => {
      // In case of error, roll back the mutation and set queryData to previous data
      queryClient.setQueryData('super-heroes', context.previousHeroDetails)
    },
    onSettled: () => {
      // In case mutation succeed or fails, refetch superheroes
      queryClient.invalidateQueries('super-heroes')
    },
  })
}
