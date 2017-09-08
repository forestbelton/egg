import Operator from './Operator'

export default new Operator({
    name: 'd',
    clauses: [
        {
            sig: ['any'],
            body: (context, token) => {
                context.displayToken(token)
            }
        }
    ]
})