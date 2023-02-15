import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {selectRestaurant} from "../features/restaurantSlice";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {Feather} from "@expo/vector-icons";
import * as Progress from 'react-native-progress';
import MapView, {Marker} from 'react-native-maps'

const DeliveryScreen = () => {
    const navigation = useNavigation()
    const restaurant = useSelector(selectRestaurant)

    return (
        <View className="flex-1 bg-delivery">
            <SafeAreaView className="z-50">
                <View className="flex-row items-center justify-between p-5">
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Feather name="x" size={40} color="#FFFFFF"/>
                    </TouchableOpacity>
                    <Text className="text-lg font-light text-white">Order Help</Text>
                </View>
                <View className="z-50 mx-5 my-2 rounded-md bg-white p-6 shadow-md">
                    <View className="flex-row justify-between">
                        <View>
                            <Text className="text-lg text-gray-400">Estimated Arrival</Text>
                            <Text className="text-4xl font-bold">45-55 Minutes</Text>
                        </View>
                        <Image
                            source={{
                                uri: "https://links.papareact.com/fls"
                            }}
                            className="h-20 w-20"
                        />
                    </View>

                    <Progress.Bar animationType="spring" indeterminate={true}
                                  indeterminateAnimationDuration={2200} color="#00CCBB"/>
                    <Text className="mt-3 text-gray-500">
                        Your order at {restaurant.title} is being prepared.
                    </Text>
                </View>
            </SafeAreaView>

            <MapView
                initialRegion={
                    {
                        latitude: restaurant.lat,
                        longitude: restaurant.long,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }
                }
                className="z-0 -mt-10 flex-1"
                mapType="mutedStandard">
                <Marker
                    coordinate={{
                        latitude: restaurant.lat,
                        longitude: restaurant.long,
                    }}
                    title={restaurant.title}
                    description={restaurant.short_description}
                    identifier="origin"
                    pinColor="#00CCBB"
                >
                    <Image source={require("../assets/restaurant.png")}
                           className="h-12 w-12 rounded-md"/>
                </Marker>
            </MapView>

            <SafeAreaView className="h-28 flex-row items-center bg-white space-x-5">
                <Image
                    source={{
                        uri: "https://links.papareact.com/wru"
                    }}
                    className="ml-5 h-12 w-12 rounded-full bg-gray-300 p-4"
                />

                <View className="flex-1">
                    <Text className="text-lg">
                        LuisJo Ruano
                    </Text>
                    <Text className="text-gray-400">
                        Your rider
                    </Text>
                </View>
                <Text className="mr-5 text-xl font-bold text-delivery">
                    Call
                </Text>

            </SafeAreaView>

        </View>
    )
}

export default DeliveryScreen