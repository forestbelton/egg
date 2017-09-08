export default class Operator {

    constructor(options) {
        this.name = options.name
        this.clauses = options.clauses
    }

    matchingClause(stack) {
        for (let clause of this.clauses) {
            const argCount = clause.sig.length
            if (stack.length < argCount) {
                continue
            }

            const args = stack.slice(-argCount)
            let match = true

            for (let i = 0; i < clause.sig.length; ++i) {
                if (args[i].type !== clause.sig[i] && clause.sig[i] !== 'any') {
                    match = false
                    break
                }
            }

            if (match) {
                return clause
            }
        }

        return undefined
    }
}