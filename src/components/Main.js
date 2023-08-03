import './Main.css';
import Promo from './Promo.js';
import NavTab from './NavTab.js';
import AboutProject from './AboutProject.js';
import Techs from './Techs.js';
import AboutMe from './AboutMe.js';
import Portfolio from './Portfolio.js';

function Main() {
    return(
        <main className='main'>
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
        </main>
    )
};

export default Main;