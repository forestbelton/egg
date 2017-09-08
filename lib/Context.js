import parser from './grammar.pegjs'
import operators from './operators'

class Context {

    constructor(code, input) {
        this.stack = []
	    this.code = code
	    this.input = input
	    this.output = ''
    }

    execute() {
        const tokens = parser.parse(this.code)

        tokens.forEach(token => this.executeToken(token))
        this.stack.forEach(elem => this.displayToken(elem))

        return this.output
    }

    push(token) {
        this.stack.push(token)
    }

    executeToken(token) {
        if (token.type === 'operator') {
            const op = operators[token.value]

            if (typeof op === 'undefined') {
                throw new Error('unsupported operator: ' + token.value)
            }

            const clause = op.matchingClause(this.stack)

            if (typeof clause !== 'undefined') {
                const args = [this].concat(this.stack.splice(-clause.sig.length))
                clause.body.apply(null, args)
            } else {
                throw new Error(`could not find matching clause for ${op.name}`)
            }
        } else {
            this.stack.push(token)
        }
    }

    displayToken(token) {
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
}

export default Context