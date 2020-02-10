import React, { Component } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    View,
} from 'react-native'

export default class Loader extends Component {

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#00bbd3" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})