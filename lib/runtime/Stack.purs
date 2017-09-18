module Egg.Runtime.Stack where

import Egg.Runtime.Token (Token)

newtype Stack = Stack (Array Token)