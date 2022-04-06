//import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef, useCallback } from "react";
import { StyleSheet, Text, View, BackHandler, SafeAreaView, Platform } from 'react-native';
import Constants from 'expo-constants';
import { WebView } from 'react-native-webview';

export default function App() {

  const WEBVIEW = useRef();
  const [backButtonEnabled, setBackButtonEnabled] = useState(false);

  function onNavigationStateChange(navState) {
    setBackButtonEnabled(navState.canGoBack)
  };

  function onRenderLoading(){
    console.log('Loading ...');
    return ( <p>Loading</p> );
  }

  useEffect(() => {

    // Handle back event
    function backHandler() {
      if (backButtonEnabled) {
        WEBVIEW.current.goBack();
        return true;
      }
    };

    // Subscribe to back state vent
    BackHandler.addEventListener("hardwareBackPress", backHandler);

    // Unsubscribe
    return () => BackHandler.removeEventListener("hardwareBackPress", backHandler);

  }, [backButtonEnabled])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "red" }}>
      <WebView
        onNavigationStateChange={ onNavigationStateChange }
        source={{
          uri: 'https://www.voyage.mada-digital.net',
        }}
        startInLoadingState={true}
        renderLoading={ onRenderLoading }
        javaScriptEnabled={true}
        domStorageEnabled={true}
        sharedCookiesEnabled={true}
        originWhitelist={["*"]}
        scalesPageToFit={true}
        startInLoadingState={true}
        mixedContentMode={"always"}
        allowsInlineMediaPlayback={true}
        allowsFullscreenVideo={true}
        allowsBackForwardNavigationGestures={true}
        allowsLinkPreview={false}
        renderLoading={() => <></>}
        ref={WEBVIEW}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
