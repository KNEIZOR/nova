import { Link } from 'react-router-dom';

import './Header.scss';

export function Header() {
    return (
        <header className="header">
            <div className="header__container">
                <Link to="/" className="header__logo">
                    FORMA
                </Link>

                <nav className="header__nav">
                    <a href="#services">Услуги</a>

                    <a href="#projects">Проекты</a>

                    <a href="#reviews">Отзывы</a>

                    <a href="#contact">Контакты</a>
                </nav>

                <a href="tel:+70000000000" className="header__phone">
                    +7 (000) 000-00-00
                </a>
            </div>
        </header>
    );
}
