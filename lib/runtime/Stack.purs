module Egg.Runtime.Stack where

import Data.List (List)
import Egg.Runtime.Token (Token)

newtype Stack = Stack (List Token)