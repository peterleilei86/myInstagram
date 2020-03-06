import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Dividor() {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={{ color: '#fff', fontSize: 14, marginHorizontal: 20 }}>
        {' '}
        OR{' '}
      </Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  line: {
    width: '40%',
    height: 1,
    backgroundColor: '#fff',
  },
});

export default Dividor;
