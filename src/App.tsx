import {
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  Group,
  usePlatform,
  Div,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from './store';
import { fetchItems } from 'store/itemSlice';

import ListCards from 'components/List';
import Cart from 'components/Cart';

function App() {
  const platform = usePlatform();

  const dispatch = useAppDispatch();
  const { items, status } = useSelector((state: RootState) => state.items);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <AppRoot>
      <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
        <SplitCol autoSpaced>
          <View activePanel="main">
            <Panel id="main">
              <PanelHeader style={{ zIndex: '15' }}>Корзина</PanelHeader>
              <Group
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0px',
                }}
              >
                <ListCards items={items || []} status={status} />
                <Div
                  style={{
                    padding: '0px',
                    borderLeft: '1px solid var(--vkui--color_separator_primary)',
                  }}
                />
                <Cart />
              </Group>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
}

export default App;
