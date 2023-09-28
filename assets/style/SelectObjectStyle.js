import { StyleSheet, Platform} from 'react-native';

export const SelectObjectStyle = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      },
      conteiner: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      containerTabFirst: {
        ...Platform.select({
          ios: {
            flexDirection: 'row',
            marginTop: '15%',
          },
          android: {
            flexDirection: 'row',
            marginTop: '15%'
          },
        }),
      },
      containerTabSecond: {
        ...Platform.select({
          ios: {
            flexDirection: 'row',
            marginTop: '-14%',
          },
          android: {
            flexDirection: 'row',
            marginTop: '15%'
          },
        }),
      },

      buttonActive: {
        ...Platform.select({
          ios: {
            width: '20%',
          },
          android: {
            width: '20%',
          },
        }),
      },
      buttonActiveText: {
        ...Platform.select({
          ios: {
            backgroundColor: '#43B6E8',
            height: 10,
            borderRadius: 5,
            overflow: 'hidden',
          },
          android: {
            backgroundColor: '#43B6E8',
            height: 10,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
          },
        }),
      },
      buttonActiveTextRight: {
        ...Platform.select({
          ios: {
            backgroundColor: '#43B6E8',
            height: 10,
            borderRadius: 5,
            overflow: 'hidden',
          },
          android: {
            backgroundColor: '#43B6E8',
            height: 10,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5
          },
        }),
      },
      buttonNotActive: {
        ...Platform.select({
          ios: {
            width: '20%',
          },
          android: {
            width: '20%',
          },
        }),
      },
      buttonNotActiveText: {
        ...Platform.select({
          ios: {
            backgroundColor: '#F4F4F4',
            height: 10,
            borderRadius: 5,
            overflow: 'hidden',
          },
          android: {
            backgroundColor: '#F4F4F4',
            height: 10,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5
          },
        }),
      },
      buttonNotActiveLeftText: {
        ...Platform.select({
          ios: {
            backgroundColor: '#F4F4F4',
            height: 10,
            borderRadius: 5,
            overflow: 'hidden',
          },
          android: {
            backgroundColor: '#F4F4F4',
            height: 10,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5
          },
        }),
      },
      textButtonTab: {
        ...Platform.select({
          ios: {
            fontWeight: "600",
            fontSize: 16,
            lineHeight: 20,
            color: '#43B6E8',
            paddingBottom: 30,
            marginTop: '-5%' 
          },
          android: {
            fontWeight: "600",
            fontSize: 16,
            lineHeight: 20,
            color: '#43B6E8',
            paddingBottom: 30,
            marginTop: '-5%' 
          },
        }),       
      },
      textButtonTabSecond: {
        ...Platform.select({
          ios: {
            fontWeight: "600",
            fontSize: 16,
            lineHeight: 20,
            color: '#43B6E8',
            paddingBottom: 30,
            marginTop: '3%' 
          },
          android: {
            fontWeight: "600",
            fontSize: 16,
            lineHeight: 20,
            color: '#43B6E8',
            paddingBottom: 30,
            marginTop: '3%' 
          },
        }),       
      },
      textTitle: {
        ...Platform.select({
          ios: {
            fontWeight: "600",
            fontSize: 25,
            lineHeight: 33,
            color: '#023241',
            marginBottom: 10,
          },
          android: {
            fontWeight: "600",
            fontSize: 25,
            lineHeight: 33,
            color: '#023241',
            marginBottom: 10,
          },
        }),
      },
      imageStyle: {
        ...Platform.select({
          ios: {
            resizeMode: 'contain', 
            marginBottom: 20,
            marginTop: '5%',
          },
          android: {
            resizeMode: 'contain', 
            marginBottom: 20,
            marginTop: '5%',
          },
        }),
      },
      buttonSelect: {
        ...Platform.select({
          ios: {
            width: '80%',
          },
          android: {
            width: '80%',
          },
        }),
      },
      buttonSelectView: {
        ...Platform.select({
          ios: {
            backgroundColor: '#43B6E8',
            color: 'white',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: '10%',
            width: 254,
            alignItems: 'center',
          },
          android: {
            backgroundColor: '#43B6E8',
            color: 'white',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 5,
            width: 254,
            alignItems: 'center',
          },
        }),
      },
      buttonSelectText: {
        ...Platform.select({
          ios: {
            color: 'white',
            fontWeight: "700",
            fontSize:18,
            lineHeight: 22,
          },
          android: {
            color: 'white',
            fontWeight: "700",
            fontSize:18,
            lineHeight: 22
          },
        }),
      },
      classSelectObject: {
        ...Platform.select({
          ios: {
            width: '100%',
            paddingBottom: 30,
            height: '50%',
          },
          android: {
            width: '100%',
            paddingBottom: 30,
            height: '40%',
          },
        }),
        alignItems: 'center',
        justifyContent: 'center',
      },
      classSelectObjectbutton: {
        width: 254,
      },
      classSelectObjectText: {
        ...Platform.select({
          ios: {
            backgroundColor: '#F4F4F4',
            color: '#565555',
            paddingHorizontal: 10,
            paddingVertical: 14,
            borderRadius: 10,
            overflow: 'hidden',
            width: '100%',
            alignItems: 'center',
            marginTop: 10,
            fontSize: 17,
          },
          android: {
            backgroundColor: '#F4F4F4',
            color: '#565555',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 5,
            width: '100%',
            alignItems: 'center',
            marginTop: 10,
            fontSize: 14
          },
        }),
      },
      classSelectObjectActive: {
        ...Platform.select({
          ios: {
            backgroundColor: '#E1F6FF',
            color: '#565555',
            paddingHorizontal: 10,
            paddingVertical: 14,
            borderRadius: 10,
            overflow: 'hidden',
            width: '100%',
            alignItems: 'center',
            marginTop: 10,
            fontSize: 17,
          },
          android: {
            backgroundColor: '#E1F6FF',
            color: '#565555',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 5,
            width: '100%',
            alignItems: 'center',
            marginTop: 10,
            fontSize: 14
          },
        }),
      },

      containerDot: {
        flexDirection: 'row',
        alignItems: 'flex-start', 
        width: '70%',
        marginBottom: 5, 
        marginTop: 5
      },
      dot: {
        ...Platform.select({
          ios: {
            width: 13,
            height: 13,
            backgroundColor: '#40C6FF',
            borderRadius: 5,
            marginRight: 20,
            alignSelf: 'flex-start', 
            marginTop: '3%'
          },
          android: {
            width: 13,
            height: 13,
            backgroundColor: '#40C6FF',
            borderRadius: 5,
            marginRight: 20,
            alignSelf: 'flex-start',
            marginTop: '3%' 
          },
        }),
      },
      textDot: {
        ...Platform.select({
          ios: {
            fontWeight: '400',
            fontSize: 16,
            lineHeight: 25,
            color: '#565555',
            marginTop: 0,
            width: '90%' 
          },
          android: {
            fontWeight: '400',
            fontSize: 14,
            lineHeight: 22,
            color: '#565555',
            marginTop: 0, 
            width: '80%'
          },
        }),
      },
      textGoodDay: {
        ...Platform.select({
          ios: {
            fontWeight: "500",
            fontSize: 20,
            lineHeight: 25,
            color: '#565555',
            paddingTop: '10%',
            marginBottom: '10%'
          },
          android: {
            fontWeight: "500",
            fontSize: 18,
            lineHeight: 25,
            color: '#565555',
            paddingTop: '5%',
            marginBottom: '5%'
          },
        }),
      },
      backIcon: {
        marginRight: '60%',
        marginTop: '-4.5%'
      }
});