import './Footer.css';
import { useLocation } from 'react-router-dom';

function Footer() {

    const location = useLocation();

    return(
        <footer className="footer">
                    {location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies' ? 
                    (
                    <div className='footer__container'>
                        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                        <p className="footer__year">©2023</p>
                        <ul className="footer__nav">
                            <li className="footer__link">Яндекс.Практикум</li>
                            <li className="footer__link">Github</li>
                        </ul>
                    </div>
                    ) : (
                        <div></div>
                    )
    }
         </footer>
    );
}

export default Footer;