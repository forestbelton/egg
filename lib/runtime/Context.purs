module Egg.Runtime.Context where

import Data.Array ((:), take, drop)
import Data.Tuple (Tuple(..))
import Prelude ((<>))

import Egg.Runtime.Env (Env, defaultEnv)
import Egg.Runtime.Token (Token)

{-
type Context =
    { env :: Env
    , stack :: Array Token
    , input :: String
    , output :: String
    }
-}

data Context = Context Env (Array Token) String String

newContext :: String -> Context
newContext input = Context defaultEnv [] input ""

getEnv :: Context -> Env
getEnv (Context env _ _ _) = env

getStack :: Context -> Array Token
getStack (Context _ stack _ _) = stack

overStack :: forall a. (Array Token -> Tuple a (Array Token)) -> Context -> Tuple a Context
overStack f (Context env stack input output) = Tuple x ctx
    where (Tuple x stack') = f stack
          ctx = Context env stack' input output

push :: Context -> Token -> Context
push (Context env tokens input output) token = Context env (token : tokens) input output

pop :: Context -> Int -> Tuple (Array Token) Context
pop ctx n = overStack go ctx
    where go stack = Tuple (take n stack) (drop n stack)

addOutput :: Context -> String -> Context
addOutput (Context env stack input output) str = Context env stack input (output <> str)

getOutput :: Context -> String
getOutput (Context _ _ _ output) = output