import { useState, useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { FlatList } from 'react-native';
import { PRIMARY_COLOR, BACKGROUND_COLOR } from '../assets/constant';
import * as FileSystem from 'expo-file-system';

export default function HomeScreen({ navigation }) {
  const contactJson = require('../data.json');
  const [contactList, setContactList] = useState(contactJson);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const path = `${FileSystem.documentDirectory}/data.json`;
    const data = await FileSystem.readAsStringAsync(path);
    setContactList(JSON.parse(data));
    setRefreshing(false);
  }, []);

  useEffect(() => {
    console.log('refresh');
  }, [contactList]);


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
    <View style={{backgroundColor: BACKGROUND_COLOR}}>
      <FlatList
        data={contactList}
        style={{marginHorizontal: 20}}
        renderItem={ContactListItem}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
    listItemContainer: {
      backgroundColor: '#fff',
      padding: 5,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    listItemText: {
      fontSize: 18,
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