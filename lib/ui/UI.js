import React from 'react'
import ReactDOM from 'react-dom'

import { changePage } from './router'
import Documentation from './Documentation'
import Examples from './Examples'
import Interpreter from './Interpreter'
import Header from './Header'

export default class UI extends React.Component {

    componentDidMount() {
        document.querySelectorAll('.nav a').forEach(navLink =>
            navLink.addEventListener('click', changePage)
        )

        changePage()
    }

    render() {
        return (
            <div>
                <Header />
                <div className="page" id="interpreter"><Interpreter /></div>
                <div className="page"id="docs"><Documentation /></div>
                <div className="page" id="examples"><Examples /></div>
            </div>
        )
    }
}
