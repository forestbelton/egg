module Egg.Runtime.Operator.Bar where

import Data.BigInt (BigInt, fromInt)
import Prelude (($), (==), bind, mod)

import Egg.Runtime.Stmt
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Type (Ty(..))

bar :: Operator
bar =
    { name: "|"
    , clauses:
        [ { sig: [TBInt, TBInt]
          , description: "Integer divisibility test."
          , body: do
              denom :: BigInt <- pop
              num :: BigInt <- pop
              push $ num `mod` denom == fromInt 0
          }
        ]
    }