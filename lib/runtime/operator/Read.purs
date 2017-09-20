module Egg.Runtime.Operator.Read where

import Prelude (bind)

import Egg.Runtime.Stmt
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Token (Token)

foreign import parse :: String -> Array Token

_read :: Operator
_read =
    { name: "r"
    , clauses:
        [ { sig: []
          , description: "Consume the entire input to parse a single token."
          , body: do
              input <- read
              case parse input of
                  [value] -> push value
                  _       -> error "failed to parse token"
          }
        ]
    }