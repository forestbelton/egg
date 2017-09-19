module Egg.Runtime.Runtime where

import Control.Monad.State (State, execState, get, put)
import Control.Monad.Free (foldFree)
import Data.Array (foldl, head, tail, (:), reverse)
import Data.Map (lookup, insert)
import Data.Maybe (Maybe(..), maybe)
import Data.NaturalTransformation (type (~>))
import Data.String (null, joinWith)
import Partial.Unsafe (unsafeCrashWith)
import Prelude (Unit, bind, discard, pure, ($), (<>), id, map)

import Egg.Runtime.Embed (lift)
import Egg.Runtime.Env (Env, defaultEnv)
import Egg.Runtime.Operator.Table (findMatchingClause)
import Egg.Runtime.Stmt (Stmt, StmtF(..), get', push)
import Egg.Runtime.Token (Token(..), displayToken)

foreign import parse :: String -> Array Token

evaluate :: String -> String -> String
evaluate code input = gatherOutput finalCtx
    where tokens = parse code
          initialCtx = newContext input
          finalCtx = foldl evaluateToken initialCtx $ tokens

gatherOutput :: Context -> String
gatherOutput ctx = ctx.output <> tokens
    where tokens = joinWith "" $ map displayToken $ reverse ctx.stack

type Context =
    { env :: Env
    , stack :: Array Token
    , input :: String
    , output :: String
    }

newContext :: String -> Context
newContext input =
    { env: defaultEnv
    , stack: []
    , input: input
    , output: ""
    }

evaluateToken :: Context -> Token -> Context
evaluateToken ctx (Var v)   = execStmt ctx $ do
    x :: Token <- get' v
    push x
evaluateToken ctx (Op name) = execStmt ctx $ findMatchingClause ctx.stack name
evaluateToken ctx value     = ctx { stack = (value : ctx.stack) }

execStmt :: Context -> Stmt Unit -> Context
execStmt ctx stmt = execState (foldFree evaluateStmt stmt) ctx

evaluateStmt :: StmtF ~> State Context
evaluateStmt (Pop f) = do
    ctx <- get
    put $ ctx { stack = maybe [] id (tail ctx.stack) }
    case head ctx.stack of
        Just token -> pure $ f token
        Nothing    -> unsafeCrashWith "tried to pop from empty stack"
evaluateStmt (Execute block next) = do
    ctx <- get
    put $ foldl evaluateToken ctx block
    pure next
evaluateStmt (Push x next) = do
    ctx <- get
    put $ ctx { stack = (x : ctx.stack) }
    pure next
evaluateStmt (Display s next) = do
    ctx <- get
    put $ ctx { output = ctx.output <> s }
    pure next
evaluateStmt (Read f) = do
    ctx <- get
    put $ ctx { input = "" }
    if null ctx.output
        then unsafeCrashWith "no input to read"
        else pure $ f ctx.output
evaluateStmt (Set v x next) = do
    ctx <- get
    put $ ctx { env = insert v x ctx.env }
    pure next
evaluateStmt (Get v f) = do
    ctx <- get
    let x = maybe (lift 0) id $ lookup v ctx.env
    pure $ f x
evaluateStmt (Error msg) = unsafeCrashWith msg