import icons from '../assets/icons'
import './header.css'
import { useLocation } from 'react-router-dom';
import FetchRole from './fetchrole';

export default function Header() {

    // Dynamic title

    const role = FetchRole().role;
    const username = FetchRole().username;

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

    // Signin button function 

    const handlelogin = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/signin'
    };

    // Signout button function

    const handlelogout = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
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
                    {role === 'staff' || role === 'admin' ? (
                        <>
                            <img className="db-acc" src={icons.icon4} alt="Account" />
                            <p className="db-username">{username}</p>
                            <img className="db-logout" src={icons.icon5} alt="Logout" onClick={handlelogout}/>
                        </>
                    ) : (
                        <button className="db-button" onClick={handlelogin}>Login</button>
                    )}
                </div>
            </div>
        </>
    )
}