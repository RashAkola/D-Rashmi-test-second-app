import React, {
    Component
} from 'react';
import logo from './logo.svg';
import './App.css';
import fs from 'fs';
import speech from '@google-cloud/speech';
//var Speech = require('react-native-speech-to-text');
//var Speech = require('react-native-speech');
// import speech from 'text-to-speech';


var client = new speech.SpeechClient();
var fileName = './resources/brilliant_terrain.raw';

 class Child extends React.Component {
        render() {
            return ( < div > Listerning... < /div> );
            }
        }

        class Retry extends React.Component {
                render() {
                    return ( < button onclick = {
                            this.props.startSpeak
                        } > Re Try < /button>);
                    }
                }

                export default class App extends Component {

                    soundCall() {

                        var file = fs.readFileSync(fileName);
                        var audioBytes = file.toString('brilliant_terrain');

                        var audio = {
                            content: audioBytes,
                        };
                        var config = {
                            encoding: 'LINEAR16',
                            sampleRateHertz: 16000,
                            languageCode: 'en-US',
                        };
                        var request = {
                            audio: audio,
                            config: config,
                        };
                        client.recognize(request)
                            .then(data => {
                                var response = data[0];
                                var transcription = response.results
                                    .map(result => result.alternatives[0].transcript).join('\n');

                            })
                            .catch(err => {
                                console.error('ERROR:', err);
                            });

                    }
                    constructor(props) {
                        super(props);

                        this.state = {
                            Transcription: '',
                            isListening: false
                        }
                        this.soundCall = this.soundCall.bind(this);
                        this.startSpeak = this.startSpeak.bind(this);
                    }
                    startSpeak() {
                        let isListening = !this.state.isListening;
                        this.state = {
                            Transcription: '',
                            isListening: isListening
                        }
                        if (isListening) {
                            this.soundCall();
                            this.state = {
                                isListening: false
                            }
                        }

                    }
                    render() {

                        return ( 
                           <div >
                                < div onClick = {
                                this.startSpeak
                            } > speak now < i class = "fas fa-microphone demo" > < /i> </div > {
                                this.state.isListening ?
                                < Child / >
                                : null
                                   
                            } 
                          < h4 > {
                                this.state.Transcription
                            } </h4> {
                                (this.state.Transcription != '') ?
                                < Retry startSpeak = {
                                    this.startSpeak
                                }
                                /> 
                                : null
                               
                            } 
                           </div>

                        );
                    }
                }