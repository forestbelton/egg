module Egg.Runtime.Operator.Slash where

import Data.BigInt (BigInt)
import Data.String (split, Pattern(..))
import Data.Traversable (sequence)
import Prelude (($), bind, discard, map, (/))

import Egg.Runtime.Embed (ABlock(..), lift)
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Stmt
import Egg.Runtime.Token (Token)
import Egg.Runtime.Type (Ty(..))

mapDesc :: String
mapDesc = "Map over array with block."

mapStep :: Array Token -> Token -> Stmt Token
mapStep block tok = do
    push tok
    execute block
    pop

slash :: Operator
slash =
    { name: "/"
    , clauses:
        [ { sig: [TBInt, TBInt]
          , description: "Integer division."
          , body: do
              y :: BigInt <- pop
              x :: BigInt <- pop
              push $ x / y
          }
        , { sig: [TNum, TNum]
          , description: "Decimal division."
          , body: do
              y :: Number <- pop
              x :: Number <- pop
              push $ x / y
          }
        , { sig: [TStr, TStr]
          , description: "Split a string by a separator."
          , body: do
              sep :: String <- pop
              str :: String <- pop
              push $ map lift $ split (Pattern sep) str
          }
        , { sig: [TArr, TBlock]
          , description: mapDesc
          , body: do
              ABlock block <- pop
              xs :: Array Token <- pop
              ys <- sequence $ map (mapStep block) xs
              push ys
          }
        , { sig: [TBlock, TArr]
          , description: mapDesc
          , body: do
              xs :: Array Token <- pop
              ABlock block <- pop
              ys <- sequence $ map (mapStep block) xs
              push ys
          }
        ]
    }