import { useEffect, useState } from 'react'
import { displayValue, fetchResource } from '../api'
import { ResourceTable } from './Users'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchResource('leaderboard').then(setLeaders).catch((loadError) => setError(loadError.message)) }, [])
  const sortedLeaders = [...leaders].sort((first, second) => (second.score ?? second.points ?? 0) - (first.score ?? first.points ?? 0))
  return <ResourceTable title="Leaderboard" subtitle="A little friendly competition" error={error} columns={['Rank', 'Athlete', 'Score']} rows={sortedLeaders.map((leader, index) => [index + 1, displayValue(leader.username ?? leader.name, 'Athlete'), displayValue(leader.score ?? leader.points, 0)])} />
}

export default Leaderboard