module Egg.Runtime.Operator.Minus where

import Egg.Runtime.Operator.Embed
import Egg.Runtime.Context (push)
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Type (Ty(..))
import Prelude (($), (-))

minus :: Operator
minus =
    { name: "-"
    , clauses:
        [ { sig: [TBInt, TBInt]
          , description: "Integer subtraction."
          , body: binaryOp $ \(x :: Int) (y :: Int) ctx -> push ctx $ lift (x - y)
          }
        , { sig: [TNum, TNum]
          , description: "Decimal subtraction."
          , body: binaryOp $ \(x :: Number) (y :: Number) ctx -> push ctx $ lift (x - y)
          }
        ]
    }
