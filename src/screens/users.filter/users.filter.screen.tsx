import React, { Component, } from 'react';
import { FlatList, Text, View, StyleSheet, Dimensions, SafeAreaView, Modal, TouchableOpacity, TextInput, Image, Picker } from 'react-native';
import GetUsersService from '../../services/get.users.service';
import { User } from '../../shared/models/user.model';
import Loader from '../../shared/components/loader';
import moment from 'moment';
import { RenderItem } from './render.item';
import DelayInput from "react-native-debounce-input";

const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;

const sexType = [
    'Female', 'Male', 'Both'
];

interface Props {

};

interface State {
    data: User[],
    filteredData: User[],
    isFilterModalVisible: boolean,
    selectedFilter: string,
    selectedSex: string,
    ageRange: {
        from: string,
        to: string,
    },
    nameSurnameValue: string,
    isLoading: boolean
}

class UsersFilter extends Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            filteredData: [],
            selectedFilter: '',
            ageRange: { from: '0', to: '100' },
            selectedSex: 'Both',
            isFilterModalVisible: false,
            nameSurnameValue: '',
            isLoading: false
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        GetUsersService.getUsers()
            .then(res => {
                this.setState({
                    data: res.data.result,
                    filteredData: res.data.result,
                    isLoading: false
                })
            });
    }

    public selectFilter(filterType: string) {
        this.setState({
            selectedFilter: filterType
        })
    }

    public _renderItem = ({ item, index }: RenderItem) => (
        <View style={[styles.renderItem, index === this.state.filteredData.length - 1 ? { borderBottomWidth: 0 } : null]}>
            <View style={styles.avatarView}>
                <View>
                    <Image style={styles.userImage} source={{ uri: 'https://img.favpng.com/2/24/4/user-profile-computer-icons-png-favpng-6CB3By2TFDKyEjfXFbx3LaRR5.jpg' }} />
                    {item.gender === 'female' ? <Image style={styles.sexImage} source={{ uri: 'https://img.icons8.com/ios/50/000000/female.png' }} /> : <Image style={styles.sexImage} source={{ uri: 'https://img.icons8.com/ios/50/000000/male.png' }} />}
                    <View style={[styles.status, item.status === 'active' ? { backgroundColor: 'green' } : null]}></View>
                </View>
                <Text style={styles.nameText}>{item.first_name} {item.last_name}</Text>
            </View>
            <Text>{+moment(new Date()).format('YYYY') - +moment(item.dob).format('YYYY')}</Text>
        </View>
    );

    public applyFilters() {
        this.filterByName();
        this.filterByAge();
        this.filterBySex();
    }

    public filterByName() {
        let newFilteredUsers = this.state.data.filter((item: User) => !(item.first_name + ' ' + item.last_name).toLowerCase().indexOf((this.state.nameSurnameValue.toLowerCase())) || this.state.nameSurnameValue === '');

        this.setState({
            filteredData: [...newFilteredUsers],
        });
    }

    private filterByAge() {
        let newFilteredUsers = this.state.filteredData.filter((item: User) =>
            +moment(new Date()).format('YYYY') -
            +moment(new Date(item.dob)).format('YYYY') <=
            +this.state.ageRange.to &&
            +moment(new Date()).format('YYYY') -
            +moment(new Date(item.dob)).format('YYYY') >=
            +this.state.ageRange.from
        );

        this.setState({
            filteredData: [...newFilteredUsers],
            isLoading: false
        });
    }

    private filterBySex() {
        let newFilteredUsers = this.state.filteredData.filter((item: User) => item.gender === this.state.selectedSex.toLowerCase() || this.state.selectedSex === 'Both');

        this.setState({
            filteredData: [...newFilteredUsers]
        });
    }

    render() {
        const {
            filteredData,
            isFilterModalVisible,
            ageRange,
            selectedFilter,
            nameSurnameValue,
            isLoading
        } = this.state;
        return (
            <SafeAreaView>
                <View style={styles.header}>
                    <Text style={styles.totalUsers}>Total: {filteredData.length}</Text>
                    <TouchableOpacity
                        onPress={() => this.setState({
                            isFilterModalVisible: !isFilterModalVisible,
                            selectedFilter: ''
                        })}
                    >
                        {!isFilterModalVisible ? <Text style={{ marginRight: 15 }}><Image style={[{ height: 30, width: 30 }]} source={{ uri: 'https://www.ifonly.com/images/io/filter%20icon_big.png' }} /></Text> :
                            <TouchableOpacity
                                style={styles.filtersButton}
                                onPress={() => this.setState({ isFilterModalVisible: !isFilterModalVisible })}
                            >
                                <Image style={{ height: 30, width: 30 }} source={{ uri: 'https://img.icons8.com/ios/40/ffffff/delete-sign.png' }} />
                            </TouchableOpacity>}
                    </TouchableOpacity>
                </View>
                {isFilterModalVisible ?
                    <View style={styles.filters}>
                        {
                            !selectedFilter && !selectedFilter ?
                                <View style={{ width: deviceWidth, flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <TouchableOpacity onPress={() => this.selectFilter('search')}><Image style={{ width: 30, height: 30 }} source={{ uri: 'https://img.icons8.com/ios/30/ffffff/search--v1.png' }} /></TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.selectFilter('age')}><Image style={{ width: 30, height: 30 }} source={{ uri: 'https://img.icons8.com/ios/30/ffffff/lifecycle--v1.png' }} /></TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.selectFilter('sex')}><Image style={{ width: 30, height: 30 }} source={{ uri: 'https://img.icons8.com/ios/30/ffffff/gender.png' }} /></TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({ selectedFilter: '', filteredData: this.state.data, isFilterModalVisible: false, nameSurnameValue: '', ageRange: { from: '', to: '' }, selectedSex: 'Both' })}><Image style={{ width: 30, height: 30 }} source={{ uri: 'https://img.icons8.com/ios/30/ffffff/clear-filters.png' }} /></TouchableOpacity>
                                </View> : selectedFilter === 'search' ?
                                    <View style={{ width: deviceWidth - 30, flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <DelayInput
                                            value={nameSurnameValue}
                                            minLength={2}
                                            onChangeText={(e) => {
                                                this.setState({
                                                    nameSurnameValue: e as string
                                                });
                                                this.applyFilters();
                                            }}
                                            delayTimeout={400}
                                            style={styles.textInput}
                                        />
                                        <TouchableOpacity
                                            style={styles.closeButton}
                                            onPress={() => this.setState({ selectedFilter: '' })}
                                        >
                                            <Image style={{ height: 30, width: 30 }} source={{ uri: 'https://img.icons8.com/ios/40/ffffff/delete-sign.png' }} />
                                        </TouchableOpacity>
                                    </View> : selectedFilter === 'age' ? <View style={{ width: deviceWidth - 30, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                        <View>
                                            <Text style={{ color: '#fff' }}>From: </Text>
                                            <DelayInput
                                                value={ageRange.from}
                                                minLength={1}
                                                onChangeText={(e) => {
                                                    this.setState({
                                                        ageRange: { from: e as string, to: ageRange.to }
                                                    })
                                                    this.applyFilters();
                                                }}
                                                delayTimeout={400}
                                                style={[styles.textInput, styles.textInputAge]}
                                            />
                                        </View>
                                        <View style={{ marginLeft: 15 }}>
                                            <Text style={{ color: '#fff' }}> To: </Text>
                                            <DelayInput
                                                value={ageRange.to}
                                                minLength={1}
                                                onChangeText={(e) => {
                                                    this.setState({
                                                        ageRange: { from: ageRange.from, to: e as string }
                                                    })
                                                    this.applyFilters();
                                                }}
                                                delayTimeout={400}
                                                style={[styles.textInput, styles.textInputAge]}
                                            />
                                        </View>
                                        <TouchableOpacity
                                            style={styles.closeButton}
                                            onPress={() => this.setState({ selectedFilter: '' })}
                                        >
                                            <Image style={{ height: 30, width: 30 }} source={{ uri: 'https://img.icons8.com/ios/40/ffffff/delete-sign.png' }} />
                                        </TouchableOpacity>
                                    </View> : <View style={styles.filter}>
                                            <Text>By sex: </Text>
                                            {sexType.map((item: string) => {
                                                return <TouchableOpacity onPress={async () => {
                                                    await this.setState({
                                                        selectedSex: item
                                                    });
                                                    this.applyFilters();
                                                }}><Text>{item}</Text></TouchableOpacity>
                                            })}
                                            <TouchableOpacity
                                                style={styles.closeButton}
                                                onPress={() => this.setState({ selectedFilter: '' })}
                                            >
                                                <Image style={{ height: 30, width: 30 }} source={{ uri: 'https://img.icons8.com/ios/40/ffffff/delete-sign.png' }} />
                                            </TouchableOpacity>
                                        </View>
                        }
                    </View> : null}

                {
                    isLoading ? <View style={styles.usersList}><Loader /></View> : filteredData.length < 1 ? <View style={{marginTop: 65, alignSelf: 'center'}}><Text>There is no results</Text></View> : < FlatList
                        style={styles.usersList}
                        data={filteredData}
                        renderItem={this._renderItem}
                    />
                }
            </SafeAreaView >
        )
    }
}

export default UsersFilter

const styles = StyleSheet.create({
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
        // paddingRight: 15
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
        paddingVertical: 20,
        paddingHorizontal: 15
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
    }
})