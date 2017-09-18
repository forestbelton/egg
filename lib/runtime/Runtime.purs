module Egg.Runtime.Runtime where

import Data.Array (head, filter, length, drop, all, zip)
import Data.Foldable (foldr, foldMap)
import Data.Map (lookup)
import Data.Maybe (Maybe(..), fromJust)
import Data.Tuple (Tuple(..))
import Partial.Unsafe (unsafeCrashWith, unsafePartial)
import Prelude ((<>), ($), (>=), (&&), (-), (==))

import Egg.Runtime.Operator.Operator (Clause)
import Egg.Runtime.Operator.Table (operatorTable)
import Egg.Runtime.Context (Context, newContext, push, getOutput, getStack, getEnv)
import Egg.Runtime.Token (Token(..), displayToken)
import Egg.Runtime.Type (Ty, typeOf)

foreign import parse :: String -> Array Token

evaluate :: String -> String -> String
evaluate code input = output <> stack
    where tokens = parse code
          initialCtx = newContext input
          finalCtx = foldr evaluateToken initialCtx tokens
          output = getOutput finalCtx
          stack = foldMap displayToken $ getStack finalCtx

evaluateToken :: Token -> Context -> Context
evaluateToken (Var v) ctx = push ctx (unsafePartial $ fromJust $ lookup v $ getEnv ctx)
evaluateToken (Op name) ctx = case lookup name operatorTable of
    Nothing -> unsafeCrashWith $ "unknown operator: " <> name
    Just op -> case head $ filter (matchingClause (getStack ctx)) op.clauses of
        Nothing -> unsafeCrashWith $ "no matching clause for: " <> name
        Just clause -> clause.body ctx
evaluateToken value ctx = push ctx value

matchingClause :: Array Token -> Clause -> Boolean
matchingClause stack clause = length stack >= length clause.sig
    && sigMatches stack clause.sig

sigMatches :: Array Token -> Array Ty -> Boolean
sigMatches stack tys = all check $ zip top tys
    where top = drop (length stack - length tys) stack
          check (Tuple token ty) = typeOf token == ty