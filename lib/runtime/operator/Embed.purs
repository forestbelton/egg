module Egg.Runtime.Operator.Embed where

import Egg.Runtime.Token
import Data.BigInt (fromInt, toNumber)
import Data.Int (floor)
import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..))
import Egg.Runtime.Context (Context, pop)
import Partial.Unsafe (unsafeCrashWith)
import Prelude (($), map, (==))

-- Embed a native PureScript value into an egg one (or vice versa)
class Embed a where
    lift  :: a -> Token
    lower :: Token -> Maybe a

instance embedArray :: Embed a => Embed (Array a) where
    lift xs = Arr $ map lift xs
    lower = unsafeCrashWith "not implemented"

instance embedString :: Embed String where
    lift          = Str
    lower (Str s) = Just s
    lower (Ch c)  = Just c
    lower _       = Nothing

instance embedInt :: Embed Int where
    lift x = BInt $ fromInt x
    lower (BInt x) = Just $ floor (toNumber x)
    lower _        = Nothing

instance embedNum :: Embed Number where
    lift          = Num
    lower (Num n) = Just n
    lower _       = Nothing

instance embedBool :: Embed Boolean where
    lift x         = lift $ if x then 1 else 0
    lower (BInt x) = Just $ if x == fromInt 1 then true else false
    lower _        = Nothing

binaryOp :: forall a b. Embed a => Embed b => (a -> b -> Context -> Context) -> (Context -> Context)
binaryOp f ctx = case pop ctx 2 of
    Tuple [x, y] ctx' -> case Tuple (lower x) (lower y) of
        Tuple (Just lx) (Just ly) -> f lx ly ctx'
        _ -> unsafeCrashWith $ "invalid stack values for binary operator"
    _ -> unsafeCrashWith $ "found less than 2 stack values for binary operator"