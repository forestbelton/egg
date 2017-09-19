module Egg.Runtime.Stmt where

import Control.Monad.Free (Free, liftF)
import Data.BigInt (BigInt)
import Prelude (($), Unit, unit, id)

import Egg.Runtime.Token (Token)

data StmtF a
    = PopBInt (BigInt -> a)
    | Execute (Array Token) a
    | Push Token a
    | Display String a
    | Read (String -> a)

type Stmt a = Free StmtF a

popBInt :: Stmt BigInt
popBInt = liftF $ PopBInt id

execute :: Array Token -> Stmt Unit
execute block = liftF $ Execute block unit

push :: Token -> Stmt Unit
push tok = liftF $ Push tok unit

display :: String -> Stmt Unit
display str = liftF $ Display str unit

read :: Stmt String
read = liftF $ Read id