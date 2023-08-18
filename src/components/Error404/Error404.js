import { useNavigate } from "react-router-dom";
import './Error404.css';

export default function Error404() {

    const navigate = useNavigate();
    return(
        <div className="error">
                <ul className="error__container">
                    <li><h1 className="error__number">404</h1></li>
                    <li><h2 className="error__name">Страница не найдена</h2></li>
                </ul>
                <button className="error__back-button" type="button" onClick={() => navigate(-1)}>Назад</button>
        </div>
    )
};