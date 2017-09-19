import React from 'react'
import ReactDOM from 'react-dom'

import { vars } from '../../runtime/Env.purs'

export default props => {
    const vs = vars.map((v, i) =>
        <tr key={i}>
            <td>{v.name}</td>
            <td>{v.description}</td>
        </tr>
    )

    return (
        <table className="doc-table doc-variables">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Initial value</th>
                </tr>
            </thead>
            <tbody>{vs}</tbody>
        </table>
    )
}
