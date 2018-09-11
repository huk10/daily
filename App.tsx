import * as React from 'react';
import { Store } from "./src/mobx";
import { Route } from "./src/router";
import { Provider } from 'mobx-react';

export default class App extends React.Component {
  render () {
    return (
      <Provider {...Store}>
        <Route/>
      </Provider>
    );
  }
}
