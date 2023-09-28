import { StyleSheet, Platform} from 'react-native';

export const ControlRoutStyle = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      },
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      backIcon: {
        ...Platform.select({
          ios: {
    
          },
          android: {
          
          },
        }),
      },
    });