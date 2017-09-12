import Operator from './Operator'

export default new Operator({
    name: ';',
    clauses: [
        {
            sig: ['any'],
            desc: 'Drop the top element of the stack.',
            body: context => {}
        }
    ]
})