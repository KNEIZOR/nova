import { ContactForm } from '../ContactForm/ContactForm';

import './ContactSection.scss';

export function ContactSection() {
    return (
        <section id="contact" className="contact">
            <div className="contact__container">
                <div className="contact__header">
                    <div>
                        <span className="contact__eyebrow">04 / КОНТАКТЫ</span>

                        <h2>
                            Давайте создадим
                            <br />
                            что-то особенное.
                        </h2>
                    </div>

                    <div className="contact__info">
                        <p>
                            Расскажите о вашем проекте — мы свяжемся с вами и
                            обсудим детали.
                        </p>

                        <a href="tel:+70000000000">+7 (000) 000-00-00</a>

                        <a href="mailto:hello@forma.ru">hello@forma.ru</a>
                    </div>
                </div>

                <ContactForm />
            </div>
        </section>
    );
}
