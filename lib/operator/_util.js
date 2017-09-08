export function term(type, value) {
    return { type, value }
}

export function op(name, clauses) {
    return (context) => {
        for (let clause of clauses) {
            const argCount = clause.sig.length
            if (context.stack.length < argCount) {
                continue
            }

            const args = context.stack.slice(-argCount)
            let match = true

            for (let i = 0; i < clause.sig.length; ++i) {
                if (args[i].type !== clause.sig[i] && clause.sig[i] !== 'any') {
                    match = false
                    break
                }
            }

            if (match) {
                context.stack.splice(-argCount)
                args.unshift(context)

                clause.body.apply(null, args)
                return
            }
        }

        throw new Error(`could not find matching clause for ${name}`)
    }
}
