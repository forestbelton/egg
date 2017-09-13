import Operator from '../Operator'

export default new Operator({
    name: 'mR',
    clauses: [
        {
            sig: [],
            desc: 'Generate a random floating-point value between 0 and 1.',
            body: context => {
                context.push('float', Math.random())
            }
        }
    ]
})
