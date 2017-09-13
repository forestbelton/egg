export function commutative(sig, desc, body) {
    const reversedSig = []
    for (let i = sig.length - 1; i >= 0; --i) {
        reversedSig.push(sig[i])
    }

    return [
        {
            sig: sig,
            desc: desc,
            body: body
        },
        {
            sig: reversedSig,
            desc: desc,
            body: (context, a, b) => body(context, b, a)
        }
    ]
}