module Egg.Runtime.Operator.Table where

import Prelude (($), map)
import Data.Map (Map, fromFoldable)
import Data.Tuple (Tuple(..))

import Egg.Runtime.Operator.Operator (Operator)

import Egg.Runtime.Operator.Equals

type OperatorTable = Map String Operator

operatorTable :: OperatorTable
operatorTable = fromFoldable $ map go operators
    where go op = Tuple op.name op

operators :: Array Operator
operators =
    [ equals
    ]
