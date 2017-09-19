module Egg.Runtime.Operator.Table
    ( operators
    , findMatchingClause
    ) where

import Prelude (($), map, (<>), (>=), (==), (&&), (||), Unit)
import Data.Array (all, head, filter, length, reverse, take, zip)
import Data.Map (Map, fromFoldable, lookup)
import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..))

import Egg.Runtime.Stmt
import Egg.Runtime.Token (Token)
import Egg.Runtime.Type (Ty(..), typeOf)
import Egg.Runtime.Operator.Operator (Operator, Clause)

import Egg.Runtime.Operator.Caret (caret)
import Egg.Runtime.Operator.Comma (comma)
import Egg.Runtime.Operator.Equals (equals)
import Egg.Runtime.Operator.Float (float)
import Egg.Runtime.Operator.Minus (minus)
import Egg.Runtime.Operator.Plus (plus)
import Egg.Runtime.Operator.RBrace (rbrace)
import Egg.Runtime.Operator.Set (set)

type OperatorTable = Map String Operator

operatorTable :: OperatorTable
operatorTable = fromFoldable $ map go operators
    where go op = Tuple op.name op

operators :: Array Operator
operators = mainOperators <> setOperators

mainOperators :: Array Operator
mainOperators =
    [ caret
    , comma
    , equals
    , float
    , minus
    , plus
    , rbrace
    ]

setOperators :: Array Operator
setOperators = map set ["A", "B", "C", "D", "E", "F", "G"]

findMatchingClause :: Array Token -> String -> Stmt Unit
findMatchingClause stack name = case lookup name operatorTable of
    Nothing -> error $ "unknown operator: " <> name
    Just op -> case head $ filter (matchingClause stack) op.clauses of
        Nothing     -> error $ "no matching clause for: " <> name
        Just clause -> clause.body

matchingClause :: Array Token -> Clause -> Boolean
matchingClause stack clause = length stack >= length clause.sig
    && sigMatches stack clause.sig

sigMatches :: Array Token -> Array Ty -> Boolean
sigMatches stack tys = all check $ zip top tys
    where top = reverse $ take (length tys) stack
          check (Tuple token ty) = typeOf token == ty || ty == TAny