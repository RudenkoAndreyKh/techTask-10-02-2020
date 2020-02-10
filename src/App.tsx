import React, { Component, } from 'react';
import UsersFilter from './screens/users.filter/users.filter.screen';
import { SafeAreaView } from 'react-native';

interface Props {

};

interface State {

}

class App extends Component<Props, State> {

  constructor(props: any) {
    super(props);
    this.state = {

    }
  }

  render() {
    console.disableYellowBox = true;
    return (
      <SafeAreaView>
        <UsersFilter />
      </SafeAreaView>
    )
  }
}

export default App