import { canCoerce, coerce } from '../coerce'

export default class Operator {

    constructor(options) {
        this.name = options.name
        this.clauses = options.clauses
    }

    execute(context) {
        const { stack } = context

        for (let clause of this.clauses) {
            const argCount = clause.sig.length
            if (stack.length < argCount) {
                continue
            }

            const args = stack.slice(-argCount)
            let match = true

            for (let i = 0; i < clause.sig.length; ++i) {
                if (!canCoerce(args[i], clause.sig[i])) {
                    match = false
                    break
                }

                args[i] = coerce(args[i], clause.sig[i])
            }

            if (match) {
                stack.splice(-argCount)
                clause.body.apply(null, [context].concat(args))
                return
            }
        }

        throw new Error(`could not find matching clause for ${this.name}`)
    }
}