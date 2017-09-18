module Egg.Runtime.Operator.Equals where

import Data.BigInt (fromInt)
import Data.Tuple (Tuple(..))
import Partial (crashWith)
import Prelude (($), (==))

import Egg.Runtime.Context (pop, push)
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Token (Token(..))
import Egg.Runtime.Type (Ty(..))

equals :: Operator
equals =
    { name: "="
    , clauses:
        [ { sig: [TBInt, TBInt]
          , description: "Integer equality."
          , body: \ctx -> case pop ctx 2 of
              Tuple [BInt a, BInt b] ctx' -> let result = fromInt $ if a == b then 1 else 0
                  in push ctx' $ BInt result
              Tuple _ _ -> crashWith "bad match"
          }
        ]
    }
