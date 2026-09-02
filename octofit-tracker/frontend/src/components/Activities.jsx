import { useEffect, useState } from 'react'
import { displayValue, fetchResource } from '../api'
import { ResourceTable } from './Users'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchResource('activities').then(setActivities).catch((loadError) => setError(loadError.message)) }, [])
  return <ResourceTable title="Activity feed" subtitle="Every session counts" error={error} columns={['Activity', 'Duration', 'Points']} rows={activities.map((activity) => [displayValue(activity.activityType ?? activity.name, 'Workout'), `${displayValue(activity.duration, 0)} min`, displayValue(activity.points, 0)])} />
}

export default Activities