module Egg.Runtime.Runtime where

import Control.Monad.State
import Control.Monad.Free
import Data.Array (head, tail, filter, length, take, all, zip, reverse, foldr)
import Data.BigInt (fromInt)
import Data.Foldable (foldMap)
import Data.List (List(..), (:), fromFoldable)
import Data.Map (lookup)
import Data.Maybe (Maybe(..), maybe)
import Data.NaturalTransformation
import Data.Tuple (Tuple(..))
import Partial.Unsafe (unsafeCrashWith)
import Prelude ((<>), ($), (>=), (&&), (==), id, (||), flip, bind, discard)

import Egg.Runtime.Env (Env, defaultEnv)
import Egg.Runtime.Operator.Operator (Clause)
import Egg.Runtime.Operator.Table (findMatchingClause)
import Egg.Runtime.Stmt
import Egg.Runtime.Token (Token(..), displayToken)
import Egg.Runtime.Type (Ty(..), typeOf)

foreign import parse :: String -> Array Token

evaluate :: String -> String -> String
evaluate _ _ = ""

{-
type Context =
    { env :: Env
    , stack :: Array Token
    , tokens :: List Token
    , input :: String
    , output :: String
    }

newContext :: String -> Array Token -> Context
newContext input tokens = { env: defaultEnv, stack: [], input: input, tokens: fromFoldable tokens, output: "" }

evaluate :: String -> String -> String
evaluate code input = finalCtx.output
    where initialCtx = newContext input (parse code)
          finalCtx = execState (foldFree evaluateStmt) initialCtx
          go ctx stmt =

evaluateToken :: Context -> Token -> Context
evaluateToken ctx (Var v)

evaluateStmt :: StmtF ~> State Context
evaluateStmt (Pop x next) = do
    ctx <- get
    put $ ctx { stack = tail ctx.stack }
    case head ctx.stack of
        Just token -> pure $ next token
        Nothing    -> unsafeCrashWith "tried to pop from empty stack"

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
evaluateToken ctx (Op name) =
evaluateToken ctx value = push ctx value

evaluateBlock :: Context -> Array Token -> Context
evaluateBlock ctx tokens = foldr (flip evaluateToken) ctx tokens


-}