import './Promo.css';
import landingLogo from '../images/landingLogo.svg';

function Promo() {
    return(
        <div className='promo__page'>
            <div className='promo__image-container'>
            <img className='promo__image' alt='logo' src={landingLogo} />
            </div>
            <h1 className='promo__heading'>Учебный проект студента факультета Веб-разработки.</h1>
        </div>
    )
};
export default Promo;