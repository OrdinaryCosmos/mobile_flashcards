import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, AsyncStorage } from 'react-native'
import newLinking from 'expo/build/Linking/Linking';
import styles from '../styles/styles'


export default class NewDeck extends Component {

    state = { deckName: "", errorMsg: "" }

    submitNewDeck = async () => {

        const newDeckName = this.state.deckName;
        if (newDeckName !== "") {
            try {
                const prevSameDeck = await AsyncStorage.getItem(newDeckName);
                if (prevSameDeck === null) {

                    AsyncStorage.setItem(newDeckName, JSON.stringify({ questions: [], title: newDeckName }));
                    this.props.navigation.navigate('AddCard', { deckName: newDeckName })
                } else {
                    this.setState({ errorMsg: "The deck already exists" })
                }
            } catch (e) {
                this.setState({ errorMsg: "something went wrong" })
            }
        } else {
            this.setState({ errorMsg: "Please input a valid name for the new deck" })
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontWeight: "bold" }}> What is the title of your new deck </Text>
                <TextInput style={styles.textInput} onChangeText={newvalue => this.setState({ deckName: newvalue })} value={this.state.deckName} />
                <Text>{this.state.errorMsg}</Text>
                <TouchableOpacity style={[styles.button, { borderColor: "blue" }]} onPress={this.submitNewDeck}>
                    <Text >
                        submit
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
