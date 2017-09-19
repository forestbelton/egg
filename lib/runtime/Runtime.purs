module Egg.Runtime.Runtime where

import Data.Array (head, filter, length, take, all, zip, reverse, foldr)
import Data.BigInt (fromInt)
import Data.Foldable (foldMap)
import Data.List (List(..), (:))
import Data.Map (lookup)
import Data.Maybe (Maybe(..), maybe)
import Data.Tuple (Tuple(..))
import Partial.Unsafe (unsafeCrashWith)
import Prelude ((<>), ($), (>=), (&&), (==), id, (||), flip)

import Egg.Runtime.Operator.Operator (Clause)
import Egg.Runtime.Operator.Table (operatorTable)
import Egg.Runtime.Context (Context, newContext, push)
import Egg.Runtime.Token (Token(..), displayToken)
import Egg.Runtime.Type (Ty(..), typeOf)

foreign import parse :: String -> Array Token

evaluate :: String -> String -> String
evaluate code input = ""

{-
evaluate :: String -> String -> String
evaluate code input = output <> stack
    where tokens = parse code
          ctx = evaluateContext $ newContext input tokens
          output = ctx.output
          stack = foldMap displayToken $ reverse $ ctx.stack

evaluateContext :: Context -> Context
evaluateContext ctx = case ctx.tokens of
    Nil           -> ctx
    (head : tail) -> evaluateContext $ evaluateToken (ctx { tokens = tail }) head

evaluateToken :: Context -> Token -> Context
evaluateToken ctx (Var v) = push ctx (maybe (BInt $ fromInt 0) id $ lookup v ctx.env)
evaluateToken ctx (Op name) = case lookup name operatorTable of
    Nothing -> unsafeCrashWith $ "unknown operator: " <> name
    Just op -> case head $ filter (matchingClause ctx.stack) op.clauses of
        Nothing -> unsafeCrashWith $ "no matching clause for: " <> name
        Just clause -> clause.body ctx
evaluateToken ctx value = push ctx value

evaluateBlock :: Context -> Array Token -> Context
evaluateBlock ctx tokens = foldr (flip evaluateToken) ctx tokens

matchingClause :: Array Token -> Clause -> Boolean
matchingClause stack clause = length stack >= length clause.sig
    && sigMatches stack clause.sig

sigMatches :: Array Token -> Array Ty -> Boolean
sigMatches stack tys = all check $ zip top tys
    where top = reverse $ take (length tys) stack
          check (Tuple token ty) = typeOf token == ty || ty == TAny
-}