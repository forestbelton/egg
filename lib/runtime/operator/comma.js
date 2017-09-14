import Operator from './Operator'

export default new Operator({
    name: ',',
    clauses: [
        {
            sig: ['any'],
            desc: 'Duplicate the top value of the stack.',
            body: (context, token) => {
                context.push(token)
                context.push(token)
            }
        }
    ]
})