import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import { getDecks } from "../helper/helper";
import { NavigationEvents } from 'react-navigation';
import styles from '../styles/styles'

export default class Decks extends Component {
    state = { decks: {} }

    setDecks = async () => {
        let decks = await getDecks()
        this.setState({ decks })
    }

    render() {
        const { decks } = this.state;

        return (<View style={[styles.container, { alignItems: "stretch" }]}>
            <NavigationEvents onDidFocus={this.setDecks} />
            {Object.keys(decks).length > 0 &&
                <FlatList data={Object.keys(decks)}
                    keyExtractor={(deck) => deck}
                    renderItem={({ item: deck }) => <TouchableOpacity style={styles.listItem} onPress={() => {
                        this.props.navigation.navigate('DeckDetail', { deck: decks[deck] })
                    }}>
                        <Text style={{ fontWeight: 'bold', marginVertical: 5, fontSize: 24 }}>{decks[deck].title}</Text>
                        <Text style={{ color: "green" }}>{decks[deck].questions.length} cards</Text>
                    </TouchableOpacity>} />}
        </View>
        )
    }
}

