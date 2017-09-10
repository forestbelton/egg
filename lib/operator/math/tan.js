import Operator from '../Operator'

export default new Operator({
    name: 'mt',
    clauses: [
        {
            sig: ['float'],
            desc: 'Tangent function.',
            body: (context, left) => {
                context.push('float', Math.tan(left.value))
            }
        }
    ]
})
