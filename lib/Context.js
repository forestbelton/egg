import parser from './grammar.pegjs'
import operators from './operators'

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

export default Context