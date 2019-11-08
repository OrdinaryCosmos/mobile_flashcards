import React, { Component } from 'react'
import { Text, View, TextInput, AsyncStorage, TouchableOpacity } from 'react-native'
import { NavigationEvents } from 'react-navigation';
import styles from '../styles/styles';


export default class AddCard extends Component {
    state = { question: "", answer: "", errorMsg: "", successMsg: "" }


    addNewCard = async () => {
        const { question, answer } = this.state;

        if (question === "" || answer === "") {
            this.setState({ errorMsg: "the question and the answer cannot be empty", successMsg: "" })
            return
        }

        const { deckName } = this.props.navigation.state.params;
        try {
            let oldDeckCards = JSON.parse(await AsyncStorage.getItem(deckName));

            let newDeckCards = { title: oldDeckCards.title, questions: [...oldDeckCards.questions, { question, answer }] }
            await AsyncStorage.setItem(deckName, JSON.stringify(newDeckCards));
            this.setState({ successMsg: "a new card has been added to the deck", question: "", answer: "", errorMsg: "" })

        } catch (error) {
            console.log(error);
            this.setState({ errorMsg: "something went wrong", successMsg: "" })
        }
    }
    render() {
        const { deckName } = this.props.navigation.state.params;

        return (
            <View style={styles.container}>

                <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 100 }}>Add a question to deck "{deckName}"</Text>
                <Text>Write the question</Text>
                <TextInput style={styles.textInput} value={this.state.question} onChangeText={newval => { this.setState({ question: newval.trim() }) }} />
                <Text>Write the correct answer</Text>
                <TextInput style={styles.textInput} value={this.state.answer} onChangeText={newval => { this.setState({ answer: newval.trim() }) }} />
                <Text style={{ color: "red" }}>{this.state.errorMsg}</Text>
                <Text style={{ color: "green" }}>{this.state.successMsg}</Text>
                <TouchableOpacity style={[styles.button, { borderColor: "blue" }]} onPress={this.addNewCard}><Text > submit </Text></TouchableOpacity>

            </View>
        )
    }
}
