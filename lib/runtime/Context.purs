module Egg.Runtime.Context where

import Data.Array ((:), take, drop)
import Data.Tuple (Tuple(..))

import Egg.Runtime.Env (Env, defaultEnv)
import Egg.Runtime.Token (Token)

type Context =
    { env :: Env
    , stack :: Array Token
    , input :: String
    , output :: String
    }

newContext :: String -> Context
newContext input = { env: defaultEnv, stack: [], input: input, output: "" }

push :: Context -> Token -> Context
push ctx token = ctx { stack = (token : ctx.stack) }

pop :: Context -> Int -> Tuple (Array Token) Context
pop ctx n = Tuple top ctx'
    where top  = take n ctx.stack
          ctx' = ctx { stack = drop n ctx.stack }