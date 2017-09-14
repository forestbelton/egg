import Operator from './Operator'

export default v => new Operator({
    name: ':' + v,
    clauses: [
        {
            sig: ['any'],
            desc: `Sets the variable ${v}.`,
            body: (context, value) => {
                context.env[v] = value
            }
        }
    ]
})