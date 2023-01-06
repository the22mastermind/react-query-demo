import { useQuery } from 'react-query'
import axios from 'axios'

const fetchuserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchSeriesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`)
}

export const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery(['user', email], () => fetchuserByEmail(email))
  const channelId = user?.data.channelId

  const { data: series } = useQuery(['series', channelId], () => fetchSeriesByChannelId(channelId), {
    enabled: !!channelId,
  })

  return (
    <>
      <h2>DependentQueries Page</h2>
      <p>{user?.data?.id} - {channelId}</p>
      {series?.data.series.map((showname, index) => (
        <div key={index}>{showname}</div>
      ))}
    </>
  )
}
