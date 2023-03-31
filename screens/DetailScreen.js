import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { PRIMARY_COLOR, BACKGROUND_COLOR, LIGHT_GREY_COLOR, STANDARD_TEXT_FONT_SIZE, HEADER_FONT_SIZE } from '../assets/constant';
import * as FileSystem from 'expo-file-system';

const FormInput = ({ label, ...rest }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...rest} />
    </View>
  );
};

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

const RoundIcon = () => {
  return (
    <View style={styles.iconContainer}>
      <View style={styles.icon} />
    </View>
  );
};

export default function DetailsScreen({ route, navigation }) {
  useEffect(async () => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            writeToJsonFile('back');
            navigation.goBack();
          }}
          style={{ marginLeft: 10 }}
        >
          <Text style={styles.headerButtonText}>Cancel</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => {
            // submit();
            navigation.navigate('Home');
          }}
        >
          <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  let contactJson = require('../data.json');

  const [contactList, setContactList] = useState(contactJson);
  const [contactData, setContactData] = useState(route.params.item);

  const updateContactData = (key, value) => {
    setContactData({ ...contactData, [key]: value });
  };
  useEffect(() => {
    updateContactList();
  }, [contactData]);

  useEffect(() => {
    writeToJsonFile();
  }, [contactList]);

  const updateContactList = () => {
    const index = contactList.findIndex((item) => item.id === contactData.id);
    const updatedContactList = [...contactList];
    updatedContactList[index] = contactData;
    setContactList(updatedContactList);
  }

  const writeToJsonFile = async (type = 'save') => {
    const path = `${FileSystem.documentDirectory}/data.json`;
    let updatedData = [];
    if (type === 'back') {
      updatedData = await FileSystem.readAsStringAsync(path);
    } else {
      updatedData = JSON.stringify(contactList);
    }
    await FileSystem.writeAsStringAsync(path, updatedData);
  };
  return (
    <View style={styles.container}>
      <RoundIcon />
      <View style={styles.formContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Main Information</Text>
        </View>
        <View style={styles.formInputContainer} >
          <FormInput label="First Name" value={contactData.firstName ?? ''} onChangeText={(value) => updateContactData('firstName', value)} />
          <ItemSeparator />
          <FormInput label="Last Name" value={contactData.lastName ?? ''} onChangeText={(value) => updateContactData('lastName', value)} />
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Sub Information</Text>
        </View>
        <View style={styles.formInputContainer} >
          <FormInput label="Email" value={contactData.email ?? ''} onChangeText={(value) => updateContactData('email', value)} />
          <ItemSeparator />
          <FormInput label="Phone" value={contactData.phone ?? ''} onChangeText={(value) => updateContactData('phone', value)} />
          <ItemSeparator />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: BACKGROUND_COLOR,
  },
  formContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: LIGHT_GREY_COLOR,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: HEADER_FONT_SIZE,
    fontWeight: 500,
  },
  formInputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: STANDARD_TEXT_FONT_SIZE,
    flex: 0.3,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    fontSize: STANDARD_TEXT_FONT_SIZE,
    flex: 0.7,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: PRIMARY_COLOR,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
  headerButtonText: {
    fontSize: STANDARD_TEXT_FONT_SIZE,
    fontWeight: 500,
    color: PRIMARY_COLOR,
    marginVertical: 10,
  }
});

