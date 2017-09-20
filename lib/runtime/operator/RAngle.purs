module Egg.Runtime.Operator.RAngle where

import Egg.Runtime.Stmt

import Data.Array (take)
import Data.BigInt (BigInt, toNumber)
import Data.Int (floor)
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Token (Token)
import Egg.Runtime.Type (Ty(..))
import Prelude (($), (>), bind)

rangle :: Operator
rangle =
    { name: ">"
    , clauses:
        [ { sig: [TBInt, TBInt]
          , description: "Integer greater than comparison."
          , body: do
              y :: BigInt <- pop
              x :: BigInt <- pop
              push $ x > y
          }
        , { sig: [TNum, TNum]
          , description: "Decimal greater than comparison."
          , body: do
              y :: Number <- pop
              x :: Number <- pop
              push $ x > y
          }
        , { sig: [TStr, TStr]
          , description: "String greater than comparison."
          , body: do
              y :: String <- pop
              x :: String <- pop
              push $ x > y
        }
        , { sig: [TArr, TBInt]
          , description: "Take the first N elements from an array."
          , body: do
              n :: BigInt <- pop
              xs :: Array Token <- pop
              push $ take (floor $ toNumber n) xs
        }
        , { sig: [TArr, TNum]
          , description: "Take the first N elements from an array."
          , body: do
              n :: Number <- pop
              xs :: Array Token <- pop
              push $ take (floor n) xs
        }
        ]
    }