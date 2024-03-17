import { Div, List, Separator } from '@vkontakte/vkui';
import { useDispatch, useSelector } from 'react-redux';
import { CartType } from 'types';
import { RootState } from 'store';
import { useEffect, useState } from 'react';
import { setCart } from 'store/cartSlice';
import Item from './Item';

interface ListProps {
  items: CartType[];
  status: string;
}

function ListCards({ items, status }: ListProps) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.cart);
  const [length, setLength] = useState<number>(0);

  useEffect(() => {
    if (items.length) {
      setLength(items.length > 1 ? items.length - 1 : 0);

      const updatedCart = items.map((item) => {
        return { ...item, count: item.count || 1 };
      });
      dispatch(setCart([...updatedCart]));
    }
  }, [items, dispatch]);

  useEffect(() => {
    if (cart.length) {
      [...cart].sort((a, b) => a.id - b.id);
    }
  }, [cart]);

  return (
    <Div style={{ width: '75%', padding: '0px' }}>
      <List style={{ height: '100%' }}>
        {status === 'success' ? (
          cart.length &&
          [...cart]
            .sort((a, b) => a.id - b.id)
            .map((product, index) => (
              <Div key={product.id} style={{ padding: '0px' }}>
                <Item product={product} />
                {index < length && <Separator />}
              </Div>
            ))
        ) : (
          <Div
            style={{
              padding: '0px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <Div className="loader">
              <Div className="innerCircle" />
            </Div>
          </Div>
        )}
      </List>
    </Div>
  );
}

export default ListCards;
