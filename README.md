🥚 egg [![Build Status](https://travis-ci.org/forestbelton/egg.svg?branch=master)](https://travis-ci.org/forestbelton/egg)
===

egg is a stack-based programming language for code golf, not unlike cjam and pyth.

Properties
----------

* Programs are represented as a sequence of tokens and are evaluated left-to-right.
* Literals are pushed directly to the stack.
* Primitive types include integers (bigints) `-123`, floating-point values `3.141`, strings `"hello"`, and character literals `'a`.
* Operators pop the number of arguments they need from the top of the stack and can push output values.
* Whitespace is optional except to disambiguate token delineation.
* Implicit coercion between compatible types.

Check it out [here](https://forestbelton.github.io/egg/).

Examples
========

Fibonacci (11 bytes)
---------

Try it [here](https://forestbelton.github.io/egg/?try=0O%7B%2C@c%2B%7Dr*%3B#interpreter)!

This reads N from the input and computes fib(N).

Compact: `0O{,@c+}r*;`

Annotated:
```
# Push A = 0 and B = 1.
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
;
```

FizzBuzz (51 bytes)
--------

Try it [here](https://forestbelton.github.io/egg/?try=%22Fizz%22%3AC%7B%7BCSB%5E%22Buzz%22%2B%7D%7BCI1+B%5E%7DI1+%2C3%250%3D%3AB5%250%3D%5Ed%7D100*#interpreter)!

Compact: `Fizz":C{{CSB^"Buzz"+}{CI1+B^}I1+,3%0=:B5%0=^d}100*`

Annotated:
```
# Set C to the string "Fizz"
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
        C I 1+ B ^
    }

    # Compute (I + 1) % 3 == 0 and store in B. I + 1 is duplicated
    # with , to be used in the following computation.
    I 1+ , 3% 0= :B

    # Compute (I + 1) % 5 == 0 and branch off of it.
    5% 0=

    ^

    # Print.
    d
} 100 *
```
