import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from '../styles/styles'

export default class QuizDetail extends Component {
    state = { currentIndex: 0, showQuestion: true, right: 0, wrong: 0 }
    answerQuestion = (result) => {
        this.setState(prevState => ({ [result]: prevState[result] + 1, currentIndex: prevState.currentIndex + 1, showQuestion: true }))
    }

    restartQuiz = () => {
        this.setState({ currentIndex: 0, showQuestion: true, right: 0, wrong: 0 })
    }
    render() {
        const { questions, deckName } = this.props.navigation.state.params;
        const { currentIndex, showQuestion, right, wrong } = this.state;
        const quizQuestion = questions[currentIndex];
        if (currentIndex < questions.length) {
            return <View style={[styles.container, { justifyContent: "space-evenly" }]}>
                <Text style={{ marginHorizontal: 25, alignSelf: "flex-start" }}>{currentIndex + 1}/{questions.length}</Text>
                <Text style={{ fontSize: 30, fontWeight: "bold" }}>{this.state.showQuestion ? quizQuestion.question : quizQuestion.answer}  </Text>
                <TouchableOpacity onPress={e => { this.setState(prevState => ({ showQuestion: !prevState.showQuestion })) }}>
                    <Text>
                        {this.state.showQuestion ? "Show me the Answer" : "Question"}
                    </Text></TouchableOpacity>
                <View style={{ alignItems: "center" }}><TouchableOpacity style={[styles.button, { borderColor: "green" },]} onPress={e => this.answerQuestion("right")}>
                    <Text>Correct</Text>
                </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { borderColor: "red" }]} onPress={e => this.answerQuestion("wrong")}>
                        <Text>Incorrect</Text>
                    </TouchableOpacity></View>

            </View >
        } else {
            return (
                <View style={styles.container}>
                    <Text>
                        Your Accuracy rate is:
                    </Text>
                    <Text>
                        {((right / questions.length) * 100).toFixed(2)} %
                    </Text>
                    <TouchableOpacity style={[styles.button, { borderColor: "green" },]} onPress={this.restartQuiz}>
                        <Text>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { borderColor: "red" }]} onPress={e => this.props.navigation.navigate('DeckDetail', { deckName })}>
                        <Text>Back to Deck</Text>
                    </TouchableOpacity>
                </View>

            )
        }
    }
}
