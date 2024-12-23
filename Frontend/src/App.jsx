import './App.css'
import { Routes, Route } from 'react-router-dom'
import About from './pages/About/about.jsx'
import Admin from './pages/Admin/admin.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import IdeaCom from './pages/Idea-com/idea-com.jsx'
import IdeaPrev from './pages/Idea-prev/idea-prev.jsx'
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
      <Route path="/idea-com" element={<IdeaCom />} />
      <Route path="/idea-prev" element={<IdeaPrev />} />
      <Route path="/analytic" element={<Analytic />} />
    </Routes>
  )
}