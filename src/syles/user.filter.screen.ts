import { StyleSheet, Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
    header: {
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'royalblue',
    },
    totalUsers: {
        color: '#fff',
        padding: 15
    },
    filtersButton: {
        color: '#fff',
        padding: 15
    },
    usersList: {
        height: deviceHeight - 70,
    },
    renderItem: {
        marginHorizontal: 15,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    avatarView: {
        flexDirection: 'row'
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    sexImage: {
        width: 10,
        height: 10,
        position: 'absolute',
        left: 0,
        bottom: -5,
    },
    status: {
        width: 10,
        height: 10,
        borderRadius: 50,
        position: 'absolute',
        right: 2,
        top: 2
    },
    nameText: {
        fontWeight: 'bold',
        marginLeft: 10,
    },
    modalHeader: {
        height: 50,
        backgroundColor: 'royalblue',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalTitle: {
        color: '#fff'
    },
    closeButton: {
        position: 'absolute',
        right: 0,
    },
    closeButtonColor: {
        color: '#fff'
    },
    filters: {
        height: 61,
        width: deviceWidth,
        backgroundColor: 'rgba(65,105,255,0.9)',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'absolute',
        top: 50,
        zIndex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    filter: {
        width: deviceWidth - 30,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    textInput: {
        width: deviceWidth - 100,
        backgroundColor: '#fff',
        color: '#000',
        fontSize: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    textInputAge: {
        width: (deviceWidth - 40) / 3
    },
    applyButton: {
        paddingVertical: 15,
        backgroundColor: 'royalblue',
        alignItems: 'center',
        width: deviceWidth,
        position: 'absolute',
        bottom: 0
    },
    applyColor: {
        color: '#fff'
    },
    filterImg: {
        height: 30,
        width: 30
    },
    mrRight15: {
        marginRight: 15
    },
    submenu: {
        width: deviceWidth,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    searchInput: {
        width: deviceWidth - 30,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    ageInput: {
        width: deviceWidth - 30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    colorWhite: {
        color: '#fff'
    },
    mrLeft15: {
        marginLeft: 15
    },

})