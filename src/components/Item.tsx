import {
  ButtonGroup,
  Caption,
  CellButton,
  Div,
  Headline,
  IconButton,
  Image,
  MiniInfoCell,
  Text,
} from '@vkontakte/vkui';
import { CartType } from 'types';
import './Styles.css';
import { Icon20Add, Icon20DeleteOutline, Icon20MinusOutline } from '@vkontakte/icons';
import { setCart } from 'store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';

interface CardProps {
  product: CartType;
}

function Item({ product }: CardProps) {
  const { image, title, description, price, count } = product;
  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.cart);

  const addItem = (item: CartType) => {
    dispatch(
      setCart([
        ...cart.filter((elem) => elem.id !== item.id),
        {
          ...item,
          count: item.count + 1,
        },
      ]),
    );
  };

  const deleteItem = (item: CartType) => {
    cart
      .filter((el) => el.id === item.id)
      .map((elem) => {
        if (elem.count > 1) {
          return dispatch(
            setCart([
              ...cart.filter((elem) => elem.id !== item.id),
              {
                ...elem,
                count: elem.count - 1,
              },
            ]),
          );
        } else {
          return dispatch(setCart([...cart.filter((elem) => elem.id !== item.id)]));
        }
      });
  };

  const deleteAllItems = (item: CartType) => {
    dispatch(setCart([...cart.filter((elem) => elem.id !== item.id)]));
  };

  return (
    <Div style={{ display: 'flex', position: 'relative' }}>
      <MiniInfoCell
        style={{
          position: 'absolute',
          top: '24px',
          left: '12px',
          backgroundColor: 'red',
          zIndex: '10',
          color: 'white',
          padding: '2px',
          borderRadius: '4px',
        }}
      >
        <Caption>-20%</Caption>
      </MiniInfoCell>
      <Image size={128} src={image} style={{ objectFit: 'cover' }} />
      <Div
        style={{
          paddingTop: '0px',
          paddingBottom: '0px',
          paddingRight: '0px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Div style={{ display: 'flex', padding: '0px', gap: '12px' }}>
          <Headline>
            {new Intl.NumberFormat('ru-RU').format(Math.round(price))} ₽
          </Headline>
          <Headline style={{ textDecoration: 'line-through', opacity: '0.5' }}>
            {new Intl.NumberFormat('ru-RU').format(Math.round(price / 0.8))} ₽
          </Headline>
        </Div>
        <Div style={{ padding: '0px', flexGrow: '1' }}>
          <Headline weight="1">{title}</Headline>
          <Caption className="description">{description}</Caption>
        </Div>
        <Div
          style={{
            padding: '0px',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <ButtonGroup
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <IconButton
              label="remove"
              style={{ padding: '8px' }}
              onClick={() => deleteItem(product)}
            >
              <Icon20MinusOutline />
            </IconButton>
            <Text>{count}</Text>
            <IconButton
              label="add"
              style={{ padding: '8px' }}
              onClick={() => addItem(product)}
            >
              <Icon20Add color="var(--vkui--color_background_accent)" />
            </IconButton>
          </ButtonGroup>
          <CellButton
            style={{
              width: 'max-content',
              color: 'var(--vkui--color_text_secondary)',
            }}
            before={<Icon20DeleteOutline color="var(--vkui--color_text_secondary)" />}
            onClick={() => deleteAllItems(product)}
          >
            Удалить товар
          </CellButton>
        </Div>
      </Div>
    </Div>
  );
}

export default Item;
