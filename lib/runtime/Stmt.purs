module Egg.Runtime.Stmt where

import Control.Monad.Free (Free, liftF)
import Data.BigInt (BigInt)
import Data.Maybe (Maybe(..))
import Prelude (($), Unit, unit, id, bind, pure)

import Egg.Runtime.Embed
import Egg.Runtime.Token (Token)

data StmtF a
    = Pop (Token -> a)
    | Execute (Array Token) a
    | Push Token a
    | Display String a
    | Read (String -> a)
    | Set String Token a
    | Error String

type Stmt a = Free StmtF a

pop_ :: Stmt Token
pop_ = liftF $ Pop id

pop :: forall a. Embed a => Stmt a
pop = do token <- pop_
         case lower token of
            Just value -> pure value
            _          -> error $ "unexpected value on stack"

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