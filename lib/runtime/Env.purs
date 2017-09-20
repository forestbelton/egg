module Egg.Runtime.Env where

import Prelude (($), map)

import Data.BigInt (fromInt)
import Data.Map (Map, fromFoldable)
import Data.Tuple (Tuple(..))
import Egg.Runtime.Token (Token(..))

type Var =
    { name        :: String
    , description :: String
    , default     :: Token
    }

vars :: Array Var
vars =
    [ { name: "N", description: "An empty array.", default: Arr [] }
    , { name: "O", description: "One.", default: BInt (fromInt 1) }
    , { name: "S", description: "An empty string.", default: Str "" }
    , { name: "T", description: "Two.", default: BInt (fromInt 2) }
    ]

type Env = Map String Token

defaultEnv :: Env
defaultEnv = fromFoldable $ map go vars
    where go v = Tuple v.name v.default