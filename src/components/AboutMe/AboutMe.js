import './AboutMe.css';
import aboutmeAvatar from '../../images/aboutmeAvatar.jpg';

function AboutMe() {
    return(
        <section className='aboutme' id='student'>
            <div className='aboutme__head'>
                <h2 className='aboutme__heading'>Студент</h2>
            </div>
            <div className='aboutme__info'>
                <h3 className='aboutme__info-name'>Хельга</h3>
                <p className='aboutme__info-job'>Фронтенд-разработчица, 26 лет</p>
                <p className='aboutme__info-description'>Я родилась в Санкт-Петербурге, сейчас вместе с мужем и собакой живу в Куала-Лумпуре, столице Малайзии. По образованию - переводчик, лингвист, специалист по межкультурным коммуникациям. Придерживаюсь мнения, что веб-разработка - это творческий процесс.</p>
                <a className='aboutme__info-link' href="https://github.com/helga-ish" target="_blank" rel='noreferrer'>Github</a>
                <img className='aboutme__info-avatar' alt='аватар студента, выполнившего работу' src={ aboutmeAvatar }/>
            </div>
        </section>
    )
};

export default AboutMe;