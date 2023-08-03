import './AboutMe.css';
import aboutmeAvatar from '../images/aboutmeAvatar.jpg';

function AboutMe() {
    return(
        <section className='aboutme' id='student'>
            <div className='aboutme__head'>
                <h1 className='aboutme__heading'>Студент</h1>
            </div>
            <div className='aboutme__info'>
                <h2 className='aboutme__info-name'>Хельга</h2>
                <p className='aboutme__info-job'>Фронтенд-разработчица, 26 лет</p>
                <p className='aboutme__info-description'>Я родилась в Санкт-Петербурге, сейчас вместе с мужем и собакой живу в Куала-Лумпуре, столице Малайзии. По образованию - переводчик, лингвист, специалист по межкультурным коммуникациям. Придерживаюсь мнения, что веб-разработка - это творческий процесс. После прохождения курса по разработке начала заниматься фрилансом. Помимо программирования увлекаюсь фитнесом, кино и переводами комиксов.</p>
                <a className='aboutme__info-link' href="/">Github</a>
                <img className='aboutme__info-avatar' alt='avatar' src={ aboutmeAvatar }/>
            </div>
        </section>
    )
};

export default AboutMe;