import Context from './lib/Context'

import './lib/ui/Documentation'
import './lib/ui/Examples'
import './lib/ui/router'

const inputForm = document.getElementById('inputForm')
const codeField = document.getElementById('code')
const inputField = document.getElementById('input')
const outputField = document.getElementById('output')
const byteCount = document.getElementById('byteCount')
const permalink = document.querySelector('.permalink')

const searchParams = new URLSearchParams(window.location.search)
const code = searchParams.get('try')
const input = searchParams.get('input')

if (code !== null) {
    codeField.value = unescape(code)
    byteCount.innerHTML = `${codeField.value.length} bytes`
}

if (input !== null) {
    inputField.value = unescape(input)
}

codeField.addEventListener('keyup', ev => {
    byteCount.innerHTML = `${ev.target.value.length} bytes`
})

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

permalink.addEventListener('click', ev => {
    ev.preventDefault()

    const escapedCode = escape(codeField.value).replace(/\+/g, '%2B')
    const escapedInput = escape(inputField.value).replace(/\+/g, '%2B')

    const params = `?try=${escapedCode}&input=${escapedInput}#interpreter`
    window.location.href = window.location.href.replace(/(\?.*)?$/, params)
})