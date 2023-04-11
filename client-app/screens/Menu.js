import { useRoute } from '@react-navigation/native'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import MenuCard from '../components/MenuCard';
import BackGroundImage from '../components/BackGroundImage';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome';
import TrayCard from '../components/TrayCard';
import { IP } from '@env';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';


const Menu = ({ navigation }) => {
    const route = useRoute();

    const [menu, setMenu] = useState();
    const [restaurant, setRestaurant] = useState();
    const [popup, setPopup] = useState(false);
    const [TimePopup, setTimePopup] = useState(false);

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState();

    const [date, setDate] = useState(new Date());

    const setCartData = async () => {
        try {
            await AsyncStorage.setItem("cart", JSON.stringify(cart));
        } catch (e) {
            console.log("Error->", e);
        }
    }

    const getOrder = () => {
        let orderItem = new Array();
        let Tmpmenu = menu;
        for (const item in cart) {
            if (cart[item] > 0) {
                let obj = {
                    itemname: Tmpmenu[item].name,
                    price: Tmpmenu[item].price,
                    noOfItem: cart[item],
                };
                orderItem.push(obj);
            }
        }
        return orderItem;
    }
    const emptyCart = async () => {
        for (const index in cart) {
            cart[index] = 0;
        }
    }
    const confirmOrder = async () => {
        const user = JSON.parse(await AsyncStorage.getItem("userDetails"));
        console.log(user?._id);
        if (user) {
            const order = getOrder();
            if (total > 0) {
                const data = await axios.post(`http://${IP}/saveorder`, {
                    userid: user?._id,
                    orderres: restaurant?._id,
                    order: order,
                    ordertotal: total,
                });
                alert(data?.data?.message);
                await emptyCart();
                setPopup(false);
                setTotal(0);
                navigation.navigate("Order");
            } else {
                alert("Add something to your tray!");
                return;
            }
        } else {
            alert("Login requied to place an order!");
            navigation.navigate("Login");
            return;
        }
    }

    // const showTimePicker = () => {
    //     DateTimePickerAndroid.open({
    //         value: date,
    //         onChange: setDateFunc,
    //         mode: time,
    //         is24Hour: true,
    //     });
    // }

    const setDateFunc = (dt) => {
        setDate(dt);
    }

    useEffect(() => {
        let size = menu?.length;
        const tmp = Array(size).fill(0);
        setCart(tmp);
        setTotal(0);
        setCartData();
    }, [menu])

    useEffect(() => {
        setCartData();
    }, [cart])

    useEffect(() => {
        console.log("Date-->", date.getMinutes());
    }, [date])


    useEffect(() => {
        setMenu(route?.params?.restaurant?.rmenu);
        setRestaurant(route?.params?.restaurant);
        console.log(route?.params?.restaurant?.rname)
    }, [route?.params?.restaurant])

    return (
        <BackGroundImage>
            <View className='flex-1 justify-center items-center flex-col mt-4'>
                <View >
                    <Text className="font-extrabold text-3xl text-green">
                        {route?.params?.restaurant?.rname}
                    </Text>
                </View>

                <View>
                    {
                        TimePopup &&
                        <DateTimePicker
                            value={date}
                            mode={'time'}
                            display={'default'}
                            is24Hour={true}
                            onChange={setDateFunc}
                        />
                    }
                    <Text onPress={()=>setTimePopup(!TimePopup)}>Reserve a Table!</Text>
                </View>

                <View className='flex-1 items-center flex-row mt-4'>
                    <ScrollView>
                        {
                            menu ?
                                menu.map((ele, index) => {
                                    return <MenuCard key={index} index={index} image={ele.image} name={ele.name} type={ele.type} des={ele.des} price={ele.price} cart={cart} setCart={setCart} total={total} setTotal={setTotal} />
                                })
                                :
                                <></>
                        }
                    </ScrollView>
                </View>

            </View>

            {
                popup ?
                    <View className="h-[75%] bg-offwhite transition ease-in-out delay-150 shadow">
                        <View className="flex justify-between items-center flex-row m-4">
                            <Text className="font-bold text-2xl ">Your Tray</Text>
                            <TouchableOpacity>
                                <Icon name="close" size={24} color="#900" onPress={() => setPopup(false)} />
                            </TouchableOpacity>
                        </View>

                        <View className="m-4 ml-auto">
                            <Text className="text-lg font-extrabold text-dark">Total : {total}₹</Text>
                        </View>

                        <ScrollView>
                            {
                                menu && Object.keys(menu).length > 0 &&
                                menu.map(({ _id, name, des, price, image }, index) => {
                                    if (cart[index] !== 0) {
                                        return (<TrayCard key={index} index={index} id={_id} name={name} des={des} price={price} image={image} cart={cart} setCart={setCart} total={total} setTotal={setTotal} />);
                                    }
                                })
                            }
                        </ScrollView>

                        <TouchableOpacity className="justify-center items-center bg-green opacity-50" onPress={confirmOrder}>
                            <Text className="font-bold text-2xl py-2">Confirm Order</Text>
                        </TouchableOpacity>

                    </View>
                    :
                    <View>
                        <TouchableOpacity className="justify-center items-center bg-green opacity-50" onPress={() => setPopup(!popup)}>
                            <Text className="font-bold text-2xl py-2">TRAY</Text>
                        </TouchableOpacity>
                    </View>
            }
        </BackGroundImage>
    )
}

export default Menu