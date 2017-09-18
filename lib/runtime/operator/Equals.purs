module Egg.Runtime.Operator.Equals where

import Data.Tuple (Tuple(..))
import Partial.Unsafe (unsafeCrashWith)
import Prelude (($), (==))

import Egg.Runtime.Context (pop, push)
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Operator.Lift
import Egg.Runtime.Token (Token(..))
import Egg.Runtime.Type (Ty(..))

equals :: Operator
equals =
    { name: "="
    , clauses:
        [ { sig: [TBInt, TBInt]
          , description: "Integer equality."
          , body: \ctx -> case pop ctx 2 of
              Tuple [BInt a, BInt b] ctx' -> push ctx' $ lift (a == b)
              Tuple _ _ -> unsafeCrashWith "bad match"
          }
        ]
    }
