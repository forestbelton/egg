import React from 'react'
import ReactDOM from 'react-dom'

import UI from './lib/ui/UI'

import './lib/runtime/Token.purs'
import './lib/runtime/Stack.purs'

ReactDOM.render(
    <UI />,
    document.getElementById('root')
)