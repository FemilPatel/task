import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {gyms} from './data';
import Dumbbell from './src/img/dumbbell.svg';
import Maps from './src/img/map.svg';
import Search from './src/img/search.svg';
import Aerobics from './src/img/aerobics.svg';
import Box from './src/img/box.svg';
import Children_selection from './src/img/children_selection.svg';
import Dances from './src/img/dances.svg';
import Gym from './src/img/gym.svg';
import Run from './src/img/run.svg';
import Swimming from './src/img/swimming.svg';
import Yoga from './src/img/yoga.svg';
import Wrestling from './src/img/wrestling.svg';
import Location from './src/img/location.svg';
import Watch from './src/img/watch.svg';

const App = () => {
  const imgs = [
    {img: Aerobics},
    {img: Box},
    {img: Children_selection},
    {img: Dances},
    {img: Gym},
    {img: Run},
    {img: Swimming},
    {img: Yoga},
    {img: Wrestling},
  ];
  let url =
    'https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg';
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    setData(gyms);
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (favoriteList.length > 0) {
      storeUser(favoriteList);
    } else {
      if (favoriteList.length === 0) {
        storeUser(favoriteList);
      }
    }
  }, [favoriteList]);

  useEffect(() => {
    let results1 = [];
    if (data.length >= 0) {
      results1 = data.map(d => {
        return d.popular_clasess;
      });
    }
    let newData = results1.flat();
    setList(newData);
  }, [data]);

  const storeUser = async value => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');

      let data = JSON.parse(userData);
      if (userData.length > 0) {
        setFavoriteList(data);
      } else {
        setFavoriteList([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ifExists = value => {
    if (favoriteList?.filter(item => item.id === value.id).length > 0) {
      return true;
    }
    return false;
  };

  const onFavorite = value => {
    setFavoriteList([...favoriteList, value]);
  };

  const onRemoveFavorite = value => {
    const filteredList = favoriteList.filter(item => item.id !== value.id);
    setFavoriteList(filteredList);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f2f2f7',
      }}>
      <View
        style={{
          backgroundColor: '#3173c2',
          height: '7%',
          width: '100%',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '50%',
            paddingLeft: 10,
            justifyContent: 'center',
          }}>
          <Dumbbell width={28} height={28} />
        </View>
        <View
          style={{
            width: '50%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            justifyContent: 'space-between',
          }}>
          <Maps width={28} height={28} />
          <Search width={28} height={28} />
          <View
            style={{
              height: '100%',
              borderRadius: 30,
              overflow: 'hidden',
            }}>
            <Image
              style={{height: 35, width: 35}}
              source={{
                uri: url,
              }}
            />
          </View>
        </View>
      </View>
      <Text
        style={{
          color: '#000000',
          fontWeight: '700',
          fontSize: 20,
          marginLeft: 10,
          marginVertical: 10,
        }}>
        {' '}
        Recommended Gyms
      </Text>
      <View>
        <FlatList
          scrollEnabled={true}
          bounces={false}
          horizontal
          data={data}
          contentContainerStyle={{
            paddingHorizontal: 10,
            backgroundColor: '#f2f2f7',
            paddingBottom: 5,
          }}
          renderItem={({item, index}) => {
            // setMainIds(item.id);
            return (
              <View>
                <View
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    overflow: 'hidden',
                  }}>
                  <Image
                    style={{height: 100, width: 200, alignContent: 'center'}}
                    source={require('./src/img/map.png')}
                    // resizeMode="stretch"
                  />
                </View>
                <View
                  style={{
                    paddingHorizontal: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 60,
                  }}>
                  <View
                    style={{
                      width: 200,
                      // alignItems: 'center',
                      borderTopLeftRadius: 10,
                      overflow: 'hidden',
                      borderTopRightRadius: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        ifExists(item)
                          ? onRemoveFavorite(item)
                          : onFavorite(item)
                      }
                      style={{
                        position: 'absolute',
                        zIndex: 999,
                        right: 10,
                        top: 10,
                      }}>
                      <Entypo
                        name={ifExists(item) ? 'heart' : 'heart-outlined'}
                        color={'#FF55BB'}
                        size={30}
                      />
                    </TouchableOpacity>
                    <Image
                      source={
                        item.title === 'Gym Rebel'
                          ? require('./src/img/gym_rebel.png')
                          : require('./src/img/gym_non_stop.png')
                      }
                      style={{
                        width: '100%',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: 200,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,

                      elevation: 3,
                      backgroundColor: '#fff',
                      borderBottomRightRadius: 10,
                      borderBottomLeftRadius: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 10,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '500',
                          fontSize: 17,
                        }}>
                        {item.title}
                      </Text>
                      <View>
                        <Text
                          style={{
                            color: '#3f7cc6',
                            fontWeight: '500',
                            fontSize: 15,
                          }}>
                          {item.price}
                        </Text>
                        <Text
                          style={{
                            color: '#aaaaaa',
                            fontWeight: '500',
                            fontSize: 12,
                          }}>
                          /day
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: 10,
                        marginVertical: 8,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <FontAwesome name="star" size={20} color="#ff8c00" />
                        <Text> </Text>
                        <Text style={{color: '#000'}}>{item.rating}</Text>
                      </View>
                      <Text style={{color: '#000', fontSize: 11}}>
                        {item.date}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
      <Text
        style={{
          color: '#000',
          fontSize: 20,
          fontWeight: '700',
          marginLeft: 10,
          marginVertical: 10,
        }}>
        {' '}
        Popular clasess
      </Text>
      <View style={{marginBottom: 10}}>
        <FlatList
          data={imgs}
          scrollEnabled
          horizontal
          contentContainerStyle={{flexGrow: 1, paddingHorizontal: 10}}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: index % 2 == 0 ? '#3173c2' : '#ffffff',
                  height: 55,
                  width: 55,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 5,
                }}>
                <item.img fill="black" width={40} height={40} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <FlatList
        data={list}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          return (
            <View
              key={item.id}
              style={{
                backgroundColor: '#FFF',
                marginHorizontal: 20,
                marginVertical: 5,
                flexDirection: 'row',
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 100,
                  width: 100,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    ifExists(item) ? onRemoveFavorite(item) : onFavorite(item)
                  }
                  style={{
                    position: 'absolute',
                    zIndex: 999,
                    right: 5,
                    top: 5,
                  }}>
                  <Entypo
                    name={ifExists(item) ? 'heart' : 'heart-outlined'}
                    color={'#FF55BB'}
                    size={25}
                  />
                </TouchableOpacity>
                <Image
                  style={{height: '100%', width: '100%'}}
                  resizeMode="contain"
                  source={
                    item.title === 'Fitness Class'
                      ? require('./src/img/fitness_class.png')
                      : item.title === 'Fitness with some friends'
                      ? require('./src/img/fitness_with_some_friends.png')
                      : item.title === 'Yoga Class'
                      ? require('./src/img/yoga_class.png')
                      : require('./src/img/crossfit_class.png')
                  }
                />
              </View>
              <View style={{marginHorizontal: 5}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // alignItems: 'center',
                    // marginHorizontal: 5,
                    marginTop: 5,
                  }}>
                  <Text
                    numberOfLines={2}
                    style={{
                      color: '#000',
                      fontWeight: '500',
                      fontSize: 17,
                      width: '60%',
                    }}>
                    {item.title}
                  </Text>
                  <View>
                    <Text
                      style={{
                        color: '#3f7cc6',
                        fontWeight: '500',
                        fontSize: 15,
                      }}>
                      {item.price}
                    </Text>
                    <Text
                      style={{
                        color: '#aaaaaa',
                        fontWeight: '500',
                        fontSize: 12,
                      }}>
                      /day
                    </Text>
                  </View>
                </View>
                <Text style={{fontSize: 15, color: '#b5b5b5'}}>
                  Gym "seven"
                </Text>
                <View style={{justifyContent: 'center'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Location height={15} width={15} />
                    <Text
                      style={{fontSize: 13, color: '#aaaaaa', marginLeft: 5}}>
                      {item.location}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Watch height={15} width={15} />
                    <Text
                      style={{fontSize: 13, color: '#aaaaaa', marginLeft: 5}}>
                      {item.time}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default App;
