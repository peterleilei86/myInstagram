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

const validateEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return regex.test(email.toLowerCase());
};

type FormProps = {
  email: string;
  password: string;
  error: string | null;
};

function Form() {
  const [{ email, password, error }, setValues] = useState<FormProps>({
    email: '',
    password: '',
    error: null,
  });
  const [show, setShow] = useState(false);
  const [masked, setMasked] = useState('');
  const {
    isLoading,
    authValues: { signIn },
  } = useAuth();

  const handlePasswordChange = (text: string) => {
    setValues(prev => ({ ...prev, error: null }));
    if (password.length > text.length) {
      // deleting
      setValues(prev => ({ ...prev, password: text }));
      setMasked(prev => prev.slice(1));
    } else {
      const letter = text.slice(-1);
      setValues(prev => ({ ...prev, password: prev.password + letter }));
      setMasked(prev => prev + '*');
    }
  };

  const validateFields = () => {
    if (email.length === 0) {
      setValues(prev => ({ ...prev, error: 'Email cannot be empty' }));
    } else if (!validateEmail(email)) {
      setValues(prev => ({ ...prev, error: 'Please enter a valid email' }));
    } else if (password.length === 0) {
      setValues(prev => ({ ...prev, error: 'Password cannot be empty' }));
    } else if (password.length < 8) {
      setValues(prev => ({
        ...prev,
        error: 'Password must be at least 8 characters',
      }));
    } else {
      return true;
    }
  };

  const handleSignIn = () => {
    if (validateFields()) {
      signIn({ email, password });
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{ height: 40, backgroundColor: 'transparent', width: '100%' }}
      >
        {error && (
          <View style={styles.error}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>
      <TextInput
        placeholder="example@gmail.com"
        placeholderTextColor="#D8D8D8"
        value={email}
        style={styles.input}
        onChangeText={text =>
          setValues(prev => ({ ...prev, email: text, error: null }))
        }
      />
      <View style={{ position: 'relative', width: '100%' }}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#D8D8D8"
          value={show ? password : masked}
          style={styles.input}
          onChangeText={handlePasswordChange}
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
    height: 250,
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
  error: {
    height: 40,
    borderRadius: 5,
    width: '100%',
    paddingLeft: 5,
    paddingVertical: 3,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
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
