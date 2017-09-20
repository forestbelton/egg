module Egg.Runtime.Operator.RBrace where

import Data.Array (reverse)
import Prelude (($), bind)

import Egg.Runtime.Stmt
import Egg.Runtime.Operator.Operator (Operator)

rbrace :: Operator
rbrace =
    { name: "]"
    , clauses:
        [ { sig: []
          , description: "Build array from current stack."
          , body: do
              xs <- clear
              push $ reverse xs
          }
        ]
    }