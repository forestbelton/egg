module Egg.Runtime.Operator.Embed where

import Egg.Runtime.Token
import Data.Array (catMaybes)
import Data.BigInt (BigInt, fromInt, toNumber)
import Data.Int (floor)
import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..))
import Egg.Runtime.Context (Context, pop)
import Partial.Unsafe (unsafeCrashWith)
import Prelude (($), map, (==), id)

-- Embed a native PureScript value into an egg one (or vice versa)
class Embed a where
    lift  :: a -> Token
    lower :: Token -> Maybe a

instance embedToken :: Embed Token where
    lift = id
    lower = Just

instance embedArray :: Embed a => Embed (Array a) where
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

newtype Any = Any Token

instance embedAny :: Embed Any where
    lift (Any x) = x
    lower x = Just $ Any x

newtype ABlock = ABlock (Array Token)

instance embedBlock :: Embed ABlock where
    lift (ABlock block) = Block block
    lower (Block block) = Just $ ABlock block
    lower _             = Nothing

unaryOp :: forall a. Embed a => (a -> Context -> Context) -> (Context -> Context)
unaryOp f ctx = case pop ctx 1 of
    Tuple [x] ctx' -> case (lower x) of
        Just lx -> f lx ctx'
        Nothing -> unsafeCrashWith "invalid stack values for unary operator"
    _ -> unsafeCrashWith "found less than 1 stack value for unary operator"

binaryOp :: forall a b. Embed a => Embed b => (b -> a -> Context -> Context) -> (Context -> Context)
binaryOp f ctx = case pop ctx 2 of
    Tuple [x, y] ctx' -> case Tuple (lower x) (lower y) of
        Tuple (Just lx) (Just ly) -> f ly lx ctx'
        _ -> unsafeCrashWith "invalid stack values for binary operator"
    _ -> unsafeCrashWith "found less than 2 stack values for binary operator"

ternaryOp :: forall a b c. Embed a => Embed b => Embed c => (c -> b -> a -> Context -> Context) -> (Context -> Context)
ternaryOp f ctx = case pop ctx 3 of
    Tuple [x, y, z] ctx' -> case Tuple (lower x) (Tuple (lower y) (lower z)) of
        Tuple (Just lx) (Tuple (Just ly) (Just lz)) -> f lz ly lx ctx'
        _ -> unsafeCrashWith "invalid stack values for ternary operator"
    _ -> unsafeCrashWith "found less than 3 stack values for ternary operator"