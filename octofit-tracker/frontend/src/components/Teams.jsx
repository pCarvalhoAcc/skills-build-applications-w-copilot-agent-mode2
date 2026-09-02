import { useEffect, useState } from 'react'
import { displayValue, fetchResource } from '../api'
import { ResourceTable } from './Users'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchResource('teams').then(setTeams).catch((loadError) => setError(loadError.message)) }, [])
  return <ResourceTable title="Teams" subtitle="Find your crew and keep the pace" error={error} columns={['Team', 'Members', 'Focus']} rows={teams.map((team) => [displayValue(team.name), displayValue(team.members ?? team.memberCount, '—'), displayValue(team.description, 'Open challenge')])} />
}

export default Teams