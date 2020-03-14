import React from 'react';
import { View, Button } from 'react-native';
import { useAuth } from '../contexts/auth';

function ProfileScreen() {
  const {
    authValues: { signOut },
  } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title={'Log Out'} onPress={signOut} />
    </View>
  );
}

export default ProfileScreen;
