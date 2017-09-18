module Egg.Runtime.Operator.Lift where

import Data.BigInt (fromInt)
import Prelude (($), map)

import Egg.Runtime.Token

-- Lift a native PureScript value into an egg one
class Lift a where
    lift :: a -> Token

instance liftArray :: Lift a => Lift (Array a) where
    lift xs = Arr $ map lift xs

instance liftString :: Lift String where
    lift = Str

instance liftInt :: Lift Int where
    lift x = BInt $ fromInt x

instance liftNum :: Lift Number where
    lift = Num

instance liftBool :: Lift Boolean where
    lift x = lift $ if x then 1 else 0
