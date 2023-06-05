import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, FlatList, Text} from 'react-native'
import {io} from 'socket-io-client';

// 최상위 변수 선언
const serverUrl = "";
const socket = io(serverUrl);


export default function TextChat({navigator}) {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("chat message", handleReceivedMessage);
        return () => {
            socket.off("chat message", handleReceivedMessage);
        }
    },[]);

    const handleReceivedMessage = receivedMessage => {
        setMessage(prevMessage => [...prevMessage, receivedMessage]);
    };

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            socket.emit("chat Message", message);
            setMessage("");
        }
    };

    return (
        <View>
            <FlatList data={message}
                      renderItem={({item}) => <Text>{item}</Text>}
                      keyExtractor={(item, index) => index.toString()}      
            />
            <View>
                <TextInput
                    value={message}
                    onChangeText={text => setMessage(text)}
                    placehoder="message를 입력하세요."
                />
                <Button onPress={handleSendMessage} title="Send"></Button>
            </View>
        </View>
    );
}