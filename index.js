import Context from './lib/Context'

import './lib/ui/docgen'
import './lib/ui/router'

const inputForm = document.getElementById('inputForm')
const codeField = document.getElementById('code')
const inputField = document.getElementById('input')
const outputField = document.getElementById('output')

inputForm.addEventListener('submit', ev => {
    ev.preventDefault()

    var code = codeField.value
    var input = inputField.value

    try {
		var context = new Context(code, input)
		var output = context.execute()

        outputField.style.color = '#000'
        outputField.value = output
    } catch(e) {
        outputField.style.color = '#c0392b'
        outputField.value = e.stack.toString()
    }
})
