import { observer } from 'mobx-react';
import React from 'react';

import GlobalMenu from '../GlobalMenu';
import Pages from '../Pages';
import Toolbar from '../Toolbar';
import { StyledApp, Line } from './styles';
import store from '../../store';
import { getKeyBindings, bindKeys } from '~/utils/keyboard-shortcuts';
import TabGroupsMenu from '../TabGroupsMenu';
import PageMenu from '@app/components/PageMenu';
import UpdateSnackbar from '@app/components/UpdateSnackbar';

@observer
class App extends React.Component {
  public async componentDidMount() {
    window.addEventListener('mousemove', this.onWindowMouseMove);
    window.addEventListener('mousedown', this.onWindowMouseDown);
    window.addEventListener('mouseup', this.onWindowMouseUp);

    await store.faviconsStore.load();
    await store.bookmarksStore.load();
    await store.historyStore.load();

    store.keyBindingsStore.keyBindings = await getKeyBindings();
    bindKeys(store.keyBindingsStore.keyBindings);
  }

  public componentWillUnmount() {
    store.pagesStore.pages = [];
    store.tabsStore.groups = [];

    window.removeEventListener('mousemove', this.onWindowMouseMove);
    window.removeEventListener('mousedown', this.onWindowMouseDown);
    window.removeEventListener('mouseup', this.onWindowMouseUp);
  }

  public onWindowMouseMove = (e: MouseEvent) => {
    store.mouse.x = e.pageX;
    store.mouse.y = e.pageY;
  };

  public onWindowMouseDown = (e: MouseEvent) => {
    store.pageMenuStore.visible = false;
  };

  public onWindowMouseUp = (e: MouseEvent) => {
    store.bookmarksStore.dialogVisible = false;
  };

  public render() {
    return (
      <StyledApp>
        <Toolbar />
        <Line />
        <Pages />
        <PageMenu />
        <GlobalMenu />
        <TabGroupsMenu />
        <UpdateSnackbar />
      </StyledApp>
    );
  }
}

export default App;