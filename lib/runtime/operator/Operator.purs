module Egg.Runtime.Operator.Operator where

import Prelude (Unit)

import Egg.Runtime.Type (Ty)
import Egg.Runtime.Stmt (Stmt)

type Clause =
    { sig  :: Array Ty
    , description :: String
    , body :: Stmt Unit
    }

type Operator =
    { name :: String
    , clauses :: Array Clause
    }