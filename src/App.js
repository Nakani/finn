import React, { Fragment } from 'react';
import {
  SafeAreaView, ImageBackground
} from 'react-native';
import { ChatBot } from './components/bot/bot.component';


const App = () => {

  return (
    <Fragment>
      <ImageBackground
        style={{ width: '100%', height: '100%' }}
        source={{ uri: 'https://4all.com/assets/img/banner1.jpg' }}
      >
        <SafeAreaView style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)'
        }}>
          <ChatBot />
        </SafeAreaView>
      </ImageBackground>
    </Fragment>
  );
};

export default App;
