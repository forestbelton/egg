module Egg.Runtime.Operator.LParen where

import Data.BigInt (BigInt, fromInt)
import Prelude (($), bind, (-))

import Egg.Runtime.Stmt
import Egg.Runtime.Type (Ty(..))
import Egg.Runtime.Operator.Operator (Operator)

lparen :: Operator
lparen =
    { name: "("
    , clauses:
        [ { sig: [TBInt]
          , description: "Decrement integer."
          , body: do
              x :: BigInt <- pop
              push $ x - fromInt 1
          }
        , { sig: [TNum]
          , description: "Decrement decimal."
          , body: do
              x :: Number <- pop
              push $ x - 1.0
          }
        ]
    }