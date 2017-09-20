module Egg.Runtime.Operator.Plus where

import Data.BigInt (BigInt)
import Data.String (joinWith)
import Prelude (($), (+), (<>), map, bind)

import Egg.Runtime.Stmt
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Token (Token, displayToken)
import Egg.Runtime.Type (Ty(..))

plus :: Operator
plus =
    { name: "+"
    , clauses:
        [ { sig: [TBInt, TBInt]
          , description: "Integer addition."
          , body: do
              x :: BigInt <- pop
              y :: BigInt <- pop
              push $ x + y
          }
        , { sig: [TNum, TNum]
          , description: "Decimal addition."
          , body: do
              x :: Number <- pop
              y :: Number <- pop
              push $ x + y
          }
        , { sig: [TStr, TStr]
          , description: "String concatenation."
          , body: do
              x :: String <- pop
              y :: String <- pop
              push $ y <> x
          }
        , { sig: [TArr, TArr]
          , description: "Array concatenation."
          , body: do
              xs :: Array Token <- pop
              ys :: Array Token <- pop
              push $ xs <> ys
          }
        , { sig: [TArr, TStr]
          , description: "Join an array by a string separator."
          , body: do
              sep :: String <- pop
              xs :: Array Token <- pop
              push $ joinWith sep (map displayToken xs)
        }
        , { sig: [TStr, TArr]
          , description: "Join an array by a string separator."
          , body: do
              xs :: Array Token <- pop
              sep :: String <- pop
              push $ joinWith sep (map displayToken xs)
        }
        ]
    }
