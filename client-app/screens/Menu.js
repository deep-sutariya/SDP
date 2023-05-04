import { useRoute } from '@react-navigation/native'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import MenuCard from '../components/MenuCard';
import BackGroundImage from '../components/BackGroundImage';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome';
import TrayCard from '../components/TrayCard';
import { getIP } from '../util/getIp';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';


const Menu = ({ navigation }) => {
    const route = useRoute();

    const [menu, setMenu] = useState();
    const [restaurant, setRestaurant] = useState();
    const [user, setUser] = useState();

    const [popup, setPopup] = useState(false);
    const [TimePopup, setTimePopup] = useState(false);
    const [TablePopup, setTablePopup] = useState(false);
    const [InputDateText, setInputDateText] = useState("Choose");

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState();

    const [date, setDate] = useState(new Date());
    const [people, setpeople] = useState();
    let IP;
    getIP().then((response) => {
        IP = response
    });

    const setCartData = async () => {
        try {
            await AsyncStorage.setItem("cart", JSON.stringify(cart));
        } catch (e) {
            console.log("Error->", e);
        }
    }
    const FetchUserData = async () => {
        try {
            setUser(await JSON.parse(await AsyncStorage.getItem("userDetails")));
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
        let u = await JSON.parse(await AsyncStorage.getItem("userDetails"))
        console.log("***",u?._id);
        if (u?._id) {
            const order = getOrder();
            if (total > 0) {
                const IP = await getIP();
                const data = await axios.post(`http://${IP}:5000/saveorder`, {
                    userid: u?._id,
                    orderres: restaurant?._id,
                    order: order,
                    ordertotal: total,
                });
                alert(data?.data?.message);
                await emptyCart();
                setPopup(false);
                setTotal(0);
                navigation.navigate("Orders");
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

    const setDateFunc = (event, dt) => {
        const tdate = dt || date;

        const inputobj = new Date(tdate);
        const obj = new Date();
        let inputTime = parseInt(inputobj.toTimeString().split(":").join(""));
        let Time = parseInt(obj.toTimeString().split(":").join(""));

        setTimePopup(false);

        if (inputTime > Time) {
            setDate(tdate);
            setInputDateText(inputobj.toTimeString().slice(0, 5));
        }
        else {
            alert("Selected Date must be in future");
            setDate(new Date());
            setInputDateText("Choose");
        }
    }

    const ReserveTable = async () => {
        if (user) {
            if (people > 0) {
                if (people <= 20) {
                    if (date && InputDateText !== "Choose") {
                        console.log(IP);
                        const data = await axios.post(`http://${IP}:5000/booktable`, {
                            noofpeople: people,
                            time: date.toString().split(" ")[4],
                            resid: restaurant._id,
                            userid: user?._id,
                        })
                        alert(`${user.uname}, ${data?.data}`);
                        setTablePopup(false);
                        setTimePopup(false);
                        setInputDateText("Choose");
                        setDate(new Date());
                        setpeople("");
                    }
                    else {
                        alert("Choose Time!");
                    }
                }
                else {
                    alert("Maximum 20 People allowed!");
                }
            }
            else {
                alert("enter valid People count");
            }
        }
        else {
            alert("Login First");
            navigation.navigate("Login")
        }
    }

    useEffect(() => {
        FetchUserData();
    }, []);
    useEffect(() => {
        console.log("User-->", user?.uemail);
    }, [user]);

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
        setMenu(route?.params?.restaurant?.rmenu);
        setRestaurant(route?.params?.restaurant);
        console.log(route?.params?.restaurant?.rname)
    }, [route?.params?.restaurant])

    useEffect(() => {
        if (people > 20) {
            setpeople("20");
        }
        else if (people > 0 && people <= 20 && people % 1 === 0) { }
        else {
            setpeople("");
        }
    }, [people]);

    return (
        <BackGroundImage>
            <View className='flex-1 justify-center items-center flex-col mt-4'>
                <View >
                    <Text className="font-extrabold text-3xl text-green">
                        {route?.params?.restaurant?.rname}
                    </Text>
                </View>

                <View className="flex justify-center items-center gap-y-3 my-3 w-full">
                    <TouchableOpacity className="border border-1 border-light bg-dark rounded-md py-2 px-3">
                        <Text className="font-bold text-md text-white" onPress={() => setTablePopup(!TablePopup)}>{TablePopup ? "Close" : "Reserve a Table!"}</Text>
                    </TouchableOpacity>
                    {
                        TablePopup &&
                        <View className="flex flex-col gap-y-5 w-full">
                            <View className="flex flex-row items-center justify-center">
                                <View className="w-2/6"><Text className="font-bold text-lg">Time : </Text></View>
                                <TouchableOpacity className=" py-1 px-3 w-3/12 bg-offwhite border border-1 rounded-md">
                                    <Text className="text-green font-bold text-lg underline mx-auto" onPress={() => setTimePopup(!TimePopup)}>{InputDateText}</Text>
                                </TouchableOpacity>
                            </View>
                            <View className="flex flex-row items-center justify-center">
                                <View className="w-2/6"><Text className="font-bold text-lg">People Count : </Text></View>
                                <TextInput
                                    className="text-green px-3 py-1 w-3/12 bg-offwhite font-bold text-lg border border-1 rounded-md"
                                    placeholder='Count'
                                    placeholderTextColor={'#94B49F'}
                                    inputMode='numeric'
                                    textAlign='center'
                                    value={people}
                                    onChangeText={(text) => {
                                        setpeople(text)
                                    }}
                                />
                            </View>
                            <TouchableOpacity className="bg-green rounded-md py-2 px-3 w-2/6 mx-auto items-center" onPress={ReserveTable}>
                                <Text className="font-bold text-md text-white">Submit</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        TablePopup && TimePopup &&
                        <DateTimePicker
                            value={date}
                            mode={'time'}
                            display='default'
                            is24Hour={true}
                            onChange={setDateFunc}
                            minTime
                        />
                    }
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