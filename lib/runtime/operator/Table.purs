module Egg.Runtime.Operator.Table where

import Prelude (($), map, (<>))
import Data.Map (Map, fromFoldable)
import Data.String.Utils (toCharArray)
import Data.Tuple (Tuple(..))

import Egg.Runtime.Operator.Operator (Operator)

import Egg.Runtime.Operator.Equals (equals)
import Egg.Runtime.Operator.Float (float)
import Egg.Runtime.Operator.Set (set)

type OperatorTable = Map String Operator

operatorTable :: OperatorTable
operatorTable = fromFoldable $ map go operators
    where go op = Tuple op.name op

operators :: Array Operator
operators =
    [ equals
    , float
    ] <> setOperators

setOperators :: Array Operator
setOperators = map set $ toCharArray "ABCDEFG"