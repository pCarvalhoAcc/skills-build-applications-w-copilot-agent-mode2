import { useEffect, useState } from 'react'
import { displayValue, fetchEndpoint, getItems } from '../api'
import { ResourceTable } from './Users'

const endpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/` : '/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchEndpoint(endpoint, 'activities').then(getItems).then(setActivities).catch((loadError) => setError(loadError.message)) }, [])
  return <ResourceTable title="Activity feed" subtitle="Every session counts" error={error} columns={['Activity', 'Duration', 'Points']} rows={activities.map((activity) => [displayValue(activity.activityType ?? activity.name, 'Workout'), `${displayValue(activity.duration, 0)} min`, displayValue(activity.points, 0)])} />
}

export default Activities