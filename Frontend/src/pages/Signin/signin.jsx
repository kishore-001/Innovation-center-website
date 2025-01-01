import './signin.css';
import icons from '../../assets//icons'
import images from '../../assets/images'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Signin() {

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();

    let username = event.target['signin-username'].value;
    const password = event.target['signin-password'].value;

    if(username !== 'admin'){
      username = username.toUpperCase();
    }

    fetch('http://localhost:5001/api/login', {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => {
      if (!response.ok) {
        if (response.status === 401) {
        alert('Incorrect username or password');
        }
        throw new Error('Incorrect username or password');
      }
      return response.json();
      })
      .then(data => {
      document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24}`;
      navigate('/');
      })
      .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      });
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
            <input type="text" id="signin-username" name="signin-username" placeholder="Enter your username" required/>
          </div>
          <div className="signin-input-group">
            <label htmlFor="signin-password">Password</label>
            <input type="password" id="signin-password" name="signin-password" placeholder="Enter your password" required/>
          </div>
          <button type="submit" className="signin-button">Log in</button>
        </form>
        <p className="signin-link">
          Don&apos;t have an account? <a href="/register">Sign up</a>
        </p>
        <p className='signin-guest'>
          Sign in as <a onClick={()=>{
            window.location.href = "/";
            document.cookie = "token=; path=/; max-age=0";
          }}>Guest</a>
        </p>
      </div>
      <div className="signin-image">
        <img src={images.img1} alt="Car Showroom" />
      </div>
    </div>
  );
}
