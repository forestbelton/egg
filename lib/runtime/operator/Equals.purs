module Egg.Runtime.Operator.Equals where

import Prelude

import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Type (Ty(..))

equals :: Operator
equals =
    { name: "="
    , clauses: [
        { sig: [TBInt, TBInt]
        , description: "Integer equality."
        , body: \ref -> pure unit
        }
    ]
    }
