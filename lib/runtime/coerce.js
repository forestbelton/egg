const coercions = {
    'char': {
        'string': value => value
    },
    'array': {
        'string': xs => {
            return xs
                .map(x => coerce(x, 'float').value)
                .map(x => String.fromCodePoint(x))
                .join('')
        }
    },
    'bigint': {
        'float': value => value.toJSNumber()
    }
}

export function canCoerce(term, desiredType) {
    if (desiredType === 'any' || term.type === desiredType) {
        return true
    }

    return coercions[term.type]
        && coercions[term.type][desiredType]
}

export function coerce(term, desiredType) {
    if (desiredType === 'any' || term.type === desiredType) {
        return term
    }

    if (typeof coercions[term.type] === 'undefined') {
        throw new Error(`no coercions exist for ${term.type}`)
    } else if (typeof coercions[term.type][desiredType] === 'undefined') {
        throw new Error(`no coercion ${term.type} -> ${desiredType} exists`)
    }

    return {
        type: desiredType,
        value: coercions[term.type][desiredType](term.value)
    }
}