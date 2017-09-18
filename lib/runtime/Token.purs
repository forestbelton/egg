module Egg.Runtime.Token where

import Prelude

import Data.BigInt (BigInt)
import Data.Foldable (foldMap)
import Data.String (joinWith)

data Token
    = Op String
    | Arr (Array Token)
    | Str String
    | Ch String
    | BInt BigInt
    | Num Number
    | Block (Array Token)

displayToken :: Token -> String
displayToken (Op name)    = name
displayToken (Arr tokens) = foldMap displayToken tokens
displayToken (Str str)    = str
displayToken (Ch ch)      = ch
displayToken (BInt int)   = show int
displayToken (Num num)    = show num
displayToken (Block tokens) = "{" <> (joinWith " " $ map displayToken tokens) <> "}"