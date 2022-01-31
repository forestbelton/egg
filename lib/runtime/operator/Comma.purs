module Egg.Runtime.Operator.Comma where

import Prelude (bind, discard)

import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Stmt
import Egg.Runtime.Token (Token)
import Egg.Runtime.Type (Ty(..))

comma :: Operator
comma =
    { name: ","
    , clauses:
        [ { sig: [TAny]
          , description: "Duplicate the top value of the stack."
          , body: do
              x :: Token <- pop
              push x
              push x
          }
        ]
    }