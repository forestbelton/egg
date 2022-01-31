module Egg.Runtime.Operator.RParen where

import Data.BigInt (BigInt, fromInt)
import Prelude (($), bind, (+))

import Egg.Runtime.Stmt
import Egg.Runtime.Type (Ty(..))
import Egg.Runtime.Operator.Operator (Operator)

rparen :: Operator
rparen =
    { name: ")"
    , clauses:
        [ { sig: [TBInt]
          , description: "Increment integer."
          , body: do
              x :: BigInt <- pop
              push $ x + fromInt 1
          }
        , { sig: [TNum]
          , description: "Increment decimal."
          , body: do
              x :: Number <- pop
              push $ x + 1.0
          }
        ]
    }