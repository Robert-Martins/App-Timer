import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity, ImageBackground, Modal } from 'react-native';
import { Audio } from 'expo-av';
import Contador from './Contador';

export default function App() {

  const [state, setState] = useState('select');
  const [seconds, setSeconds] = useState(1);
  const [minutes, setMinutes] = useState(0);

  const [alarmSound, setAlarmSound] = useState([
    {
      id: 1,
      select: true,
      song: '1',
      file: require('./assets/alarme1.mp3')
    },
    {
      id:2,
      select: false,
      song: '2',
      file: require('./assets/alarme2.mp3')
    },
  ]);

  var numeros = [];
  for(var i = 1; i<=60; i++)
  {
    numeros.push(i);
  }

  function setAlarm(id)
  {
    let alarmTemp = alarmSound.map(function(val){
      if(id!=val.id)
        val.select = false;
      else
        val.select = true;
      return val;
    });
    setAlarmSound(alarmTemp);
    
    
  }

  if(state == 'select')
  {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent']}
                        style={{position:'absolute',top:0,left:0,right:0,height:'100%'}}
        />
        <Text style = {styles.textHeader}>Selecione aqui o seu tempo:</Text>
        <View style = {{flexDirection:'row'}}>
          <Text style={{color:'white', paddingTop:16}}>Min:</Text>
          <Picker onValueChange={(itemValue, itemIndex)=> setMinutes(itemValue)} selectedValue={minutes} style = {styles.picker}>
            <Picker.Item label = "0" value = "0" />
            {
              numeros.map(function(val){
                return(<Picker.Item label = {val.toString()} value = {val.toString()}/>)
              })
            }
          </Picker>
          <Text style={{color:'white', paddingTop:16}}>Seg:</Text>
          <Picker onValueChange={(itemValue, itemIndex)=> setSeconds(itemValue)} selectedValue={seconds} style = {styles.picker}>
            {
              numeros.map(function(val){
                return(<Picker.Item label = {val.toString()} value = {val.toString()}/>)
              })
            }
          </Picker>
        </View>
        <View style={{flexDirection:'row'}}>
          {
            alarmSound.map(function(val){
              if(val.select)
              {
              return(
                <TouchableOpacity onPress={()=> setAlarm(val.id)} style = {styles.btnChosen}>
                  <Text style={{color:'white', textAlign:'center'}}>Alarme {val.song}</Text>
                </TouchableOpacity>
              )
              }
              else
              {
                return(
                  <TouchableOpacity onPress={()=> setAlarm(val.id)} style = {styles.btnChoose}>
                    <Text style={{color:'white', textAlign:'center'}}>Alarme {val.song}</Text>
                  </TouchableOpacity>
                )
              }
            })
          }
        </View>
        <TouchableOpacity onPress={()=> setState('start')} style={styles.btnInit}><Text style={styles.btnInitText}>Iniciar</Text></TouchableOpacity>
      </View>
    );
  }
  else if(state == 'start')
  {
    return(
      <Contador alarms = {alarmSound} setState = {setState} minutes = {minutes} seconds = {seconds} setMinutes = {setMinutes} setSeconds = {setSeconds}></Contador>
    )
  }
  

}

const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
    backgroundColor: 'rgb(104, 50, 168)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeader:
  {
    color: 'white',
    fontSize: 30
  },
  picker:
  {
    height:50,
    width:100,
    color: 'white'
  },
  btnChoose:
  {
    width:150,
    padding:8,
    marginRight:10,
    backgroundColor:'rgba(104,50,168,0.5)',
  },
  btnChosen:
  {
    width:150,
    padding:8,
    marginRight:10,
    backgroundColor:'rgba(104,50,168,0.2)',
    borderColor:'rgba(104,50,168,1)',
    borderWidth:1
  },
  btnInit:
  {
    backgroundColor:'rgba(104,50,168,0.5)',
    width:100,
    height:100,
    borderRadius:50,
    marginTop:30,
    borderColor:'rgba(104,50,168,1)',
    borderWidth: 2
  },
  btnInitText:
  {
    color:'white',
    textAlign:'center',
    paddingTop:35,
    fontSize:20
  }
});
