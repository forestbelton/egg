module Egg.Runtime.Stmt where

import Control.Monad.Free

import Data.BigInt (BigInt)
import Egg.Runtime.Token (Token)

data StmtF a
    = PopBigInt (BigInt -> a)
    | Execute (Array Token) a
    | Push Token a
    | Display String a
    | Read (String -> a)

type Stmt a = Free StmtF a