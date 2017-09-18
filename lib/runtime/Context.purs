module Egg.Runtime.Context where

import Data.Array ((:), take, drop)
import Data.Tuple (Tuple(..))

import Egg.Runtime.Env (Env, defaultEnv)
import Egg.Runtime.Token (Token(..))

data Context = Context Env (Array Token) String String

newContext :: Array Token -> String -> Context
newContext stack input = Context defaultEnv stack input ""

overStack :: forall a. (Array Token -> Tuple a (Array Token)) -> Context -> Tuple a Context
overStack f (Context env stack input output) = Tuple x ctx
    where (Tuple x stack') = f stack
          ctx = Context env stack' input output

push :: Context -> Token -> Context
push (Context env tokens input output) token = Context env (token : tokens) input output

pop :: Context -> Int -> Tuple (Array Token) Context
pop ctx n = overStack go ctx
    where go stack = Tuple (take n stack) (drop n stack)

execute :: Context -> Token -> Context
execute context (Op op) = context
execute context value   = push context value