import Operator from './Operator'

const alphabet = '0123456789abcdefghijklmn'
let orderings = {}

// highly lazy way of generating all permutations
for (let i = 1; i <= 4; ++i) {
    for (let j = 1; j <= 4; ++j) {
        for (let k = 1; k <= 4; ++k) {
            for (let l = 1; l <= 4; ++l) {
                var s = [i,j,k,l].sort()

                if (s[0] == 1 && s[1] == 2 && s[2] == 3 && s[3] == 4) {
                    orderings[i.toString() + j + k + l] = true;
                }
            }
        }
    }
}

// alphabetic is as good as anything
// thanks kyle
orderings = Object.keys(orderings).sort()

export default permutation => {
    const index = alphabet.indexOf(permutation)
    const ordering = orderings[index]

    return new Operator({
        name: '@' + permutation,
        clauses: [
            {
                sig: [],
                desc: `Stack permutation <pre>1234</pre> -> <pre>${ordering}</pre>.`,
                body: context => {
                    const indices = ordering.split('').map(index => parseInt(index, 10))
                    let nextIndex = 0

                    const stack = context.stack.splice(-4)
                    const out = []

                    for (let i = 0; i < stack.length; ++i) {
                        while (indices[nextIndex] > stack.length) {
                            ++nextIndex
                        }

                        out[i] = stack[indices[nextIndex] - 1]
                        nextIndex++
                    }

                    out.forEach(token => context.push(token))
                }
            }
        ]
    })
}