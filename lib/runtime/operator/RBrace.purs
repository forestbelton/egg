module Egg.Runtime.Operator.RBrace where

import Data.Array (reverse)
import Prelude (($))

import Egg.Runtime.Context (push)
import Egg.Runtime.Token (Token(..))
import Egg.Runtime.Operator.Operator (Operator)

rbrace :: Operator
rbrace =
    { name: "]"
    , clauses:
        [{- { sig: []
          , description: "Build array from current stack."
          , body: \ctx -> push (ctx { stack = [] }) $ Arr (reverse ctx.stack)
          }
        -}]
    }