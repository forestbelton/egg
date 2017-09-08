import { term, op } from '../_util'

export default op('ma', [
    {
        sig: ['float'],
        body: (context, left) => {
            context.stack.push(
                term('float', Math.abs(left.value))
            )
        }
    }
])
