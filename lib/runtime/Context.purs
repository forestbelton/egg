module Egg.Runtime.Context where

import Prelude (($))
import Data.Array ((:), take, drop)
import Data.Tuple (Tuple(..))

import Egg.Runtime.Env (Env, defaultEnv)
import Egg.Runtime.Stack (Stack(..))
import Egg.Runtime.Token (Token(..))

data Context = Context Env Stack String String

newContext :: Stack -> String -> Context
newContext stack input = Context defaultEnv stack input ""

overStack :: forall a. (Array Token -> Tuple a (Array Token)) -> Context -> Tuple a Context
overStack f (Context env (Stack stack) input output) = Tuple x ctx
    where (Tuple x stack') = f stack
          ctx = Context env (Stack stack') input output

push :: Context -> Token -> Context
push (Context env (Stack tokens) input output) token = Context env stack' input output
    where stack' = Stack $ token : tokens

pop :: Context -> Int -> Tuple (Array Token) Context
pop ctx n = overStack go ctx
    where go stack = Tuple (take n stack) (drop n stack)

execute :: Context -> Token -> Context
execute context (Op op) = context
execute context value   = push context value