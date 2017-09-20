module Egg.Runtime.Operator.Asterisk where

import Data.BigInt (BigInt, toNumber)
import Data.Enum (enumFromTo)
import Data.Foldable (sequence_)
import Data.Int (floor)
import Prelude (($), (-), (*), bind, discard, map, Unit)

import Egg.Runtime.Embed (ABlock(..))
import Egg.Runtime.Stmt
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Token (Token)
import Egg.Runtime.Type (Ty(..))

executeStep :: Array Token -> Int -> Stmt Unit
executeStep block n = do
    set' "I" n
    execute block

asterisk :: Operator
asterisk =
    { name: "*"
    , clauses:
        [ { sig: [TBInt, TBInt]
          , description: "Integer multiplication."
          , body: do
              y :: BigInt <- pop
              x :: BigInt <- pop
              push $ x * y
          }
        , { sig: [TNum, TNum]
          , description: "Decimal multiplication."
          , body: do
              y :: Number <- pop
              x :: Number <- pop
              push $ x * y
          }
        , { sig: [TBlock, TBInt]
          , description: "Execute block N times. I is set to the number of previously executed blocks."
          , body: do
              n :: BigInt <- pop
              ABlock block <- pop
              let n' = floor $ toNumber n
              let is = (enumFromTo 0 $ n' - 1) :: Array Int
              sequence_ $ map (executeStep block) is
          }
        ]
    }