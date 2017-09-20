module Egg.Runtime.Operator.Rotate where

import Data.Array ((!!), reverse, take, drop, catMaybes)
import Data.Foldable (foldMap)
import Data.Maybe (fromJust)
import Data.String (indexOf, Pattern(..))
import Partial.Unsafe (unsafePartial)
import Prelude ((<>), (-), ($), show, map)

import Egg.Runtime.Stmt
import Egg.Runtime.Operator.Operator (Operator)

permIndex :: String -> Int
permIndex digit = unsafePartial $ fromJust $ indexOf (Pattern digit) "0123456789abcdefghijklmn"

perms :: Array (Array Int)
perms =
    [ [1, 2, 3, 4], [1, 2, 4, 3], [1, 3, 2, 4], [1, 3, 4, 2]
    , [1, 4, 2, 3], [1, 4, 3, 2], [2, 1, 3, 4], [2, 1, 4, 3]
    , [2, 3, 1, 4], [2, 3, 4, 1], [2, 4, 1, 3], [2, 4, 3, 1]
    , [3, 1, 2, 4], [3, 1, 4, 2], [3, 2, 1, 4], [3, 2, 4, 1]
    , [3, 4, 1, 2], [3, 4, 2, 1], [4, 1, 2, 3], [4, 1, 3, 2]
    , [4, 2, 1, 3], [4, 2, 3, 1], [4, 3, 1, 2], [4, 3, 2, 1]
    ]

perm :: String -> Array Int
perm digit = unsafePartial $ fromJust $ perms !! (permIndex digit)

permStr :: String -> String
permStr digit = foldMap show $ perm digit

computePerm :: forall a. String -> Array a -> Array a
computePerm digit stack = h' <> t
    where h    = reverse $ take 4 stack
          h'   = reverse $ catMaybes $ map (\i -> h !! (i - 1)) $ perm digit
          t    = drop 4 stack

rotate :: String -> Operator
rotate x =
    { name: "@" <> x
    , clauses:
        [ { sig: []
          , description: "Permute the stack <pre>1234</pre> -> <pre>" <> permStr x <> "</pre>."
          , body: modify (computePerm x)
          }
        ]
    }