import { StyleSheet, Platform} from 'react-native';

export const ControlAwakeStyle = StyleSheet.create({
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
            marginTop: 5,
            marginLeft: 20,
            paddingRight: '57%'
          },
          android: {
            marginTop: 5,
            marginLeft: 20,
            paddingRight: '48%'
          },
        }),
      },
      imageHeader: {
        ...Platform.select({
          ios: {
            flex: 1,
            justifyContent: 'center',
            resizeMode: 'cover',
          },
          android: {
            flex: 1,
            justifyContent: 'center',
            resizeMode: 'cover',
          },
        }),
        width: '100%'
      },
      containerHeader: {
        width: '90%',
        marginTop: '15%'
      },
      textHeaderName: {
        fontWeight: "600",
        fontSize: 18,
        lineHeight: 33,
        textAlign: 'right',
      },
      textHeader: {
        fontWeight: "700",
        fontSize: 25,
        lineHeight: 33,
        textAlign: 'right',
      },
      containerObject: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
      },
      rowBlock: {
        flexDirection: 'row'
      },
      rowText: {
        ...Platform.select({
          ios: {
            fontWeight: "600",
            fontSize: 18,
            lineHeight: 20,
            color: '#000000',
            paddingTop: 10
          },
          android: {
            fontWeight: "600",
            fontSize: 18,
            lineHeight: 20,
            color: '#000000',
            paddingTop: 10
          },
        }),
      },
      rowButton: {
        
        ...Platform.select({
          ios: {
            backgroundColor: '#43B6E8',
            color: 'white',
            paddingHorizontal: 14,
            paddingVertical: 7,
            borderRadius: 10,
            marginLeft: '50%' 
          },
          android: {
            backgroundColor: '#43B6E8',
            color: 'white',
            paddingHorizontal: 14,
            paddingVertical: 7,
            borderRadius: 10,
            marginLeft: '40%' 
          },
        }),   
      },
      rowTextObject: {
        ...Platform.select({
          ios: {
            fontWeight: "400",
            fontSize: 18,
            lineHeight: 20,
            color: '#565555',
          },
          android: {
            fontWeight: "400",
            fontSize: 16,
            lineHeight: 20,
            color: '#565555',
          },
        }),
      },
      rowTime: {
        
        ...Platform.select({
          ios: {
            fontWeight: "400",
            fontSize: 20,
            lineHeight: 20,
            color: '#565555',
            paddingRight: 5,
            marginTop: 10
          },
          android: {
            fontWeight: "400",
            fontSize: 16,
            lineHeight: 20,
            color: '#565555',
            paddingRight: 5,
            marginTop: 10
          },
        }),
      },
      containerReport: {
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
      },
      rowButtonActive: {
        ...Platform.select({
          ios: {
            backgroundColor: '#43B6E8',
            color: 'white',
            paddingHorizontal: 14,
            paddingVertical: 7,
            borderRadius: 10,
            marginLeft: '61%' 
          },
          android: {
            backgroundColor: '#43B6E8',
            color: 'white',
            paddingHorizontal: 14,
            paddingVertical: 7,
            borderRadius: 10,
            marginLeft: '55%' 
          },
        }),
      },
      buttonStartStop: {
        
        ...Platform.select({
          ios: {
            marginTop: '10%',
            width: '80%'
          },
          android: {
            marginTop: '10%',
            width: '80%'
          },
        }),
      },
      buttonStart: {
        ...Platform.select({
          ios: {
            backgroundColor: '#43B6E8',
            color: 'white',
            paddingHorizontal: 24,
            paddingVertical: 15,
            borderRadius: 10,
            width: '100%',
            alignItems: 'center',
          },
          android: {
            backgroundColor: '#43B6E8',
            color: 'white',
            paddingHorizontal: 24,
            paddingVertical: 15,
            borderRadius: 10,
            width: '100%',
            alignItems: 'center',
          },
        }),
      },
      buttonStop: {
        ...Platform.select({
          ios: {
            backgroundColor: '#E84343',
            color: 'white',
            paddingHorizontal: 24,
            paddingVertical: 15,
            borderRadius: 10,
            width: '100%',
            alignItems: 'center',
          },
          android: {
            backgroundColor: '#E84343',
            color: 'white',
            paddingHorizontal: 24,
            paddingVertical: 15,
            borderRadius: 10,
            width: '100%',
            alignItems: 'center',
          },
        }),
      },
      textStartStop: {
        color: 'white',
        fontWeight: "700",
        fontSize: 18,
        lineHeight: 22,
      },

      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      textHeaderModale: {
        fontWeight: "700",
        fontSize: 25,
        lineHeight: 33,
        color: '#023241',
        textAlign: 'center'
      },
      imageModal: {
        ...Platform.select({
          ios: {
            resizeMode: 'stretch',
            width: '100%',
          },
          android: {
            resizeMode: 'stretch',
            width: '100%',
          },
        }),
      },
      buttonModal: {
        ...Platform.select({
          ios: {
            backgroundColor: '#E84343',
            color: 'white',
            paddingHorizontal: 24,
            paddingVertical: 15,
            borderRadius: 10,
            width: '70%',
            alignItems: 'center',
          },
          android: {
            backgroundColor: '#E84343',
            color: 'white',
            paddingHorizontal: 24,
            paddingVertical: 15,
            borderRadius: 10,
            width: '70%',
            alignItems: 'center',
          },
        }),
      },
    });