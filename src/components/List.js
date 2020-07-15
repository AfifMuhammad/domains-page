import React from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function Item({ item, onPress, onDelete}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={onPress}>
          <Icon name="globe" size={30} color="grey" />
          <Text style={styles.title}>{item.domain_name}</Text>
      </TouchableOpacity>
      <View style={styles.delete} >
        <Icon name="trash-outline" size={30} color="grey" onPress={()=>onDelete(item.id)}/>
      </View>
    </View>
    
  );
}

export default function List({data, onDelete, onPress}) {
  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item item={item} onPress={() => onPress(item)} onDelete={onDelete}/>}
        keyExtractor={item => item.domain_name}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    paddingHorizontal : 10
  },
  item: {
    flexDirection:'row',
    padding: 10,
    width : '80%',
    alignItems : 'center'
  },
  title: {
    fontSize: 18,
    paddingHorizontal : 10
  },
  delete : {
    padding: 10,
    width : '20%',
    alignItems : 'center',
    justifyContent : 'flex-end'
  }
});
