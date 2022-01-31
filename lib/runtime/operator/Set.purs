module Egg.Runtime.Operator.Set where

import Prelude ((<>), bind)

import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Stmt
import Egg.Runtime.Token (Token)
import Egg.Runtime.Type (Ty(..))

set :: String -> Operator
set v =
    { name: ":" <> v
    , clauses:
        [ { sig: [TAny]
          , description: "Set the variable " <> v <> "."
          , body: do x :: Token <- pop
                     set' v x
          }
        ]
    }
