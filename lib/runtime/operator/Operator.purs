module Egg.Runtime.Operator.Operator where

import Prelude
import Control.Monad.Eff (Eff)
import Control.Monad.ST (ST, STRef)

import Egg.Runtime.Type (Ty)
import Egg.Runtime.Context (Context)

type Handler = forall eff h. STRef h Context -> Eff (st :: ST h | eff) Unit

type Clause =
    { sig  :: Array Ty
    , body :: Handler
    }

type Operator =
    { name :: String
    , clauses :: Array Clause
    }