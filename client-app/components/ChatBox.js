import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

const ChatBox = () => {
    const [message, setMessage] = useState('');
    const [showChatBox, setShowChatBox] = useState(false);

    const handleChatBoxClick = () => {
        setShowChatBox(!showChatBox);
    };

    const handleMessageChange = (text) => {
        setMessage(text);
    };

    const handleSendMessage = () => {
        console.log(`Sending message: ${message}`);
        setMessage('');
    };

    return (

        <View className="absolute w-5/6 h-4/5 bottom-10 right-5">

            {
                showChatBox &&
                <View className="absolute w-[80%] h-[70%] bg-white p-5 rounded-lg shadow-lg bottom-20 right-5">
                    <Text className="text-gray-700 font-bold text-lg mb-2">Chat Box Popup</Text>
                    <View className="flex-1">
                        <Text className="text-gray-700 mb-2">Messages:</Text>
                        <View className="bg-gray-100 p-2 rounded-lg mb-2">
                            <Text className="text-gray-700">Hello, how can I help you today?</Text>
                        </View>
                    </View>
                    <View className="flex flex-row items-center w-[80%]">
                        <TextInput
                            className="border border-gray-400 rounded-md h-10 pl-4 pr-10 w-full"
                            onChangeText={handleMessageChange}
                            value={message}
                            placeholder="Type your message..."
                        />
                        <TouchableOpacity onPress={handleSendMessage} className="bg-blue-500 ml-2 rounded-full h-10 w-10 items-center justify-center">
                            <Text className="text-white font-bold">Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }

            <TouchableOpacity onPress={handleChatBoxClick} className="bg-dark rounded-xl w-20 h-12 items-center justify-center absolute bottom-5 right-5 shadow-lg">
                <Text className="text-white text-xl">Chat</Text>
            </TouchableOpacity>

        </View>
    );
};


export default ChatBox;
