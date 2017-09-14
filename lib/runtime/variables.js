import bigInt from 'big-integer'

class Variable {

    constructor(options) {
        const { name, value, desc } = options

        this.name = name
        this.value = value
        this.desc = desc
    }
}

export default [
    new Variable({ name: 'N', desc: 'An empty array.', value: { type: 'array', value: [] } }),
    new Variable({ name: 'O', desc: 'One.', value: { type: 'bigint', value: bigInt(1) } }),
    new Variable({ name: 'S', desc: 'An empty string.', value: { type: 'string', value: '' }}),
    new Variable({ name: 'T', desc: 'Two.', value: { type: 'bigint', value: bigInt(2) } }),
]
