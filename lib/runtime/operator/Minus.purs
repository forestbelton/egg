module Egg.Runtime.Operator.Minus where

import Data.String (replaceAll, Pattern(..), Replacement(..))
import Prelude (($), (-))

import Egg.Runtime.Operator.Embed
import Egg.Runtime.Context (push)
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Type (Ty(..))


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
        , { sig: [TStr, TStr]
          , description: "Remove all occurrences of the second string from the first."
          , body: binaryOp $ \(haystack :: String) (needle :: String) ctx -> push ctx $ lift (replaceAll (Pattern needle) (Replacement "") haystack)
          }
        ]
    }
