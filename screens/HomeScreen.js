import { useNavigationState } from '@react-navigation/native';
import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PRIMARY_COLOR } from '../assets/constant';
export default function HomeScreen({ navigation }) {
  const contactJson = require('../assets/data/data.json');
  const [contactList, setContactList] = useState(contactJson);
  const styles = StyleSheet.create({
    listItemContainer: {
      backgroundColor: '#fff',
      padding: 20,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    listItemText: {
      fontSize: 20,
      marginLeft: 12,
    },
    description: {
      fontSize: 16,
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: PRIMARY_COLOR,
      justifyContent: 'center',
      alignItems: 'center',
    },
    separator: {
      height: 1,
      backgroundColor: '#ddd',
    },
  });
  // component
  const ItemSeparator = () => {
    return <View style={styles.separator} />;
  };
  const RoundIcon = () => {
    return (
      <View style={styles.iconContainer}>
      </View>
    );
  };
  const ContactListItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Details', { item })}
        style={styles.listItemContainer}
      >
        <RoundIcon />
        <Text style={styles.listItemText}>{`${item.firstName} ${item.lastName}`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{backgroundColor:'#fff'}}>
      <FlatList
        data={contactList}
        style={{marginHorizontal: 20}}
        renderItem={ContactListItem}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
