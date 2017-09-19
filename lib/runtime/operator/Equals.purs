module Egg.Runtime.Operator.Equals where

import Prelude (($), (==))

import Egg.Runtime.Context (push)
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Operator.Embed
import Egg.Runtime.Type (Ty(..))

equals :: Operator
equals =
    { name: "="
    , clauses:
        [ { sig: [TBInt, TBInt]
          , description: "Integer equality."
          , body: binaryOp $ \(x :: Int) (y :: Int) ctx -> push ctx $ lift (x == y)
          }
        ]
    }
