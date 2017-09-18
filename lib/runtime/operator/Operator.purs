module Egg.Runtime.Operator.Operator where

import Egg.Runtime.Type (Ty)
import Egg.Runtime.Context (Context)

type Clause =
    { sig  :: Array Ty
    , description :: String
    , body :: Context -> Context
    }

type Operator =
    { name :: String
    , clauses :: Array Clause
    }