import './signin.css';
import icons from '../../assets//icons'
import images from '../../assets/images'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Signin() {

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/')
  }

  return (
    <div className="signin-container">
      <Helmet>
        <title>Sign In - Innovation Center</title>
      </Helmet>
      <div className="signin-box">
        <img
          src={icons.icon3}
          alt="Renault Nissan Logo"
          className="signin-logo"
        />
        <p className='signin-para'>Welcome to Innovation Center<br/>&emsp;&ensp;<span>Sign&nbsp;</span>into your account</p>
        <form onSubmit={handleSubmit}>
          <div className="signin-input-group">
            <label htmlFor="signin-username">Username</label>
            <input type="text" id="signin-username" name="signin-username" placeholder="Enter your username" />
          </div>
          <div className="signin-input-group">
            <label htmlFor="signin-password">Password</label>
            <input type="password" id="signin-password" name="signin-password" placeholder="Enter your password" />
          </div>
          <button type="submit" className="signin-button">Log in</button>
        </form>
        <p className="signin-link">
          Don&apos;t have an account? <a href="/register">Sign up</a>
        </p>
      </div>
      <div className="signin-image">
        <img src={images.img1} alt="Car Showroom" />
      </div>
    </div>
  );
}
