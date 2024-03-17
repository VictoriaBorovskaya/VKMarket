import { Button, Caption, Div, Headline } from '@vkontakte/vkui';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

function Cart() {
  const { cart } = useSelector((state: RootState) => state.cart);

  const pluralize = (number: number, one: string, few: string, many: string) => {
    const mod10 = number % 10;
    const mod100 = number % 100;
    if (mod10 === 1 && mod100 !== 11) {
      return [number, one];
    } else if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) {
      return [number, few];
    } else {
      return [number, many];
    }
  };

  return (
    <Div
      style={{
        width: '25%',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <Div
        style={{
          padding: '0px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Headline weight="1">
          Итого{' '}
          {pluralize(
            cart.reduce((prev, cur) => ({ count: prev.count + cur.count }), { count: 0 })
              .count,
            ' товар:',
            ' товара:',
            ' товаров:',
          )}
        </Headline>
        <Headline weight="1">
          {new Intl.NumberFormat('ru-RU').format(
            cart.reduce((prev, cur) => ({ price: prev.price + cur.price * cur.count }), {
              price: 0,
            }).price,
          )}{' '}
          ₽
        </Headline>
      </Div>
      <Caption style={{ color: 'var(--vkui--color_text_secondary)' }}>
        Без учёта доставки, оплата VK Pay или по договорённости с продавцом
      </Caption>
      <Button size="m">Перейти к оформлению</Button>
    </Div>
  );
}

export default Cart;
