import React from 'react'
import ReactDOM from 'react-dom'

import Example from './example/Example'

const examples = [
    {
        title: 'Fibonacci',
        description: 'This reads N from the input and computes fib(N).',
        compact: '0O{,@c+}r*;',
        annotated: `# Push A = 0 and B = 1.
0 O

# Read in N and execute N times.
{
    # Duplicate B.
    ,

    # Rotate stack 123 -> 312.
    @c

    # Compute A + B.
    +
} r *

# Drop B, leaving A.
;`
    },
    {
        title: 'FizzBuzz',
        description: 'Solution to the classic "interview question."',
        compact: '"Fizz":C{{CSB^"Buzz"+}{CI)B^}I),3|:B5|^d}100*',
        annotated: `# Set C to the string "Fizz"
"Fizz" :C

# Execute the following block 100 times
{
    {
        # If both A and B are true, add "Fizz" to the front.
        # Otherwise (just A is true), add the empty string.
        C S B ^
        "Buzz" +
    }
    {
        # If B is true, display "Fizz".
        # Otherwise, display I + 1.
        C I ) B ^
    }

    # Compute if (I + 1) is divisible by 3 and store in B. I + 1 is duplicated
    # with , to be used in the following computation.
    I ) , 3| :B

    # Compute if (I + 1) is divisible by 5 and branch off of it.
    5|

    ^

    # Print.
    d
} 100 *`
    }
]

const Examples = props => {
    const exs = examples.map(e =>
        <Example key={e.title} title={e.title} description={e.description}
                 compact={e.compact} annotated={e.annotated} />
    )

    return <div>{exs}</div>
}

export default Examples