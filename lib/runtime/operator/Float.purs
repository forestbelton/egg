module Egg.Runtime.Operator.Float where

import Egg.Runtime.Operator.Embed
import Data.BigInt (BigInt, toNumber)
import Egg.Runtime.Context (push)
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Type (Ty(..))
import Global (readFloat)
import Prelude (($))

float :: Operator
float =
    { name: "f"
    , clauses:
        [ { sig: [TStr]
          , description: "Parses a floating-point value from a string."
          , body: unaryOp $ \(x :: String) ctx -> push ctx $ lift (readFloat x)
          }
        , { sig: [TBInt]
          , description: "Converts a bigint to its floating-point representation (lossy)."
          , body: unaryOp $ \(x :: BigInt) ctx -> push ctx $ lift (toNumber x)
          }
        ]
    }