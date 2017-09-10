import Operator from './Operator'

export default new Operator({
    name: ']',
    clauses: [
        {
            sig: [],
            desc: 'Builds array from current stack.',
            body: (context) => {
                const value = context.stack
                context.stack = [{ type: 'array', value }]
            }
        }
    ]
})