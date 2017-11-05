/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  Image,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });


export default class App extends Component {

   _onPressButton() {
      Alert.alert('Great Choice,\nHappy Cooking!')
    }
   constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

componentDidMount() {
   
   return fetch('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=tomatoes%2Cflour%2Csugar&limitLicense=false&number=5&ranking=1',{
      method: 'GET',
      headers: {
    'X-Mashape-Key': '',
    'X-Mashape-Host': 'spoonacular-recipe-food-nutrition-v1.p.mashape.com',
  }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
     
  }
 
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

   return (
      <View style={{flex: 1, paddingTop: 20}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => 
            <View style={styles.container}>
            <Image source={{uri: rowData.image}} style={{width: 250, height: 250, borderRadius: 20}} /> 
            <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
             <View style={styles.button}>
            <Text style={styles.buttonText}>Recipe: {rowData.title}, {"\n"}
            No. of Likes: {rowData.likes}{"\n"}
            {"\n"}
            </Text>
             </View>
            </TouchableHighlight>
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingTop: 50,
    //flexDirection: 'row',
    alignItems: 'center',
  },
  // text: {
  //   marginLeft: 18,
  //   fontSize: 20,
  // },
 button: {
    //marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: 'skyblue',
    borderRadius: 20
  },
  buttonText: {
    padding: 10,
    fontSize: 18,
    color: 'white'
  }
});
