import parser from './grammar.pegjs'
import operators from './operators'
import variables from './variables'

class Context {

    constructor(code, input) {
        this.env = variables.reduce((acc, v) => {
            acc[v.name] = v.value
            return acc
        }, {})

        this.stack = []
        this.code = code || ''
        this.input = input || ''
        this.output = ''
    }

    execute() {
        const tokens = parser.parse(this.code)

        tokens.forEach(token => this.executeToken(token))
        this.stack.forEach(elem => this.displayToken(elem))

        return this.output
    }

    push(type, value) {
        if (typeof value === 'undefined') {
            this.stack.push(type)
        } else {
            this.stack.push({ type, value })
        }
    }

    executeBlock(block, args) {
        args = args || []
        args.forEach(arg => this.stack.push(arg))

        block.value.forEach(token => this.executeToken(token))
    }

    executeToken(token) {
        if (token.type === 'operator') {
            const op = operators[token.value]

            if (typeof op === 'undefined') {
                throw new Error('unsupported operator: ' + token.value)
            }

            op.execute(this)
        } else if (token.type === 'variable') {
            const value = typeof this.env[token.value] === 'undefined'
                ? { type: 'bigint', value: bigInt(0) }
                : this.env[token.value]

            this.stack.push(value)
        } else {
            this.stack.push(token)
        }
    }

    displayToken(token) {
        this.output += this.showToken(token)
    }

    showToken(token) {
        switch (token.type) {
            case 'string':
                return token.value

            case 'bigint':
                return token.value.toString()

            case 'float':
                return token.value.toString()

            case 'array':
                return token.value.map(child => this.showToken(child)).join('')

            case 'block':
                return '{ ' + token.value.map(child => this.showToken(child)).join(' ') + ' }'

            // needed only for printing block source code
            case 'operator':
                return token.value
                break

            case 'char':
                return token.value
        }
    }
}

export default Context