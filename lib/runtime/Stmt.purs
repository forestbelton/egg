module Egg.Runtime.Stmt where

import Control.Monad.Free (Free, liftF)
import Data.BigInt (BigInt)
import Prelude (($), Unit, unit, id)

import Egg.Runtime.Embed
import Egg.Runtime.Token (Token)

data StmtF a
    = PopBInt (BigInt -> a)
    | Execute (Array Token) a
    | Push Token a
    | Display String a
    | Read (String -> a)
    | Set String Token a
    | Error String

type Stmt a = Free StmtF a

popBInt :: Stmt BigInt
popBInt = liftF $ PopBInt id

execute :: Array Token -> Stmt Unit
execute block = liftF $ Execute block unit

push :: forall a. Embed a => a -> Stmt Unit
push tok = liftF $ Push (lift tok) unit

display :: String -> Stmt Unit
display str = liftF $ Display str unit

read :: Stmt String
read = liftF $ Read id

set :: String -> Token -> Stmt Unit
set v x = liftF $ Set v x unit

error :: forall a. String -> Stmt a
error str = liftF $ Error str