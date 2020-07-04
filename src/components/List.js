import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

function Item({ domain, onPress }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
        <Text style={styles.title}>{domain}</Text>
    </TouchableOpacity>
  );
}

export default function List({data, navigation}) {
  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item domain={item.domain_name} price={item.price} onPress={() => {navigation.navigate('Template1', item)}}/>}
        keyExtractor={item => item.domain_name}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    backgroundColor: '#ccc',
    padding: 20,
    borderBottomColor:'green',
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
