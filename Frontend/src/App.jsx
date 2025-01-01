import './App.css'
import { Routes, Route } from 'react-router-dom'
import About from './pages/About/About.jsx'
import Admin from './pages/Admin/Admin.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Idea from './pages/Idea/ideas.jsx'
import NotFound from './pages/Not_found/not_found.jsx'
import Register from './pages/Register/register.jsx'
import Signin from './pages/Signin/signin.jsx'
import Analytic from './pages/Analytics/Analytic.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/about" element={<About />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} /> 
      <Route path="/register" element={<Register />} />
      <Route path="/idea-prev" element={<Idea />} />
      <Route path="/analytic" element={<Analytic />} />
    </Routes>
  )
}