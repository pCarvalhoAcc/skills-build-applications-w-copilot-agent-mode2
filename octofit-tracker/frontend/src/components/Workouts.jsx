import { useEffect, useState } from 'react'
import { displayValue, fetchResource } from '../api'
import { ResourceTable } from './Users'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchResource('workouts').then(setWorkouts).catch((loadError) => setError(loadError.message)) }, [])
  return <ResourceTable title="Workout library" subtitle="Sessions ready when you are" error={error} columns={['Workout', 'Description', 'Status']} rows={workouts.map((workout) => [displayValue(workout.name, 'Untitled workout'), displayValue(workout.description, 'No description yet'), workout.completed ? 'Completed' : 'Ready'])} />
}

export default Workouts