module Egg.Runtime.Operator.Float where

import Global (readFloat)
import Prelude (($), bind)

import Data.BigInt (BigInt, toNumber)
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Stmt
import Egg.Runtime.Type (Ty(..))

float :: Operator
float =
    { name: "f"
    , clauses:
        [ { sig: [TStr]
          , description: "Parse a decimal value from a string."
          , body: do
              x :: String <- pop
              push $ readFloat x
          }
        , { sig: [TBInt]
          , description: "Convert a bigint to its decimal representation (lossy)."
          , body: do
              x :: BigInt <- pop
              push $ toNumber x
          }
        ]
    }