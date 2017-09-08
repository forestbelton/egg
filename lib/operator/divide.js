import { term, op } from './_util'

export default op('/', [
    {
        sig: ['float', 'float'],
        body: (context, left, right) => {
            context.stack.push(
                term('float', left.value / right.value)
            )
        }
    }
])
