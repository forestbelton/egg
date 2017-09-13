import React from 'react'
import ReactDOM from 'react-dom'

import variables from '../../variables'

export default props => {
    const vars = variables.map((v, i) =>
        <tr key={i}>
            <td>{v.name}</td>
            <td>{v.desc}</td>
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
            <tbody>{vars}</tbody>
        </table>
    )
}