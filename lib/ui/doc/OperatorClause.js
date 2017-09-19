import React from 'react'
import ReactDOM from 'react-dom'

import { typeName } from '../../runtime/Type.purs'

export default props => {
    const { name, clause } = props
    const desc = clause.description || 'No description available.'

    let args = clause.sig.map(ty => <pre>{typeName(ty)}</pre>)
    if (args.length == 0) {
        args = <pre>none</pre>
    }

    return (
        <tr className="doc-operator">
            <td>{name}</td>
            <td className="doc-operator-args">{args}</td>
            <td dangerouslySetInnerHTML={{__html: desc}} />
        </tr>
    )
}