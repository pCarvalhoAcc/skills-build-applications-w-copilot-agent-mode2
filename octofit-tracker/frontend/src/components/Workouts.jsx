import { useEffect, useState } from 'react'
import { displayValue, fetchEndpoint, getItems } from '../api'
import { ResourceTable } from './Users'

const endpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/` : '/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchEndpoint(endpoint, 'workouts').then(getItems).then(setWorkouts).catch((loadError) => setError(loadError.message)) }, [])
  return <ResourceTable title="Workout library" subtitle="Sessions ready when you are" error={error} columns={['Workout', 'Description', 'Status']} rows={workouts.map((workout) => [displayValue(workout.name, 'Untitled workout'), displayValue(workout.description, 'No description yet'), workout.completed ? 'Completed' : 'Ready'])} />
}

export default Workouts