import './Footer.css';

function Footer() {
    return(
        <footer className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <p className="footer__year">© 2023</p>
            <ul className="footer__nav">
                <li className="footer__link">Яндекс.Практикум</li>
                <li className="footer__link">Github</li>
            </ul>
         </footer>
    );
}

export default Footer;