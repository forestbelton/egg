import React from 'react'
import ReactDOM from 'react-dom'

import OperatorTable from './doc/OperatorTable'
import TypeList from './doc/TypeList'
import VariableTable from './doc/VariableTable'

const Documentation = props => (
    <div>
        <div className="doc-heading">Types</div>
        <hr />
        <p>
            The following types are available:
        </p>
        <TypeList />
        <div className="doc-heading">Variables</div>
        <hr />
        <p>
            Unless otherwise noted, every uppercase letter is a variable.
            At the beginning of execution, every variable is initialized
            to this table. If not included in the table, it is initialized
            to 0.
        </p>
        <VariableTable />
        <div className="doc-heading">Operators</div>
        <hr />
        <p>
            Operators pop operands off of the stack and perform a
            computation, leaving 0 or more output values on the stack. If
            the stack matches more than one possible clause for an
            operator, the first one in listed order is chosen.
        </p>
        <OperatorTable />
    </div>
)

export default Documentation