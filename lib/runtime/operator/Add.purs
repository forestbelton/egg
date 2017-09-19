module Egg.Runtime.Operator.Add where

import Egg.Runtime.Operator.Embed
import Egg.Runtime.Context (push)
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Type (Ty(..))
import Prelude (($), (+), (<>))

add :: Operator
add =
    { name: "+"
    , clauses:
        [ { sig: [TBInt, TBInt]
          , description: "Integer addition."
          , body: binaryOp $ \(x :: Int) (y :: Int) ctx -> push ctx $ lift (x + y)
          }
        , { sig: [TNum, TNum]
          , description: "Decimal addition."
          , body: binaryOp $ \(x :: Number) (y :: Number) ctx -> push ctx $ lift (x + y)
          }
        ,
          { sig: [TStr, TStr]
          , description: "String concatenation."
          , body: binaryOp $ \(x :: String) (y :: String) ctx -> push ctx $ lift (x <> y)
          }
        ]
    }
