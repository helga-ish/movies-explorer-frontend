import './Portfolio.css';

function Portfolio() {
    return(
        <section className='portfolio'>
            <h2 className='portfolio__heading'>Портфолио</h2>
            <ul className='portfolio__nav'>
                <li className='portfolio__nav-element'>
                    <a className='portfolio__nav-link' href='https://helga-ish.github.io/how-to-learn/' target="_blank" rel='noreferrer'>
                        Статичный сайт
                        <button type='button' className='portfolio__nav-arrow' />
                    </a>
                </li>
                <li className='portfolio__nav-element'>
                    <a className='portfolio__nav-link' href='https://helga-ish.github.io/russian-travel/' target="_blank" rel='noreferrer'>
                        Адаптивный сайт
                        <button type='button' className='portfolio__nav-arrow'/>
                    </a>
                </li>
                <li className='portfolio__nav-element'>
                    <a className='portfolio__nav-link' href='https://mesto.place.nomoredomains.work' target="_blank" rel='noreferrer'>
                        Одностраничное приложение
                        <button type='button' className='portfolio__nav-arrow' />
                    </a>
                </li>
            </ul>
        </section>
    )
};

export default Portfolio;