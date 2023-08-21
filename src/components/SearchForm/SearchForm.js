import './SearchForm.css';
import searchFormIcon from '../../images/searchFormIcon.svg';
import searchFormToggle from '../../images/searchFormToggle.svg';
// import searchFormToggleOff from '../../images/searchFormToggleOff.svg';

export default function SearchForm() {
    return(
        <section className="search">
             <form className="searchForm" action="/search" method="get">
                <fieldset className='searchForm__container'>
                    <img className="searchForm__icon" alt='searchIcon' src={ searchFormIcon }/>
                    <input
                    className="searchForm__field" 
                    type="text" 
                    name="query" 
                    id="query" 
                    placeholder="Фильм"
                    required 
                    />
                    <input 
                    className="searchForm__button" 
                    type="submit" 
                    value="Найти" 
                    />
                </fieldset>
                <div className="searchForm__filter">
                    <img className="searchForm__toggle" alt='toggle' src={ searchFormToggle }/>
                    {/* <img className="searchForm__toggle" alt='toggle' src={ searchFormToggleOff }/> <-- вкл или выкл корометражек завязываются на стейт страницы */}
                    <h2 className="searchForm__toggle-name">Короткометражки</h2>
                </div>
            </form>
        </section>
    )
};