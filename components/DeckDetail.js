import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation';
import styles from '../styles/styles'


export default class DeckDetail extends Component {

    render() {
        const { navigation } = this.props;
        console.log(navigation.state.params);

        return (
            <View style={[{ justifyContent: "center" }, styles.container]}>
                <Text style={{ fontWeight: "900", fontSize: 36, marginVertical: 10 }}> {navigation.state.params.deck.title} </Text>
                <Text style={{ marginVertical: 10, color: "green", fontSize: 18 }}>{navigation.state.params.deck.questions.length} cards</Text>
                <TouchableOpacity style={[styles.button, { borderColor: "blue", fontSize: 32 }]} onPress={() => {
                    navigation.navigate('Decks', {}, NavigationActions.navigate({ routeName: "AddCard", params: { deckName: navigation.state.params.deck.title } }))
                }}>
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { borderColor: "red", fontSize: 32 }]} onPress={() => {
                    navigation.navigate('QuizDetail', { questions: navigation.state.params.deck.questions, deckName: navigation.state.params.deck.title })
                }}>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
