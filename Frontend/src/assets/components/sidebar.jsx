import './sidebar.css';
import icons from '../../assets/icons';

export default function Sidebar() {
    return (
        <div className="db-sidebar">
            <div className="db-sb-icon">
                <img src={icons.icon1} alt="" />
                <p>RENAULT<p>NISSAN</p></p>
            </div>
            <div className="db-sb-items">
                <a href="/">
                    <img src={icons.icon6} alt="dashboard" />
                </a>
            </div>
            <div className="db-sb-items">
                <a href="/analytic">
                    <img src={icons.icon7} alt="analytics" />
                </a>
            </div>
            <div className="db-sb-items">
                <a href="/idea-prev">
                    <img src={icons.icon8} alt="ideas" />
                </a>
            </div>
            <div className="db-sb-items">
                <a href="/about">
                    <img src={icons.icon9} alt="about" />
                </a>
            </div>
            <div className="db-sb-items">
                <a href="/admin">
                    <img src={icons.icon10} alt="settings" />
                </a>
            </div>
        </div>
    )
}