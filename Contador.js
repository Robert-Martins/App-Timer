import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity, ImageBackground, Modal, LogBox } from 'react-native';
import { Audio } from 'expo-av';

export default function Contador(props)
{

    LogBox.ignoreAllLogs(true);
    var done = false;

    useEffect(()=>{
        const timer = setInterval(()=>{
            
            props.setSeconds(props.seconds-1);

            if(props.seconds <= 0)
            {
                if(props.minutes)
                {
                    props.setMinutes(props.minutes-1);
                    props.setSeconds(59);
                }
                else
                {
                    if(!done)
                    {
                        
                        done = true;
                        props.setState('select');
                        props.setMinutes(0);
                        props.setSeconds(1);
                        playSound();
                    }
                }
            }

        }, 1000)

        return () => clearInterval(timer);

    })

    function reset()
    {
        props.setState('select');
        props.setMinutes(0);
        props.setSeconds(1);
    }

    async function playSound()
    {
            const soundObject = new Audio.Sound();
            try{
                var sounds;
                props.alarms.map(function(val){
                    if(val.select)
                    {
                        sounds = val.file;
                    }
                })
                await soundObject.loadAsync(sounds);
                await soundObject.playAsync();
                // Your sound is playing!

                // Don't forget to unload the sound from memory
                // when you are done using the Sound object
                //await sound.unloadAsync();
                } catch (error) {
                // An error occurred!
                }
    }

    function formatNumber(number)
    {
        var finalNumber = "";
        if(number < 10)
        {
            finalNumber = "0"+number
        }
        else
        {
            finalNumber = number
        }
        return finalNumber;
    }

    var seconds = formatNumber(props.seconds);
    var minutes = formatNumber(props.minutes);

    return(
        <View style={styles.container}>
            <StatusBar hidden />
            <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent']}
                        style={{position:'absolute',top:0,left:0,right:0,height:'100%'}}
            />
            <View style = {{flexDirection:'row'}}>
                <Text style = {styles.text}>O alarme está marcado para daqui {props.minutes} minutos e {props.seconds} segundos</Text>
            </View>
            <View>
                <Text style = {styles.textContador}>{minutes} : {seconds}</Text>
            </View>
            <TouchableOpacity onPress={()=> reset()} style={styles.btnReset}><Text style={styles.btnResetText}>Reiniciar</Text></TouchableOpacity>
        </View>    
    )
}

const styles = StyleSheet.create({
    container:
    {   
        flex: 1,
        backgroundColor: 'rgb(104, 50, 168)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:
    {
        color:'white',
        fontSize:20,
        textAlign:'center'
    },
    textContador:
    {
        color:'white',
        fontSize: 30,
        marginTop:10
    },
    btnReset:
    {
      backgroundColor:'rgba(104,50,168,0.5)',
      width:100,
      height:100,
      borderRadius:50,
      marginTop:55,
      borderColor:'rgba(104,50,168,1)',
      borderWidth: 2
    },
    btnResetText:
    {
      color:'white',
      textAlign:'center',
      paddingTop:35,
      fontSize:20
    }
})