import parser from './lib/grammar.pegjs'
import operators from './lib/operators'

var inputForm = document.getElementById('inputForm')
var codeField = document.getElementById('code')
var inputField = document.getElementById('input')
var outputField = document.getElementById('output')

function Context(code, input) {
	this.stack = []
	this.code = code
	this.input = input
	this.output = ''
}

Context.prototype.execute = function() {
	const tokens = parser.parse(this.code)

	tokens.forEach(token => this.executeToken(token))
	this.stack.forEach(elem => this.displayToken(elem))

	return this.output
}

Context.prototype.executeToken = function(token) {
    if (token.type === 'operator') {
        var op = operators[token.value]

        if (typeof op === 'undefined') {
            throw new Error('unsupported operator: ' + token.value)
        }

        op(this)
    } else {
        this.stack.push(token)
    }
}

Context.prototype.displayToken = function(token) {
	switch (token.type) {
		case 'string':
			this.output += token.value
			break

		case 'bigint':
			this.output += token.value
			break

		case 'float':
			this.output += token.value.toString()
			break
	}
}

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
