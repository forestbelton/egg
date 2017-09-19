module Egg.Runtime.Operator.Add where

import Data.String (joinWith)
import Prelude (($), (+), (<>), map)

import Egg.Runtime.Context (push)
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Token (Token, displayToken)
import Egg.Runtime.Type (Ty(..))

add :: Operator
add =
    { name: "+"
    , clauses:
        [{- { sig: [TBInt, TBInt]
          , description: "Integer addition."
          , body: binaryOp $ \(x :: Int) (y :: Int) ctx -> push ctx $ lift (x + y)
          }
        , { sig: [TNum, TNum]
          , description: "Decimal addition."
          , body: binaryOp $ \(x :: Number) (y :: Number) ctx -> push ctx $ lift (x + y)
          }
        , { sig: [TStr, TStr]
          , description: "String concatenation."
          , body: binaryOp $ \(x :: String) (y :: String) ctx -> push ctx $ lift (x <> y)
          }
        , { sig: [TArr, TArr]
          , description: "Array concatenation."
          , body: binaryOp $ \(xs :: Array Token) (ys :: Array Token) ctx -> push ctx $ lift (xs <> ys)
          }
        , { sig: [TArr, TStr]
          , description: "Join an array by a string separator."
          , body: binaryOp $ \(xs :: Array Token) (sep :: String) ctx -> push ctx $ lift (joinWith sep $ map displayToken xs)
        }
        , { sig: [TStr, TArr]
          , description: "Join an array by a string separator."
          , body: binaryOp $ \(sep :: String) (xs :: Array Token) ctx -> push ctx $ lift (joinWith sep $ map displayToken xs)
        }
        -}]
    }
