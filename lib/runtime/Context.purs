module Egg.Runtime.Context where

import Data.Array ((:), take, drop)
import Data.List (List, fromFoldable)
import Data.Tuple (Tuple(..))

import Egg.Runtime.Env (Env, defaultEnv)
import Egg.Runtime.Token (Token)

type Context =
    { env :: Env
    , stack :: Array Token
    , tokens :: List Token
    , input :: String
    , output :: String
    }

newContext :: String -> Array Token -> Context
newContext input tokens = { env: defaultEnv, stack: [], input: input, tokens: fromFoldable tokens, output: "" }

push :: Context -> Token -> Context
push ctx token = ctx { stack = (token : ctx.stack) }

pop :: Context -> Int -> Tuple (Array Token) Context
pop ctx n = Tuple top ctx'
    where top  = take n ctx.stack
          ctx' = ctx { stack = drop n ctx.stack }