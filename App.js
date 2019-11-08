import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Decks from './components/Decks'
import DeckDetail from './components/DeckDetail'
import QuizDetail from './components/QuizDetail'
import NewDeck from './components/NewDeck'
import AddCard from './components/AddCard'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { setNotification } from './helper/helper'

const DeckStackNavigator = createStackNavigator({
  Home: {
    screen: Decks
  },

  DeckDetail: {
    screen: DeckDetail
  },

  AddCard: {
    screen: AddCard
  },

  QuizDetail: {
    screen: QuizDetail
  },

});
const NewDeckStack = createStackNavigator({
  Home: {
    screen: NewDeck
  },

  AddCard: {
    screen: AddCard
  }
}, { initialRouteName: "Home" });

const AppContainer = createAppContainer(createBottomTabNavigator(
  {
    Decks: DeckStackNavigator,
    NewDeck: NewDeckStack
  }
));


export default class App extends Component {
  componentDidMount() {
    setNotification()
  }

  render() {
    return <AppContainer />;

  }
}



const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
