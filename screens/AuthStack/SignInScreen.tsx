import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, Text } from "react-native";
import { Appbar, TextInput, Snackbar, Button } from "react-native-paper";
import { AuthStackParamList } from "./AuthStackScreen";
import { getAuth, signInWithEmailAndPassword, signInWithEmailLink } from "firebase/auth";

import { initializeApp } from 'firebase/app';

interface Props {
  navigation: StackNavigationProp<AuthStackParamList, "SignInScreen">;
}

export default function SignInScreen({ navigation }: Props) {
  /* Screen Requirements:
      - AppBar
      - Email & Password Text Input
      - Submit Button
      - Sign Up Button (goes to Sign Up screen)
      - Reset Password Button
      - Snackbar for Error Messages
  
    All UI components on this screen can be found in:
      https://callstack.github.io/react-native-paper/

    All authentication logic can be found at:
      https://firebase.google.com/docs/auth/web/starts
  */

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const dismiss = () => setVisible(false);

  

  const signIn = () => {
  setLoading(true);
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setLoading(false);
      console.log(userCredential);
    })
    .catch((error) => {
      setMessage("Incorrect");
      setVisible(true);
      setLoading(false);

    });
  };
    


    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 32,
        backgroundColor: "#ffffff",
      },
    });


  return (
    <><Appbar.Header>
        <Appbar.Content title="Sign In"/>
      </Appbar.Header>
      <SafeAreaView style={{ ...styles.container, padding: 30 }}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={(password) => setPassword(password)}
          style={{  marginBottom: 12 }}
          secureTextEntry
        />
        <Button
          mode="contained"
          onPress={signIn}
          
          style={{ marginTop: 16 }}
          loading={loading}
        >Sign in</Button>
        <Button
          onPress={()=>{navigation.navigate("SignUpScreen")}}
          style={{ marginTop: 16 }}
        >Sign Up</Button>
        <Button
          onPress={()=>{setMessage("reset email has been sent")
          setVisible(true)
        }}
          style={{ marginTop: 16 }}
        >Reset Password</Button>
        <Snackbar
          duration={2000}
          visible={visible}
          onDismiss = {dismiss}
          action={{
          label: 'Undo',
          onPress: () => {
            dismiss
          },
        }}>
        
          {message}
        </Snackbar>
      </SafeAreaView>
    </>

  ); }




