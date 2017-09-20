module Egg.Runtime.Operator.Zip where

import Data.Array ((:), head, tail, zipWith)
import Data.Maybe (Maybe(..), maybe)
import Data.Tuple (Tuple(..))
import Prelude (($), bind, discard, id, pure, class Monad)

import Egg.Runtime.Embed (ABlock(..))
import Egg.Runtime.Stmt
import Egg.Runtime.Operator.Operator (Operator)
import Egg.Runtime.Token (Token(..))
import Egg.Runtime.Type (Ty(..))

zipM :: forall a b c m. Monad m => (a -> b -> m c) -> Array a -> Array b -> m (Array c)
zipM f xs ys = case Tuple (head xs) (head ys) of
    Tuple Nothing  _        -> pure []
    Tuple _        Nothing  -> pure []
    Tuple (Just x) (Just y) -> do
      z <- f x y
      zs <- zipM f (maybe [] id $ tail xs) (maybe [] id $ tail ys)
      pure $ z : zs

zipStep :: Array Token -> Token -> Token -> Stmt Token
zipStep block x y = do
    push x
    push y
    execute block
    pop

zip :: Operator
zip =
    { name: "z"
    , clauses:
        [ { sig: [TArr, TArr]
          , description: "Zip two arrays."
          , body: do
              ys :: Array Token <- pop
              xs :: Array Token <- pop
              push $ zipWith (\x y -> Arr [x, y]) xs ys
          }
        , { sig: [TArr, TArr, TBlock]
          , description: "Zip two arrays, combining elements with block."
          , body: do
              ABlock block <- pop
              ys :: Array Token <- pop
              xs :: Array Token <- pop

              zs <- zipM (zipStep block) xs ys
              push zs
          }
        ]
    }