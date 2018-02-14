import React from 'react';
import _ from 'lodash';
import { StyleSheet, Text, View, TextInput, Button, Share } from 'react-native';

const init = {
  title: 'Comience a escribir la historia:',
  story : [],
  text: '',
  finish: false
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = init
  }

  next() {
    const story = this._completeStory()
    const title = this._toContinue()
    const text = ""
    this.setState({title, story, text})
  }

  finish() {
    const title = this._result()
    const finish = true
    this.setState({title, finish})
  }

  reset() {
    this.setState(init)
  }

  share() {
    let shareOptions = {
      message: this._result()
    }

    return Share
    .share(shareOptions)
    .then((res) => console.log(res))
    .catch((err) => console.log({err}))
  }
  
  _toContinue() {
    return this._lastWords(2).join(' ') + '...'
  }

  _lastWords(n) {
    return _.takeRight(_.words(this.state.text), n)
  }

  _result() {
    return this._completeStory().join("... ")
  }
  
  _completeStory() {
    return this.state.story.concat(this.state.text)
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.title}</Text>
        {
          !this.state.finish 
          ? (
            <View>
              <TextInput
                style={styles.paper}
                multiline = {true}
                numberOfLines = {4}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
              />
              <View style={styles.btnGroup}>
                <Button
                  disabled = {_.isEmpty(this.state.text)}
                  onPress = {() => this.next()}
                  title = {"Continuar"}
                />
                <Button
                  onPress = {() => this.finish()}
                  title = {"Finalizar"}
                />
              </View>
            </View>)
          : (
            <View style={styles.btnGroup}>
              <Button
                onPress = {() => this.share()}
                title = {"Compartir"}
              />
              <Button
                onPress = {() => this.reset()}
                title = {"Reiniciar"}
              />
            </View>)
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    borderColor: 'gray', 
    borderWidth: 1
  },
  btnGroup: {
    flexDirection: 'row'
  }
});
