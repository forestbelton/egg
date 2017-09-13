import Operator from '../Operator'

export default new Operator({
    name: 'ms',
    clauses: [
        {
            sig: ['float'],
            desc: 'Sine function.',
            body: (context, left) => {
                context.push('float', Math.sin(left.value))
            }
        }
    ]
})
