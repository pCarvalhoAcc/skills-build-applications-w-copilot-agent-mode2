import { useEffect, useState } from 'react'
import { displayValue, fetchEndpoint, getItems } from '../api'
import { ResourceTable } from './Users'

const endpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/` : '/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchEndpoint(endpoint, 'teams').then(getItems).then(setTeams).catch((loadError) => setError(loadError.message)) }, [])
  return <ResourceTable title="Teams" subtitle="Find your crew and keep the pace" error={error} columns={['Team', 'Members', 'Focus']} rows={teams.map((team) => [displayValue(team.name), displayValue(team.members ?? team.memberCount, '—'), displayValue(team.description, 'Open challenge')])} />
}

export default Teams