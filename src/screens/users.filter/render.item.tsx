import React from 'react';
import { Text, View, Image } from 'react-native';
import { User } from "../../shared/models/user.model";
import { styles } from '../../syles/user.filter.screen';
import moment from 'moment';

export function renderItem(item: User, index: number, lastItem: number) {
    return <View style={[styles.renderItem, index === lastItem ? { borderBottomWidth: 0 } : null]}>
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
}