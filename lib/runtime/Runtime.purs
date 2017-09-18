module Egg.Runtime.Runtime where

import Data.Array (head, filter, length, drop, all, zip)
import Data.BigInt (fromInt)
import Data.Foldable (foldl, foldMap)
import Data.Map (lookup)
import Data.Maybe (Maybe(..), maybe)
import Data.Tuple (Tuple(..))
import Partial.Unsafe (unsafeCrashWith)
import Prelude ((<>), ($), (>=), (&&), (-), (==), id)

import Egg.Runtime.Operator.Operator (Clause)
import Egg.Runtime.Operator.Table (operatorTable)
import Egg.Runtime.Context (Context, newContext, push)
import Egg.Runtime.Token (Token(..), displayToken)
import Egg.Runtime.Type (Ty, typeOf)

foreign import parse :: String -> Array Token

evaluate :: String -> String -> String
evaluate code input = output <> stack
    where tokens = parse code
          initialCtx = newContext input
          finalCtx = foldl evaluateToken initialCtx tokens
          output = finalCtx.output
          stack = foldMap displayToken $ finalCtx.stack

evaluateToken :: Context -> Token -> Context
evaluateToken ctx (Var v) = push ctx (maybe (BInt $ fromInt 0) id $ lookup v ctx.env)
evaluateToken ctx (Op name) = case lookup name operatorTable of
    Nothing -> unsafeCrashWith $ "unknown operator: " <> name
    Just op -> case head $ filter (matchingClause ctx.stack) op.clauses of
        Nothing -> unsafeCrashWith $ "no matching clause for: " <> name
        Just clause -> clause.body ctx
evaluateToken ctx value = push ctx value

matchingClause :: Array Token -> Clause -> Boolean
matchingClause stack clause = length stack >= length clause.sig
    && sigMatches stack clause.sig

sigMatches :: Array Token -> Array Ty -> Boolean
sigMatches stack tys = all check $ zip top tys
    where top = drop (length stack - length tys) stack
          check (Tuple token ty) = typeOf token == ty