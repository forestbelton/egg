module Egg.Runtime.Operator.Slash where

import Data.Traversable (sequence)
import Prelude (($), bind, discard, map)

import Egg.Runtime.Embed (ABlock(..))
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Stmt
import Egg.Runtime.Token (Token)
import Egg.Runtime.Type (Ty(..))

mapStep :: Array Token -> Token -> Stmt Token
mapStep block tok = do
    push tok
    execute block
    pop

slash :: Operator
slash =
    { name: "/"
    , clauses:
        [ { sig: [TArr, TBlock]
          , description: "Map over array with block."
          , body: do
              ABlock block <- pop
              xs :: Array Token <- pop
              ys <- sequence $ map (mapStep block) xs
              push ys
          }
        ]
    }