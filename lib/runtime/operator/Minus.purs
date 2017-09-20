module Egg.Runtime.Operator.Minus where

import Data.BigInt (BigInt)
import Data.String (replaceAll, Pattern(..), Replacement(..))
import Prelude (($), (-), bind)

import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Stmt
import Egg.Runtime.Type (Ty(..))


minus :: Operator
minus =
    { name: "-"
    , clauses:
        [ { sig: [TBInt, TBInt]
          , description: "Integer subtraction."
          , body: do
              y :: BigInt <- pop
              x :: BigInt <- pop

              push $ x - y
          }
        , { sig: [TNum, TNum]
          , description: "Decimal subtraction."
          , body: do
              y :: Number <- pop
              x :: Number <- pop

              push $ x - y
          }
        , { sig: [TStr, TStr]
          , description: "Remove all occurrences of the second string from the first."
          , body: do
              needle :: String <- pop
              haystack :: String <- pop

              push $ replaceAll (Pattern needle) (Replacement "") haystack
          }
        ]
    }
