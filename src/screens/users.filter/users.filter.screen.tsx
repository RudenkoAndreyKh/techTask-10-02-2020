import React, { Component, } from 'react';
import { FlatList, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import GetUsersService from '../../services/get.users.service';
import { User } from '../../shared/models/user.model';
import Loader from '../../shared/components/loader';
import moment from 'moment';
import DelayInput from "react-native-debounce-input";
import { styles } from '../../syles/user.filter.screen';
import { renderItem } from './render.item';

enum sexType {
    a = 'Female',
    b = 'Male',
    c = 'Both'
}

interface Props {

};

interface State {
    data: User[],
    filteredData: User[],
    isFilterModalVisible: boolean,
    selectedFilter: string,
    selectedSex: 'Female' | 'Male' | 'Both',
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

    public applyFilters() {
        this.filterByName();
        
        
    }

    public filterByName() {
        let newFilteredUsers =
            this.state.data.filter((item: User) => !(item.first_name + ' ' + item.last_name)
                .toLowerCase()
                .indexOf((this.state.nameSurnameValue.toLowerCase())) ||
                this.state.nameSurnameValue === '');

        this.setState({
            filteredData: [...newFilteredUsers],
        }, () => this.filterByAge());
    }

    private filterByAge() {
        console.log(this.state.filteredData);
        
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
        },() => this.filterBySex());
    }

    private filterBySex() {
        let newFilteredUsers = this.state.filteredData.filter((item: User) => item.gender === this.state.selectedSex.toLowerCase() || this.state.selectedSex === 'Both');

        this.setState({
            filteredData: [...newFilteredUsers]
        });
    }

    private clearSelectedFilter = () => {
        this.setState({ selectedFilter: '' });
    }

    private clearAllFilters = () => {
        this.setState({
            selectedFilter: '',
            filteredData: this.state.data,
            isFilterModalVisible: false,
            nameSurnameValue: '',
            ageRange: { from: '', to: '' },
            selectedSex: 'Both'
        })
    }

    private closeOpenFilters = () => {
        this.setState({
            isFilterModalVisible: !this.state.isFilterModalVisible,
            selectedFilter: ''
        })
    }

    private search(value: string) {
        this.setState({
            nameSurnameValue: value
        });
        this.applyFilters();
    }

    private CloseFilter = () => {
        return <TouchableOpacity
            style={styles.closeButton}
            onPress={this.clearSelectedFilter}
        >
            <Image style={styles.filterImg} source={{ uri: 'https://img.icons8.com/ios/40/ffffff/delete-sign.png' }} />
        </TouchableOpacity>
    }

    private inputFromAge(value: string) {
        this.setState({
            ageRange: { from: value, to: this.state.ageRange.to }
        })
        this.applyFilters();
    }

    private inputToAge(value: string) {
        this.setState({
            ageRange: { from: this.state.ageRange.from, to: value }
        })
        this.applyFilters();
    }

    private selectSexType(type: "Female" | "Male" | "Both") {
        this.setState({
            selectedSex: type
        }, () => {
            this.applyFilters();
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
                        style={styles.mrRight15}
                        onPress={this.closeOpenFilters}
                    >
                        {!isFilterModalVisible ? <Image style={styles.filterImg} source={{ uri: 'https://www.ifonly.com/images/io/filter%20icon_big.png' }} /> :
                            <Image style={styles.filterImg} source={{ uri: 'https://img.icons8.com/ios/40/ffffff/delete-sign.png' }} />}
                    </TouchableOpacity>
                </View>
                {isFilterModalVisible ?
                    <View style={styles.filters}>
                        {
                            !selectedFilter && !selectedFilter ?
                                <View style={styles.submenu}>
                                    <TouchableOpacity onPress={() => this.selectFilter('search')}><Image style={styles.filterImg} source={{ uri: 'https://img.icons8.com/ios/30/ffffff/search--v1.png' }} /></TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.selectFilter('age')}><Image style={styles.filterImg} source={{ uri: 'https://img.icons8.com/ios/30/ffffff/lifecycle--v1.png' }} /></TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.selectFilter('sex')}><Image style={styles.filterImg} source={{ uri: 'https://img.icons8.com/ios/30/ffffff/gender.png' }} /></TouchableOpacity>
                                    <TouchableOpacity onPress={this.clearAllFilters}><Image style={styles.filterImg} source={{ uri: 'https://img.icons8.com/ios/30/ffffff/clear-filters.png' }} /></TouchableOpacity>
                                </View> : selectedFilter === 'search' ?
                                    <View style={styles.searchInput}>
                                        <DelayInput
                                            value={nameSurnameValue}
                                            minLength={2}
                                            onChangeText={(e) => this.search(e as string)}
                                            delayTimeout={400}
                                            style={styles.textInput}
                                        />
                                        <this.CloseFilter />
                                    </View> : selectedFilter === 'age' ? <View style={styles.ageInput}>
                                        <View>
                                            <Text style={styles.colorWhite}>From: </Text>
                                            <DelayInput
                                                value={ageRange.from}
                                                minLength={1}
                                                onChangeText={(e) => this.inputFromAge(e as string)}
                                                delayTimeout={400}
                                                style={[styles.textInput, styles.textInputAge]}
                                            />
                                        </View>
                                        <View style={styles.mrLeft15}>
                                            <Text style={styles.colorWhite}> To: </Text>
                                            <DelayInput
                                                value={ageRange.to}
                                                minLength={1}
                                                onChangeText={(e) => this.inputToAge(e as string)}
                                                delayTimeout={400}
                                                style={[styles.textInput, styles.textInputAge]}
                                            />
                                        </View>
                                        <this.CloseFilter />
                                    </View> : <View style={styles.filter}>
                                            <Text style={styles.applyColor}>By sex: </Text>
                                            <TouchableOpacity onPress={() => this.selectSexType(sexType.a)}><Text style={styles.applyColor}>{sexType.a}</Text></TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.selectSexType(sexType.b)}><Text style={styles.applyColor}>{sexType.b}</Text></TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.selectSexType(sexType.c)}><Text style={styles.applyColor}>{sexType.c}</Text></TouchableOpacity>
                                            <this.CloseFilter />
                                        </View>
                        }
                    </View> : null}

                {
                    isLoading ? <View style={styles.usersList}><Loader /></View> :
                        filteredData.length < 1 ? <View style={{ marginTop: 65, alignSelf: 'center' }}>
                            <Text>
                                There is no results

                    </Text>
                        </View> :
                            < FlatList
                                style={styles.usersList}
                                data={filteredData}
                                renderItem={({ item, index }) => renderItem(item, index, this.state.filteredData.length - 1)}
                            />
                }
            </SafeAreaView >
        )
    }
}

export default UsersFilter
