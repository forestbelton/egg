module Egg.Runtime.Token where

import Data.BigInt (BigInt)
import Data.Foldable (foldMap)
import Data.List (List)
import Data.Show (show)

data Token
    = Op String
    | Arr (List Token)
    | Str String
    | Ch String
    | BInt BigInt
    | Num Number

showToken :: Token -> String
showToken (Op name)    = name
showToken (Arr tokens) = foldMap showToken tokens
showToken (Str str)    = str
showToken (Ch ch)      = ch
showToken (BInt int)   = show int
showToken (Num num)    = show num