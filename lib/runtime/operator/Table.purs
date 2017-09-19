module Egg.Runtime.Operator.Table where

import Prelude (($), map, (<>))
import Data.Map (Map, fromFoldable)
import Data.Tuple (Tuple(..))

import Egg.Runtime.Operator.Operator (Operator)

import Egg.Runtime.Operator.Caret (caret)
import Egg.Runtime.Operator.Equals (equals)
import Egg.Runtime.Operator.Float (float)
import Egg.Runtime.Operator.Minus (minus)
import Egg.Runtime.Operator.Set (set)
import Egg.Runtime.Operator.Add (add)

type OperatorTable = Map String Operator

operatorTable :: OperatorTable
operatorTable = fromFoldable $ map go operators
    where go op = Tuple op.name op

operators :: Array Operator
operators = mainOperators <> setOperators

mainOperators :: Array Operator
mainOperators =
    [ caret
    , equals
    , float
    , minus
    , add
    ]

setOperators :: Array Operator
setOperators = map set ["A", "B", "C", "D", "E", "F", "G"]
