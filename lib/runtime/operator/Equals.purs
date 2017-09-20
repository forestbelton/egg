module Egg.Runtime.Operator.Equals where

import Egg.Runtime.Stmt
import Data.BigInt (BigInt)
import Data.Number.Approximate (eqApproximate)
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Token (Token)
import Egg.Runtime.Type (Ty(..))
import Prelude (($), (==), bind)

equals :: Operator
equals =
    { name: "="
    , clauses:
        [ { sig: [TBInt, TBInt]
          , description: "Integer equality."
          , body: do
              x :: BigInt <- pop
              y :: BigInt <- pop
              push $ x == y
          }
        , { sig: [TStr, TStr]
          , description: "String equality."
          , body: do
              x :: String <- pop
              y :: String <- pop
              push $ x == y
          }
        , { sig: [TNum, TNum]
          , description: "Decimal approximate equality."
          , body: do
              x :: Number <- pop
              y :: Number <- pop
              push $ eqApproximate x y
          }
        , { sig: [TArr, TArr]
          , description: "Array deep equality."
          , body: do
              xs :: Array Token <- pop
              ys :: Array Token <- pop
              push $ xs == ys
        }
        ]
    }
