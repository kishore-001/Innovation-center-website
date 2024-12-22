// import icons from '../icons'
import './header.css'

export default function Header() {
    const handleClick = () => {
        localStorage.removeItem('token')
        window.location.href = '/signin'
    }
    return (
        <>
            {/* HEADER */}

            <div className="db-header">
                <div className="db-hd-box1">
                    <h1 className="db-title">Dashboard</h1>
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