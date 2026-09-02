import { useEffect, useState } from 'react'
import { displayValue, fetchResource } from '../api'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchResource('users').then(setUsers).catch((loadError) => setError(loadError.message))
  }, [])

  return <ResourceTable title="Members" subtitle="People building momentum together" error={error} columns={['Name', 'Username', 'Email']} rows={users.map((user) => [displayValue(user.name), displayValue(user.username), displayValue(user.email)])} />
}

function ResourceTable({ title, subtitle, error, columns, rows }) {
  return <section className="resource-panel"><div className="section-heading"><div><p className="eyebrow">Directory</p><h2>{title}</h2><p>{subtitle}</p></div><span className="count-badge">{rows.length} total</span></div>{error && <p className="alert alert-warning">{error}</p>}<div className="table-responsive"><table className="table align-middle"><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.length ? rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>) : <tr><td colSpan={columns.length} className="empty-state">No records to show yet.</td></tr>}</tbody></table></div></section>
}

export { ResourceTable }
export default Users