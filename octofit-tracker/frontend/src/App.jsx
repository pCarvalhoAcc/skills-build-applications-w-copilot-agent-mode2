import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  const location = useLocation()
  const navigation = [
    ['/activities', 'Activity'],
    ['/leaderboard', 'Leaderboard'],
    ['/teams', 'Teams'],
    ['/users', 'Members'],
    ['/workouts', 'Workouts'],
  ]
  const currentSection = navigation.find(([path]) => location.pathname.startsWith(path))

  return <div className="app-shell"><header className="app-header"><NavLink to="/activities" className="brand"><span className="brand-mark">O</span><span>Octofit <em>Tracker</em></span></NavLink><nav aria-label="Main navigation">{navigation.map(([path, label]) => <NavLink key={path} to={path} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{label}</NavLink>)}</nav><span className="status-dot">Live workspace</span></header><main className="app-main"><div className="page-intro"><p className="eyebrow">Your training command center</p><h1>{currentSection?.[1] ?? 'Octofit Tracker'}</h1><p className="intro-copy">Build consistency, celebrate progress, and keep your team moving.</p></div><Routes><Route path="/" element={<Navigate to="/activities" replace />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /><Route path="*" element={<Navigate to="/activities" replace />} /></Routes></main><footer>Octofit Tracker <span>•</span> Train with intention.</footer></div>
}

export default App
