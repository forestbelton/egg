import bigInt from 'big-integer'

export function term(type, value) {
    if (type === 'bigint') {
        value = bigInt(value)
    }

    return { type, value }
}