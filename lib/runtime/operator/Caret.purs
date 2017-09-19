module Egg.Runtime.Operator.Caret where

import Data.List (fromFoldable)
import Data.Number.Approximate (eqApproximate)
import Prelude (($), (<>))

import Egg.Runtime.Operator.Embed
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Type (Ty(..))

caret :: Operator
caret =
    { name: "^"
    , clauses:
        [ { sig: [TBlock, TBlock, TNum]
          , description: "Evaluates the first block if the number is nonzero, otherwise the second."
          , body: ternaryOp $ \(ABlock t) (ABlock f) (n :: Number) ctx -> let block = fromFoldable $ if eqApproximate n 0.0 then f else t
                in ctx { tokens = block <> ctx.tokens }
          }
        ]
    }
