module Egg.Runtime.Operator.LAngle where

import Egg.Runtime.Stmt

import Data.Array (drop)
import Data.BigInt (BigInt, toNumber)
import Data.Int (floor)
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Token (Token)
import Egg.Runtime.Type (Ty(..))
import Prelude (($), (<), bind)

langle :: Operator
langle =
    { name: "<"
    , clauses:
        [ { sig: [TBInt, TBInt]
          , description: "Integer less than comparison."
          , body: do
              y :: BigInt <- pop
              x :: BigInt <- pop
              push $ x < y
          }
        , { sig: [TNum, TNum]
          , description: "Decimal less than comparison."
          , body: do
              y :: Number <- pop
              x :: Number <- pop
              push $ x < y
          }
        , { sig: [TStr, TStr]
          , description: "String less than comparison."
          , body: do
              y :: String <- pop
              x :: String <- pop
              push $ x < y
        }
        , { sig: [TArr, TBInt]
          , description: "Drop the first N elements from an array."
          , body: do
              n :: BigInt <- pop
              xs :: Array Token <- pop
              push $ drop (floor $ toNumber n) xs
        }
        , { sig: [TArr, TNum]
          , description: "Drop the first N elements from an array."
          , body: do
              n :: Number <- pop
              xs :: Array Token <- pop
              push $ drop (floor n) xs
        }
        ]
    }