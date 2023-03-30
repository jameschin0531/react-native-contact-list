import { Button } from 'react-native';
import { useState } from 'react';

export default function DetailsScreen({ navigation }) {
  return (
    <Button
      title="Go back"
      onPress={() => navigation.navigate('Home')}
    />
  );
}
