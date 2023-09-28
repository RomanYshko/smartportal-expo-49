import { StyleSheet} from 'react-native';

export const GlobalStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
      },
      main: {
        flex: 1,
        backgroundColor: '#e7e7e7',
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonLogutContainer: {
        width: '100%',
      },

      buttonLogut: {
        backgroundColor: 'red',
        color: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
      },
  
      textLogut: {
        color: 'white',
        fontWeight: 'bold',
        fontSize:16,
      },
});