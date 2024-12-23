import './footer.css';
import icons from '../assets/icons';

export default function Footer() {
    return (
        <>
            <div className="footer">
                <div className="footer-left">
                    <img src={icons.icon1} alt="Renault Nissian logo" />
                    <p>Renault Nissan Automotive India Private Limited</p>
                </div>
                <div className="footer-right">
                    <p className='footer-contact'>CONTACT</p>
                    <div className="footer-in-box1">
                        <img src={icons.icon11} alt="phone-icon" />
                        <a href="tel:+918939933077">
                            Phone: +91 89399 33077
                        </a>
                    </div>
                    <div className="footer-in-box2">
                        <img src={icons.icon12} alt="mail-icon" />
                        <a href="mailto:innovationcenterrnaipl@outlook.com">innovationcenterrnaipl@outlook.com</a>
                    </div>
                </div>
            </div>
            <p className="footer-text">&copy; 2024 RNAIPL . All rights reserverd.</p>
        </>
    )
}