module Egg.Runtime.Context where

import Prelude (($))
import Data.Array ((:), take, drop)
import Data.Tuple (Tuple(..))

import Egg.Runtime.Stack (Stack(..))
import Egg.Runtime.Token (Token)

data Context = Context Stack String String

newContext :: Stack -> String -> Context
newContext stack input = Context stack input ""

overStack :: forall a. (Array Token -> Tuple a (Array Token)) -> Context -> Tuple a Context
overStack f (Context (Stack stack) input output) = Tuple x ctx
    where (Tuple x stack') = f stack
          ctx = Context (Stack stack') input output

push :: Context -> Token -> Context
push (Context (Stack tokens) input output) token = Context stack' input output
    where stack' = Stack $ token : tokens

pop :: Context -> Int -> Tuple (Array Token) Context
pop ctx n = overStack go ctx
    where go stack = Tuple (take n stack) (drop n stack)