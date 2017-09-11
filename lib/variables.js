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
    new Variable('N', 'An empty array.', { type: 'array', value: [] }),
    new Variable('O', 'One.', { type: 'bigint', value: bigInt(1) }),
    new Variable('T', 'Two.', { type: 'bigint', value: bigInt(2) }),
]
