import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    title: {
        fontSize: 36,
        marginBottom: 16
    },

    // READ
    separator:{
        height:1,
        backgroundColor:'gray'
    },
    item:{
        alignItems: "center",
        padding:10,
        borderBottomWidth:2,
        borderBottomColor: 'gray',
        alignSelf: 'stretch',
    },
    header: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18,
        padding: 7,
        backgroundColor:'black'
    },
    form: {
        marginTop: 100,
    },
    textLabel: {
        marginLeft: 80,
    },
    textInput: {
        textAlign: 'center',
        alignSelf: 'stretch',
        marginLeft: 80,
        margin: 5,
        marginRight: 80,

        borderBottomColor: '#000', // Add this to specify bottom border color
        borderBottomWidth: 2     // Add this to specify bottom border thickness
    },
    error:{
        color:'red',
         marginLeft: 80,
        marginBottom: 30,
    }

});