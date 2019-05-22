import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

const setToken = async (Value) => {
    await AsyncStorage.setItem('@Token', Value);
}
const getToken = async () => {
    return await AsyncStorage.getItem('@Token');
}
const setCuddlerId = async (Value) => {
    await AsyncStorage.setItem('@CuddlerId', Value);
}
const getCuddlerId = async () => {
    return await AsyncStorage.getItem('@CuddlerId');
}
const setSenderId = async (Value) => {  
    await AsyncStorage.setItem('@SenderId', Value);
}
const getSenderId = async () => {
    return await AsyncStorage.getItem('@SenderId');
}
const setReceiverId = async (Value) => {
    await AsyncStorage.setItem('@ReceiverId', Value);
}
const getReceiverId = async () => {
    return await AsyncStorage.getItem('@ReceiverId');
}

export {
    setToken, getToken, setCuddlerId, getCuddlerId, setSenderId, getSenderId, setReceiverId, getReceiverId
}
