module Egg.Runtime.Operator.Set where

import Data.Map (insert)
import Prelude (($), (<>))

import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Type (Ty(..))

set :: String -> Operator
set v =
    { name: ":" <> v
    , clauses:
        [{- { sig: [TAny]
          , description: "Set the variable " <> v <> "."
          , body: unaryOp $ \(Any x) ctx -> ctx { env = insert v x ctx.env }
          }
        -}]
    }
