import './Promo.css';
import landingLogo from '../../images/landingLogo.svg';

function Promo() {
    return(
        <section className='promo'>
            <div className='promo__image-container'>
            <img className='promo__image' alt='логотип практикума' src={landingLogo} />
            </div>
            <h1 className='promo__heading'>Учебный проект студента факультета Веб-разработки.</h1>
        </section>
    )
};
export default Promo;