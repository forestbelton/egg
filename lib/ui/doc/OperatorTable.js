import React from 'react'
import ReactDOM from 'react-dom'

import OperatorClause from './OperatorClause'
import operators from '../../runtime/operators'

const OperatorTable = props => {
    const clauses = Array.prototype.concat.apply(
        [],
        Object.values(operators).map(op =>
            op.clauses.map((clause, i) =>
                <OperatorClause key={op.name + i} clause={clause}
                                name={op.name} />
            )
        )
    )

    return (
        <table className="doc-table doc-operators">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Arguments</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>{clauses}</tbody>
        </table>
    )
}

export default OperatorTable
