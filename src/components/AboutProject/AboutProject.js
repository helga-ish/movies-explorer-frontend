import './AboutProject.css';

function AboutProject() {
    return(
        <section className='aboutproject' id='aboutProject'>
            <div className='aboutproject__head'>
                <h2 className='aboutproject__heading'>О проекте</h2>
            </div>
            <div className='aboutproject__stages'>
                <h3 className='aboutproject__stages-heading'>Дипломный проект включал 5 этапов</h3>
                <p className='aboutproject__stages-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                <h3 className='aboutproject__stages-heading'>На выполнение диплома ушло 5 недель</h3>
                <p className='aboutproject__stages-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            <div className='aboutproject__chart'>
                <h3 className='aboutproject__chart-heading'>1 неделя</h3>
                <h3 className='aboutproject__chart-heading'>4 недели</h3>
                <p className='aboutproject__chart-text'>Back-end</p>
                <p className='aboutproject__chart-text'>Front-end</p>
            </div>
        </section>
    )
};

export default AboutProject;