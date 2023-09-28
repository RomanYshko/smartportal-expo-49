import { StyleSheet, Platform} from 'react-native';

export const LogidinStyle = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    welcomeText: {
      ...Platform.select({
        ios: {
          color: '#023241',
          fontSize: 25,
          marginBottom: 5,
          lineHeight: 33,
          fontWeight: "600"
        },
        android: {
          color: '#023241',
          fontSize: 25,
          marginBottom: 5,
          lineHeight: 33,
          fontWeight: "600"
        },
      }),
    },
    imageStyle: {
      ...Platform.select({
        ios: {
          resizeMode: 'contain', 
          marginBottom: 20,
          marginTop: '20%'
        },
        android: {
          resizeMode: 'contain', 
          marginBottom: 20,
          marginTop: '25%'
        },
      }),
    },
    label: {
      ...Platform.select({
        ios: {
          fontWeight: 400,
          fontSize: 16,
          lineHeight: 20,
          color: '#BBBCBF',
          paddingBottom: 5,
        },
        android: {
          fontWeight: "400",
          fontSize: 16,
          lineHeight: 20,
          color: '#BBBCBF',
          paddingBottom: 5,
        },
      }),
    },
    labelEmail: {
      ...Platform.select({
        ios: {
          marginRight: 235
        },
        android: {
          marginRight: 215
        },
      }),
    },
    labelPassword: {
      ...Platform.select({
        ios: {
          marginRight: 210
        },
        android: {
          marginRight: 180
        },
      }),
    },
    inputAuth: {
      ...Platform.select({
        ios: {
          borderRadius: 5,
          paddingLeft: 15,
          paddingRight: 15,
          marginBottom: 15,
          width: '70%',
          height: 50,
          backgroundColor: '#F4F4F4',
        },
        android: {
          borderRadius: 5,
          paddingLeft: 15,
          paddingRight: 15,
          marginBottom: 15,
          width: '70%',
          height: 50,
          backgroundColor: '#F4F4F4',
        },
      }),
    },
    passwordToggle: {
      ...Platform.select({
        ios: {
          marginTop: -52,
          marginLeft: '55%',
          marginBottom: 30
        },
        android: {
          marginTop: -52,
          marginLeft: 230,
          marginBottom: 30
        },
      }),
    },
    loginButtonContainer: {
      ...Platform.select({
        ios: {
          width: '70%',
        },
        android: {
          width: '70%',
        },
      }),
    },
    loginButton: {
      ...Platform.select({
        ios: {
          backgroundColor: '#43B6E8',
          color: 'white',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 5,
          width: '100%',
          alignItems: 'center',
          marginBottom: 30,
          marginTop: 15
        },
        android: {
          backgroundColor: '#43B6E8',
          color: 'white',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 5,
          width: '100%',
          alignItems: 'center',
          marginBottom: 30,
          marginTop: 10
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
    errorText: {
      ...Platform.select({
        ios: {
          color: 'red',
          fontSize: 16,
          marginBottom: 1
        },
        android: {
          color: 'red',
          fontSize: 16,
          marginBottom: 10,
        },
      }), 
    },

    forgetPassword: {
      ...Platform.select({
        ios: {
          fontWeight: 400,
          fontSize: 16,
          lineHeight: 20,
          color: '#BBBCBF',
          marginBottom: 50
        },
        android: {
          fontWeight: "400",
          fontSize: 16,
          lineHeight: 20,
          color: '#BBBCBF',
          marginBottom: '5%'
        },
      }),
    },

    textAlredyAccount: {
      ...Platform.select({
        ios: {
          fontWeight: 700,
          fontSize: 16,
          lineHeight: 20,
          color: '#565555',
          marginTop: '5%'
        },
        android: {
          fontWeight: "700",
          fontSize: 14,
          lineHeight: 20,
          color: '#565555',
          marginTop: '5%'
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
})