import { Text, View, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About screen</Text>
      <View style={styles.flexContainer}>
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 44,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  flexContainer:{
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box:{
    width: 110,
    height: 110,
    backgroundColor: '#4b81f5',
    margin: 10,
    borderWidth: 5,
    borderStyle: 'dashed', // Note: 'solid' is default, but good to keep explicitly
    borderColor: '#fff' 
  }
});
