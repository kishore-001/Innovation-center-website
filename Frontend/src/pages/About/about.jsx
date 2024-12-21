import { Link } from 'react-router-dom'
import './about.css'

export default function About() {
  return (
    <div>
      <h1>About Page</h1>
      <Link to="/">Go to Dashboard</Link>
    </div>
  )
}