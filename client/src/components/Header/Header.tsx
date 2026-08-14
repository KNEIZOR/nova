import { useState } from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="header">
            <div className="header__container">
                <Link to="/" className="header__logo" onClick={closeMenu}>
                    NOVA
                </Link>

                <nav
                    className={`header__nav ${
                        isMenuOpen ? 'header__nav--open' : ''
                    }`}
                >
                    <a href="/#services" onClick={closeMenu}>
                        Услуги
                    </a>

                    <a href="/#projects" onClick={closeMenu}>
                        Проекты
                    </a>

                    <a href="/#reviews" onClick={closeMenu}>
                        Отзывы
                    </a>

                    <a href="/#contact" onClick={closeMenu}>
                        Контакты
                    </a>
                </nav>

                <a href="tel:+70000000000" className="header__phone">
                    +7 (000) 000-00-00
                </a>

                <button
                    type="button"
                    className={`header__menu-button ${
                        isMenuOpen ? 'header__menu-button--open' : ''
                    }`}
                    aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen((current) => !current)}
                >
                    <span />
                    <span />
                </button>
            </div>
        </header>
    );
}
