module Egg.Runtime.Embed where

import Egg.Runtime.Token
import Data.Array (catMaybes)
import Data.BigInt (BigInt, fromInt, toNumber)
import Data.Int (floor)
import Data.Maybe (Maybe(..))
import Prelude (($), map, (==), id)

-- Embed a native PureScript value into an egg one (or vice versa)
class Embed a where
    lift  :: a -> Token
    lower :: Token -> Maybe a

instance embedToken :: Embed Token where
    lift = id
    lower = Just

instance embedArray :: Embed (Array Token) where
    lift xs        = Arr $ map lift xs
    lower (Arr xs) = Just $ catMaybes $ map lower xs
    lower _        = Nothing

instance embedString :: Embed String where
    lift          = Str
    lower (Str s) = Just s
    lower _       = Nothing

instance embedInt :: Embed Int where
    lift x = BInt $ fromInt x
    lower (BInt x) = Just $ floor (toNumber x)
    lower _        = Nothing

instance embedBigInt :: Embed BigInt where
    lift           = BInt
    lower (BInt x) = Just x
    lower _        = Nothing

instance embedNum :: Embed Number where
    lift          = Num
    lower (Num n) = Just n
    lower _       = Nothing

instance embedBool :: Embed Boolean where
    lift x         = lift $ if x then 1 else 0
    lower (BInt x) = Just $ if x == fromInt 1 then true else false
    lower _        = Nothing

newtype ABlock = ABlock (Array Token)

instance embedBlock :: Embed ABlock where
    lift (ABlock block) = Block block
    lower (Block block) = Just $ ABlock block
    lower _             = Nothing