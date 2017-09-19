import React from 'react'
import ReactDOM from 'react-dom'

import { types, typeName } from '../../runtime/Type.purs'

const TypeList = props => {
    const typeElems = types.map(ty => {
        const name = typeName(ty)
        return <li key={name}><pre>{name}</pre></li>
    })

    return (
        <ul className="doc-types-list">
            {typeElems}
        </ul>
    )
}

export default TypeList
