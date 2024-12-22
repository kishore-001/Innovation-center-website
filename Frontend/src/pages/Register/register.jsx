import './register.css'
import icons from '../../assets//icons'
import images from '../../assets/images'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/signin')
  }
  return (
    <div className="reg-container">
      <div className="reg-box">
        <img
          src={icons.icon3}
          alt="Renault Nissan Logo"
          className="reg-logo"
        />
        <p className='reg-para'>Welcome to Innovation Center<br/>&emsp;&ensp;<span>Sign&nbsp;</span>into your account</p>
        <form onSubmit={handleSubmit}>
          <div className="reg-input-group">
            <label htmlFor="reg-username">Username</label>
            <input type="text" id="reg-username" name="reg-username" placeholder="Enter your username" />
          </div>
          <div className="reg-input-group">
            <label htmlFor="reg-password">Password</label>
            <input type="password" id="reg-password" name="reg-password" placeholder="Enter your password" />
          </div>
          <button type="submit" className="reg-button">Register</button>
        </form>
        <p className="reg-link">
           have an account? <a href="/signin">Sign in</a>
        </p>
      </div>
      <div className="reg-image">
        <img src={images.img2} alt="Car Showroom" />
      </div>
    </div>
  )
}