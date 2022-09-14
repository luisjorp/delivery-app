import {View, Text, SafeAreaView, Image, TextInput, ScrollView} from 'react-native'
import React, {useEffect, useLayoutEffect} from 'react'
import {useNavigation} from "@react-navigation/native";
import {Feather} from "@expo/vector-icons";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from '../sanity'

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = React.useState([]);

  //when the ui essentially loads
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, headerTitle: 'Home Screen',
    })
  }, []);

  //when the component itself so the functional component loads
  useEffect(() => {
    sanityClient.fetch(`
    *[_type == "featured"] {
      ...,
      restaurants[]->{
       ...,
       dishes[]->,
        type-> {
          name
        }
    }
    }`).then((data) => {
      setFeaturedCategories(data);
    });
  }, []);


  return (<SafeAreaView className="bg-white pt-5 flex-col">

    {/*Header*/}
    <View className="flex-row pb-3 items-center mx-4 space-x-2">
      <Image source={{uri: 'https://links.papareact.com/wru'}}
             className="h-7 w-7 bg-gray-300 p-4 rounded-full"/>
      <View className="flex-1">
        <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
        <Text className="font-bold text-xl">
          Current Location
          <Feather name="chevron-down" size={20} color="#00CCBB"/>
        </Text>
      </View>
      <Feather name="user" size={35} color="#00CCBB"/>

    </View>

    {/*Search*/}
    <View className="flex-row pb-3 items-center mx-4 space-x-2">
      <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
        <Feather name="search" size={24} color="gray"/>
        <TextInput placeholder="Restaurants and cuisines" keyboardType="default"/>
      </View>
      <Feather name="settings" size={24} color="#00CCBB"/>
    </View>

    {/*ScrollView*/}
    <ScrollView className="bg-gray-100 flex-1" contentContainerStyle={{
      paddingBottom: 100,
    }}>
      {/*Categories*/}
      <Categories/>

      {featuredCategories?.map((category) => (
        <FeaturedRow
          key={category._id}
          id={category._id}
          title={category.name}
          description={category.short_description}/>
      ))}
    </ScrollView>
  </SafeAreaView>)
}

export default HomeScreen