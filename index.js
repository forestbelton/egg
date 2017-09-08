import Context from './lib/Context'

var inputForm = document.getElementById('inputForm')
var codeField = document.getElementById('code')
var inputField = document.getElementById('input')
var outputField = document.getElementById('output')

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
