module Egg.Runtime.Token where

import Data.List (List)
import Data.BigInt (BigInt)

data Token
    = Op String
    | Arr (List Token)
    | Str String
    | Ch String
    | BInt BigInt
    | Num Number
