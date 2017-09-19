module Egg.Runtime.Operator.Equals where

import Data.Number.Approximate (eqApproximate)
import Prelude (($), (==))

import Egg.Runtime.Context (push)
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Operator.Embed
import Egg.Runtime.Type (Ty(..))

equals :: Operator
equals =
    { name: "="
    , clauses:
        [ { sig: [TBInt, TBInt]
          , description: "Integer equality."
          , body: binaryOp $ \(x :: Int) (y :: Int) ctx -> push ctx $ lift (x == y)
          }
        , { sig: [TStr, TStr]
          , description: "String equality."
          , body: binaryOp $ \(x :: String) (y :: String) ctx -> push ctx $ lift (x == y)
          }
        , { sig: [TNum, TNum]
          , description: "Decimal approximate equality."
          , body: binaryOp $ \(x :: Number) (y :: Number) ctx -> push ctx $ lift $ eqApproximate x y
          }
        ]
    }
