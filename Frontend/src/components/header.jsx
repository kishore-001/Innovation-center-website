import icons from '../assets/icons'
import './header.css'
import { useLocation } from 'react-router-dom';

export default function Header() {

    // Dynamic title

    const location = useLocation();

    const getTitle = () => {
        switch (location.pathname) {
            case '/':
                return 'Dashboard';
            case '/about':
                return 'About Us';
            case '/admin':
                return 'Admin';
            case '/analytic':
                return 'Analytics';
            case '/idea-com':
                return 'IdeaCom';
            case '/idea-prev':
                return 'IdeaPrev';
            default:
                return 'Dashboard';
        }
    };

    // Logout function 

    const handleClick = () => {
        localStorage.removeItem('token')
        window.location.href = '/signin'
    };
    return (
        <>
            {/* HEADER */}

            <div className="db-header">
                <div className="db-hd-box1">
                    <h1 className="db-title">{getTitle()}</h1>
                </div>
                <div className="db-hd-box2">
                    {/* <img className="db-acc" src={icons.icon4}></img>
                    <p className="db-username">RNT6001</p>
                    <img className="db-logout" src={icons.icon5}></img> */}
                    <button className="db-button" onClick={handleClick}>Log in</button>
                </div>
            </div>
        </>
    )
}