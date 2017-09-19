module Egg.Runtime.Operator.Comma where

import Egg.Runtime.Context (push)
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Type (Ty(..))
import Prelude (($))

comma :: Operator
comma =
    { name: ","
    , clauses:
        [{- { sig: [TAny]
          , description: "Duplicate the top value of the stack."
          , body: unaryOp $ \(Any x) ctx -> push (push ctx x) x
          }
        -}]
    }