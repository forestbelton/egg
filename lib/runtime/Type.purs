module Egg.Runtime.Type where

import Data.Eq
import Egg.Runtime.Token (Token(..))
import Partial.Unsafe (unsafeCrashWith)

data Ty
    = TArr
    | TStr
    | TCh
    | TBInt
    | TNum
    | TBlock

derive instance eqTy :: Eq Ty

typeOf :: Token -> Ty
typeOf (Op _)    = unsafeCrashWith "ops do not have a type"
typeOf (Var _)   = unsafeCrashWith "vars do not have a type"
typeOf (Arr _)   = TArr
typeOf (Str _)   = TStr
typeOf (Ch _)    = TCh
typeOf (BInt _)  = TBInt
typeOf (Num _)   = TNum
typeOf (Block _) = TBlock