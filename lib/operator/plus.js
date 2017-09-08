import { term, op } from './_util'

export default op('+', [
    {
        sig: ['float', 'float'],
        body: (context, left, right) => {
            context.push(
                term('float', left.value + right.value)
            )
        }
    },
    {
        sig: ['bigint', 'bigint'],
        body: (context, left, right) => {
            context.push(
                term('bigint', left.value.add(right.value))
            )
        }
    }
])
