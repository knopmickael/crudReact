import './Header.css'
import React from 'react'

/*
sobre o header abaixo:
    d-none == desaparece em dispositivos móveis
    d-sm-flex == todos dispositivos acima de md (médios) recebem display: flex
    flex-column == por padrão, a orientação do display flex é Row, neste caso, seta a orientação para Col
*/

export default props =>
    <header className="header d-none d-sm-flex flex-column">                               
        <h1 className="mt-3">
            {props.title}
        </h1>
        <p className="lead text-muted">
            {props.subtitle}
        </p>
    </header>