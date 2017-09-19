module Egg.Runtime.Operator.Equals where

import Egg.Runtime.Stmt
import Data.BigInt (BigInt)
import Data.Number.Approximate (eqApproximate)
import Data.Unit (Unit)
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

          {- { sig: [TBInt, TBInt]
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
        -}]
    }
