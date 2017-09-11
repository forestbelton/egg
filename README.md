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

**NOTE**: The language itself does not yet support comments, so every line starting with a # in the following examples represents a comment and should be removed before executing.

FizzBuzz (54 bytes)
--------

Try it [here](https://forestbelton.github.io/egg/?try="Fizz"%3AC%7BI1%2B%2C5%250%3D%3AA3%250%3D%3AB%7BCSB%5E"Buzz"C%7D%7BCI1%2BB%5E%7DA%5Ed%7D100*#interpreter)!

Shortened: `"Fizz":C{I1+,5%0=:A3%0=:B{CSB^"Buzz"+}{CI1+B^}A^d}100*`

Annotated:
```
# Set C to the string "Fizz"
"Fizz" :C

# Execute the following block 100 times
{
    # Compute (I + 1) % 5 == 0 and store in A
    I 1+ , 5% 0= :A

    # Compute (I + 1) % 3 == 0 and store in B
    3% 0= :B

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
    A
    ^

    # Print
    d
} 100 *

```
