/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../components/Logo';
import Form from '../../components/Form';
import Dividor from '../../components/Dividor';
import Fb from '../../components/Fb';
import { TouchableOpacity } from 'react-native-gesture-handler';

function AuthScreen() {
  return (
    <LinearGradient
      colors={['#A21391', '#CD106A', '#D82851', '#E95634', '#F8A64D']}
      style={styles.linearGradinet}
    >
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <View style={styles.formContainer}>
        <Form />
      </View>
      <View style={styles.dividor}>
        <Dividor />
      </View>
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop: 30,
        }}
      >
        <Fb />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 200,
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontSize: 12 }}>
          Don't have an account?
        </Text>
        <TouchableOpacity activeOpacity={0.5}>
          <Text
            style={{
              color: '#fff',
              fontSize: 10,
              textDecorationLine: 'underline',
              marginLeft: 5,
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradinet: {
    flex: 1,
    paddingHorizontal: 40,
  },
  logoContainer: {
    height: 65,
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  formContainer: {
    marginTop: 100,
  },
  dividor: {
    marginTop: 50,
  },
});

export default AuthScreen;
