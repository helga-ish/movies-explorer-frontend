import { useNavigate } from "react-router-dom";
import './Error404.css';

export default function Error404() {

    const navigate = useNavigate();
    return(
        <main>
            <section className="error">
                    <div className="error__container">
                        <h1 className="error__number">404</h1>
                        <h2 className="error__name">Страница не найдена</h2>
                    </div>
                    <button className="error__back-button" type="button" onClick={() => navigate(-1)}>Назад</button>
            </section>
        </main>
    )
};