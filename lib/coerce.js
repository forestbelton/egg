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
    'string': {
        'array': value => value
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
    const value = desiredType === 'any' || term.type === desiredType
        ? term.value
        : coercions[term.type][desiredType](term.value)

    return {
        type: desiredType,
        value
    }
}