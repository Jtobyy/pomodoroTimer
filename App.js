import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Vibration} from 'react-native';

  
export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      workMin: 0,
      workSec: 0,
      breakMin: 5,
      breakSec: 0,
      offSwitch: 'stop',
      onSwitch: 'start'
    }
  }
  
  componentDidMount() {
    console.log('mounted')
  }

  startOrpause = () => { 
      // Takes in the 2 values of offSwitch and onSwitch and interchange their values
      this.setState(prevState => ({onSwitch: prevState.offSwitch, offSwitch: prevState.onSwitch}))

      this.workCount()
  }

  timer1
  timer2
  timer = [this.timer1, this.timer2]

  workCount = () => {
    if(this.state.offSwitch == 'start')
    {
      this.timer.forEach(element => {
        clearInterval(element)
      });
    }
    else {
      this.timer[0] = setInterval(() => this.countdown(), 1000)
    }
  }

  countdown = () =>  {
    if (this.state.workMin > 0 && this.state.workSec == 0){
      this.setState((prevState) => ({workMin: prevState.workMin - 1, workSec: 60}))
    }
    else if (this.state.workMin == 0 && this.state.workSec == 0){
      Vibration.vibrate(1 * 1000)
      this.setState(() => ({breakMin: 5, breakSec: 0}))
      this.timer.forEach(element => {
        clearInterval(element)
      });
      this.timer[1] = setInterval(() => this.breakcountdown(), 1000)
    }
    else {
      this.setState((prevState) => ({workSec: prevState.workSec - 1}))
    }
  }

  breakcountdown = () => {
    if (this.state.breakMin > 0 && this.state.breakSec == 0){
      this.setState((prevState) => ({breakMin: prevState.breakMin - 1, breakSec: 60}))
    }
    else if (this.state.breakMin == 0 && this.state.breakSec == 0){
      Vibration.vibrate(1 * 1000)
      this.setState(() => ({workMin: 25, workkSec: 0}))
      this.timer.forEach(element => {
        clearInterval(element)
      });
      this.timer[0] = setInterval(() => this.countdown(), 1000)
    }
    else {
      this.setState((prevState) => ({breakSec: prevState.breakSec - 1}))
    }
  }
    
  reset = () => (    
    this.setState(() => ({workMin: 25, workSec: 0, breakMin:5, breakSec:5}))
  )

  resetbreak = () => (
    this.setState(() => ({breakMin: 5, breakSec:5}))
  )
  componentWillUnmount() {
    clearInterval(this.timer[0])
  }

  render() {
    return (      
      <View style={styles.container} >
        <View style={styles.header} >
          <Text style={styles.title}>Pomodoro Timer</Text>
          <Text style={styles.workCountdown}> {this.state.workMin} : {this.state.workSec} </Text>
        </View>

        <View style={styles.buttonContainer}>
          
          <TouchableOpacity style={styles.buttons} onPress={() => this.startOrpause()}> 
            <Text style={styles.buttonText}>{this.state.onSwitch}</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={() => this.reset()}> 
            <Text style={styles.buttonText}>reset</Text> 
          </TouchableOpacity>
        </View>

        <View style={styles.unitContainer}>
          <Text style={[styles.units, styles.min]}> min: </Text>
          <Text style={[styles.units, styles.sec]}> sec: </Text>
        </View>

        <View style={styles.timing} pointerEvents='box-none'>
          <Text style={styles.titles}>Work Time: </Text>
          <TextInput style={[styles.inputs, styles.input1]} onChangeText={(text) => (this.setState({workTimeMinstart:text }))} maxLength={2} keyboardType="numeric" >{this.state.workTimeMinstart}</TextInput>
          <TextInput style={[styles.inputs, styles.input2]} onChangeText={(text) => (this.setState({workTimeSecstart:text }))} maxLength={2} keyboardType="numeric" >{this.state.workTimeSecstart}</TextInput>   
        </View>

        <View style={styles.timing} pointerEvents='box-none'>
          <Text style={styles.titles}>Break Time: </Text>
          <TextInput style={[styles.inputs, styles.input1]} onChangeText={(text) => (this.setState({breakTimeMinstart:text }))}  maxLength={2} keyboardType="numeric" >{this.state.breakTimeMinstart}</TextInput>
          <TextInput style={[styles.inputs, styles.input2]} onChangeText={(text) => (this.setState({breakTimeSecstart:text }))}  maxLength={2} keyboardType="numeric">{this.state.breakTimeSecstart}</TextInput> 
        </View>

        {/* <BreakTimer style={styles.BreakTimer} min={this.state.breakMin} sec={this.state.breakSec}/> */}
        <Text style={styles.breakCountdown}> {this.state.breakMin} : {this.state.breakSec} </Text>

        <TouchableOpacity style={styles.brkrstbttn} onPress={() => this.resetbreak()}>
           <Text> reset break time </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timing: {
    flexDirection:'row',
    marginBottom:15,
    
  },
  inputs: {
    borderWidth:1,
    padding:10,
    fontSize:15,
    width:70,
    borderRadius:3.
  },
  input1: {
    marginRight:6,
  },
  input2: {
    marginLeft:6,
  },
  container: {
    flex: 1,
    fontFamily:'cursive',
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems:'center',
  },
  title: {
    padding:10,
    fontVariant:['small-caps'],
    fontWeight:'bold',
    fontSize:30,
  },
  workCountdown: {
    padding:20,
    fontSize:30,
  },
  breakCountdown: {
    padding:20,
    fontSize:20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    margin: 20,
  },
  buttons: {
    width:100,
    backgroundColor:'#2196F3',
    height:50,
    borderRadius:3,
    borderColor:'black',
    borderWidth:1,
  },
  buttonText: {
    alignSelf:'center',
    marginTop:4,
    fontSize: 30,
    fontWeight: 'normal',
  },
  brkrstbttn: {
    backgroundColor: 'red',
    borderRadius: 3,
    marginTop:20,
  },
  unitContainer: {
    flexDirection:'row',
    marginLeft:50,
  },
  units: {
    fontSize:20,
    padding:10,
  },
  min: {
    marginLeft:40,
  },
  sec: {
    left:30,
  },
  titles: {
    alignSelf: 'flex-start',
    padding:15,
    fontSize:20,
    fontWeight:'bold',
  },
});
