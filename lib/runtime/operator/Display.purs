module Egg.Runtime.Operator.Display where

import Prelude (($), (<>), bind)

import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Stmt (pop, display) as S
import Egg.Runtime.Token (Token, displayToken)
import Egg.Runtime.Type (Ty(..))

display :: Operator
display =
    { name: "d"
    , clauses:
        [ { sig: [TAny]
          , description: "Display element on top of stack and print newline."
          , body: do
              x :: Token <- S.pop
              S.display $ displayToken x <> "\n"
          }
        ]
    }