module Egg.Runtime.Operator.Semicolon where

import Prelude (bind, pure, unit)

import Egg.Runtime.Stmt
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Token (Token)
import Egg.Runtime.Type (Ty(..))

semi :: Operator
semi =
    { name: ";"
    , clauses:
        [ { sig: [TAny]
          , description: "Drop the top element of current stack."
          , body: do
              _ :: Token <- pop
              pure unit
          }
        ]
    }