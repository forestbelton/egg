import React from 'react'
import ReactDOM from 'react-dom'

export default props => {
    const { name, clause } = props
    const desc = clause.desc || 'No description available.'

    let args = clause.sig.map(ty => <pre>{ty}</pre>)
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