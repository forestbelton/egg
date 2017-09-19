module Egg.Runtime.Operator.Equals where

import Egg.Runtime.Stmt
import Data.Number.Approximate (eqApproximate)
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Type (Ty(..))
import Prelude (($), (==), bind)

equals :: Operator
equals =
    { name: "="
    , clauses:
        [ { sig: [TBInt, TBInt]
          , description: "Integer equality."
          , body: do
              x <- popBInt
              y <- popBInt
              push $ x == y
          }
        , { sig: [TStr, TStr]
          , description: "String equality."
          , body: do
              x <- popStr
              y <- popStr
              push $ x == y
          }
        , { sig: [TNum, TNum]
          , description: "Decimal approximate equality."
          , body: do
              x <- popNum
              y <- popNum
              push $ eqApproximate x y
          }
        ]
    }
