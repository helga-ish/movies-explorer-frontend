import './Techs.css';

function Techs() {
    return(
        <section className='techs' id='techs'>
            <div className='techs__head'>
                <h1 className='techs__heading'>Технологии</h1>
            </div>
            <div className='techs__description'>
                <h2 className='techs__description-heading'>7 технологий</h2>
                <p className='techs__description-text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className='techs__description-buttons'>
                    <li className='techs__buttons-element'>HTML</li>
                    <li className='techs__buttons-element'>CSS</li>
                    <li className='techs__buttons-element'>JS</li>
                    <li className='techs__buttons-element'>React</li>
                    <li className='techs__buttons-element'>Git</li>
                    <li className='techs__buttons-element'>Express.js</li>
                    <li className='techs__buttons-element'>mongoDB</li>
                </ul>
            </div>
        </section>
    )
};

export default Techs;