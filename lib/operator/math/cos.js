import Operator from '../Operator'

export default new Operator({
    name: 'mc',
    clauses: [
        {
            sig: ['float'],
            desc: 'Cosine function.',
            body: (context, left) => {
                context.push('float', Math.cos(left.value))
            }
        }
    ]
})
