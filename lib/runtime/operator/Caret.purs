module Egg.Runtime.Operator.Caret where

import Data.BigInt (BigInt)
import Data.Number.Approximate (eqApproximate)
import Prelude (($), (==), bind, zero)

import Egg.Runtime.Embed (ABlock(..))
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Stmt
import Egg.Runtime.Token (Token)
import Egg.Runtime.Type (Ty(..))


caret :: Operator
caret =
    { name: "^"
    , clauses:
        [ { sig: [TBlock, TBlock, TBInt]
          , description: "Evaluate the first block if the integer is nonzero, otherwise the second."
          , body: do
              n :: BigInt <- pop
              ABlock f <- pop
              ABlock t <- pop

              execute $ if n == zero then t else f
          }
        , { sig: [TBlock, TBlock, TNum]
          , description: "Evaluate the first block if the number is nonzero, otherwise the second."
          , body: do
              n :: Number <- pop
              ABlock f <- pop
              ABlock t <- pop

              execute $ if eqApproximate n 0.0 then t else f
          }
        , { sig: [TAny, TAny, TBInt]
          , description: "Push the first value if the integer is nonzero, otherwise the second."
          , body: do
              n :: BigInt <- pop
              f :: Token <- pop
              t :: Token <- pop

              push $ if n == zero then t else f
          }
        , { sig: [TAny, TAny, TNum]
          , description: "Push the first value if the number is nonzero, otherwise the second."
          , body: do
              n :: Number <- pop
              f :: Token <- pop
              t :: Token <- pop

              push $ if eqApproximate n 0.0 then t else f
          }
        ]
    }
