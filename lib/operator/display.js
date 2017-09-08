import Operator from './Operator'

export default new Operator({
    name: 'd',
    clauses: [
        {
            sig: ['any'],
            desc: 'Prints a token to the output.',
            body: (context, token) => {
                context.displayToken(token)
            }
        }
    ]
})