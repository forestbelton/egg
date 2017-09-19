module Egg.Runtime.Type where

import Data.Eq
import Egg.Runtime.Token (Token(..))
import Partial.Unsafe (unsafeCrashWith)

data Ty
    = TAny
    | TArr
    | TStr
    | TCh
    | TBInt
    | TNum
    | TBlock

derive instance eqTy :: Eq Ty

types :: Array Ty
types = [TAny, TArr, TStr, TCh, TBInt, TNum, TBlock]

typeOf :: Token -> Ty
typeOf (Op _)    = unsafeCrashWith "ops do not have a type"
typeOf (Var _)   = unsafeCrashWith "vars do not have a type"
typeOf (Arr _)   = TArr
typeOf (Str _)   = TStr
typeOf (Ch _)    = TCh
typeOf (BInt _)  = TBInt
typeOf (Num _)   = TNum
typeOf (Block _) = TBlock

typeName :: Ty -> String
typeName TAny   = "any"
typeName TArr   = "array"
typeName TStr   = "string"
typeName TCh    = "char"
typeName TBInt  = "bigint"
typeName TNum   = "decimal"
typeName TBlock = "block"