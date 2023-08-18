import './Portfolio.css';
import portfolioArrow from '../../images/portfolioArrow.svg';

function Portfolio() {
    return(
        <section className='portfolio'>
            <h1 className='portfolio__heading'>Портфолио</h1>
            <ul className='portfolio__nav'>
                <li className='portfolio__nav-element'>Статичный сайт</li>
                <div className='portfolio__nav-arrow-div'><img className='portfolio__nav-arrow' alt='arrow' src={ portfolioArrow } /></div>
                <li className='portfolio__nav-element'>Адаптивный сайт</li>
                <div className='portfolio__nav-arrow-div'><img className='portfolio__nav-arrow' alt='arrow' src={ portfolioArrow } /></div>
                <li className='portfolio__nav-element'>Одностраничное приложение</li>
                <div className='portfolio__nav-arrow-div'><img className='portfolio__nav-arrow' alt='arrow' src={ portfolioArrow } /></div>
            </ul>
        </section>
    )
};

export default Portfolio;