import { StyleSheet, Platform} from 'react-native';

export const GetStartStyle = StyleSheet.create({
    main: {
        flex: 1,
      },
      imageBackground: {
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'cover',
      },

      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    

      imageLogin: {
        ...Platform.select({
          ios: {
            flex: 1, 
            resizeMode: 'contain',
            marginTop: '70%',
          },
          android: {
            flex: 1, 
            resizeMode: 'contain',
            marginTop: '60%',
          },
        }),
      },
      textTitle: {
        ...Platform.select({
          ios: {
            fontSize: 15,
            color: '#565555',
            lineHeight: 20,
            textAlign: 'center',
            width: '60%',          
          },
          android: {
            fontSize: 13,
            color: '#565555',
            lineHeight: 20,
            textAlign: 'center',
            width: '60%',
          },
        }),
      },
      
      loginButtonContainer: {
        width: '70%',
      },

      buttonGetStart: {
        ...Platform.select({
          ios: {
            backgroundColor: '#43B6E8',
            color: 'white',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 5,
            width: '100%',
            alignItems: 'center',
            marginTop: '30%',
          },
          android: {
            backgroundColor: '#43B6E8',
            color: 'white',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 5,
            width: '100%',
            alignItems: 'center',
            marginTop: '20%',
          },
        }),
      },

      buttonText: {
        ...Platform.select({
          ios: {
            color: 'white',
            fontWeight: 'bold',
            fontSize:16,

          },
          android: {
            color: 'white',
            fontWeight: 'bold',
            fontSize:16,
          },
        }),
      },

      textLogin: {
        ...Platform.select({
          ios: {
            fontSize: 17,
            color: '#565555',
            lineHeight: 20,
            textAlign: 'center',
            width: '70%',
            marginTop: '5%',

          },
          android: {
            fontSize: 14,
            color: '#565555',
            lineHeight: 20,
            textAlign: 'center',
            width: '70%',
            marginTop: '10%',
          },
        }),
      },

      textLoginButton: {
        ...Platform.select({
          ios: {
            color: '#43B6E8',
          },
          android: {
            color: '#43B6E8',
          },
        }),
      },
});