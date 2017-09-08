export function term(type, value) {
    return { type, value }
}

export function op(name, clauses) {
    return (context) => {
        for (const clause of clauses) {
            const argCount = clause.sig.length
            if (context.stack.length < argCount) {
                continue
            }

            const args = context.stack.splice(-argCount)
            let match = true

            for (let i = 0; i < clause.sig.length; ++i) {
                if (args[i].type !== clause.sig[i] && clause.sig[i] !== 'any') {
                    match = false
                    break
                }
            }

            if (match) {
                args.unshift(context)
                clause.body.apply(null, args)
                return
            }
        }

        throw new Error(`could not find matching clause for ${name}`)
    }
}
