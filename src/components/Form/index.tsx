import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ActivityIndicator,
} from 'react-native';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { useAuth } from '../../contexts/auth';

type FormProps = {
  email: string;
  password: string;
};

function Form() {
  const [{ email, password }, setValues] = useState<FormProps>({
    email: '',
    password: '',
  });
  const [show, setShow] = useState(false);
  const [masked, setMasked] = useState('');
  const {
    isLoading,
    authValues: { signIn },
  } = useAuth();

  const handlePasswordChnage = (text: string) => {
    const letter = text.slice(-1);
    setValues(prev => ({ ...prev, password: prev.password + letter }));
    setMasked(prev => prev + '*');
  };

  const handleSignIn = () => {
    if (email && password) {
      signIn(email, password);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#D8D8D8"
        value={email}
        style={styles.input}
        onChangeText={text => setValues(prev => ({ ...prev, email: text }))}
      />
      <View style={{ position: 'relative', width: '100%' }}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#D8D8D8"
          value={show ? password : masked}
          style={styles.input}
          onChangeText={handlePasswordChnage}
        />
        <View style={{ position: 'absolute', right: 10, top: 13, zIndex: 2 }}>
          <TouchableOpacity onPress={() => setShow(prev => !prev)}>
            <Text style={{ color: '#D8D8D8', fontSize: 12 }}>
              {show ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ width: '100%', justifyContent: 'center' }}>
        <TouchableHighlight
          underlayColor="#0C82F0"
          onPress={handleSignIn}
          style={styles.button}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={{ color: '#fff' }}>Sign In</Text>
          )}
        </TouchableHighlight>
      </View>
      <View>
        <Text style={{ color: '#fff', fontSize: 10 }}>
          Forgot your login details? Get help.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    height: 40,
    backgroundColor: '#3897F0',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderRadius: 5,
    width: '100%',
    paddingLeft: 5,
    paddingVertical: 3,
    fontSize: 12,
    backgroundColor: '#fff',
    color: '#7C7B7B',
  },
});

export default Form;
