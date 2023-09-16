// Import necessary React and React Native components
import React, { useEffect,  useState } from 'react';
import { ScrollView, View, TextInput, StyleSheet, Text, TouchableOpacity, Animated, Alert } from 'react-native';

// Import StatusBar, FontAwesomeIcon, and icon dependencies
import { StatusBar } from 'expo-status-bar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { faRuler } from '@fortawesome/free-solid-svg-icons';

// Define the main component of the application
export default function App()  {
  
  //Initialize an animated value for fading animation
  const [fadeAnim] = useState(new Animated.Value(0)); //

  //Initialize state variables for user input
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  //Initialize state variables for calculated results
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');

  //Initialize state variables for dynamic styling
  const [resultData, setResultData] = useState({});
  const [menssageData, setMessageData] = useState({}); 

  // Define a variable for storing a new style object
  let resultStyle = {};
  let messageStyle = {}; 

  // Function to calculate Body Mass Index (BMI) based on user-input weight and height
  const calculate_BMI = () => {

    if(weight && height){
      // Check if the weight and height fields contain commmas or hyphens
      if(weight.includes(',') || weight.includes('-') || height.includes(',') || height.includes('-')){
        // If commmas or hyphens are found, display an error message
        Alert.alert('Error', 'Please, use the period (.) as the decimal separator for weight and height.');
        return;
      }
    }
  
    if (weight && height){
      // BMI Calculation
      const IMCFine =
        parseFloat(weight) / (parseFloat(height) * parseFloat(height));
        setResult(IMCFine.toFixed(2))

      // Determine the BMI category and set appropriate messages and styles
      if(IMCFine <= 16){

        // Custom configurations for BMI ranges
        // Each 'if' block below contains personalized settings for a specific BMI range.
        // These settings include message, color, and alignment adjustments.
        setMessage('Low weight - Grade III')
        resultStyle = ({
          color:"rgb(249, 0, 0)",
          alignSelf:'flex-start'
        });
        messageStyle = ({ 
          alignSelf: 'flex-end'
        });
      }

      if(IMCFine >= 16 && IMCFine <= 16.99){
        setMessage('Low weight - Grade II')
        resultStyle = ({
          color:"rgb(255, 161, 0)"
        });
        messageStyle = ({ 
          alignSelf: 'flex-end'
        });
      }

      if(IMCFine >=17 && IMCFine <=18.49){
        setMessage('Low weight - Grade I')
        resultStyle = ({
          color:"rgb(246, 255, 0)"
        });
        messageStyle = ({ 
          alignSelf: 'flex-end'
        });
      }

      if (IMCFine >= 18.5 && IMCFine <= 24.99) {
        setMessage('Healthy')
        resultStyle = {
          color: 'rgb(63, 252, 0)' 
        };
        messageStyle = ({ 
          alignSelf: 'flex-end'
        });
      }

      if(IMCFine >= 25 && IMCFine <= 29.99){
        setMessage('Overweight')
        resultStyle = ({
          color:"rgb(246, 255, 0)"
        }); 
        messageStyle = ({ 
          alignSelf: 'flex-end'   
        });
      }

      if(IMCFine >= 30 && IMCFine <= 34.99){
        setMessage('Obesity - Grade I (Mild)')
        resultStyle = ({
          color:"rgb(246, 255, 0)"
        });
      }

      if(IMCFine >= 35 && IMCFine <= 39.99){
        setMessage('Obesity - Grade II (Moderate)')
        resultStyle = ({
          color:"rgb(255, 161, 0)"
        });
        messageStyle = ({ 
          alignSelf: 'flex-end'   
        });
      }

      if(IMCFine >= 40){
        setMessage('Obesity - Grade III (Morbid)')
        resultStyle = ({
          color:"rgb(249, 0, 0)"
        });
        messageStyle = ({ 
          alignSelf: 'flex-end'   
        });
      }

      // Update the style with the determined style object
      setResultData(resultStyle);
      setMessageData(messageStyle);  
    }
  };
  
  // Use the useEffect hook to create a fade-in animation when the component mounts.
  useEffect(()=>{
    Animated.timing(
      fadeAnim,
      {
        toValue:1, // Final opacity value (fully visible)
        duration:1000, // Animation duration of 1 second
        useNativeDriver:true, // Utilize native driver for improved performance
      }
    ).start(); // Start the animation
  },[]); // An empty dependecy array '[]' indicates that this effect should run once, when the component mounts.


  // This effect is triggered when either 'weight' or 'height' is updated.
  useEffect(() =>{
    // Place your code here to perform action when 'weight' or 'height' change.

  }, [weight, height]);

  return (
    
    // Main container view with styles
    <View style={styles.Container_App}>
      <StatusBar  style="light"/>

        {/* Animate the view's opacity */}
        <Animated.View
          style={{
            opacity: fadeAnim, //Aplica a opacidade animada
          }}
        >
        
          {/* Scrollable container for user input */}
          <ScrollView showsVerticalScrollIndicator={false}>
            
            {/* User Input Section */}
            <View style={styles.Container_BMI}>

              {/* Title of the app */}
              <View style={styles.Container_Title_App}>
                <Text style={styles.Text_Title_App}>CALCULATE - BMI</Text>
              </View>

              {/* Input for height in meters */}
              <Text style={styles.height_Label}>Height in Meters</Text>
              <View style={styles.Containers_Inputs}>  
                <TextInput
                  style={styles.Inputs}
                  keyboardType='numeric'
                  placeholder='ex: 1.79'
                  onChangeText={setHeight}/>
                <Text style={styles.unit_Label}>m</Text>
                <Text style={styles.Icons}><FontAwesomeIcon icon={faRuler} size={23} style={{color: "#000",}}/></Text>          
              </View>

              {/* Input for weight in Kilograms */}
              <Text style={styles.weight_Label}>Weight in Kg</Text>
              <View style={styles.Containers_Inputs}>
                <TextInput
                  style={styles.Inputs}
                  keyboardType='numeric'
                  placeholder='ex: 70'
                  onChangeText={setWeight}/>
                <Text style={styles.unit_Label}>kg</Text>
                <Text style={styles.Icons}><FontAwesomeIcon icon={faWeightScale} size={23} style={{color: "#000",}}/></Text>
              </View>

              {/* Result and Calculation Button Section*/}
              <View style={styles.result_Section}>
                <View style={styles.bmi_Display}>
                  {/* Display the BMI result with dynamic style */}
                  <Text style={[styles.bmi_Result, resultData]}>
                    {result ? parseFloat(result).toFixed(2) : null}
                  </Text>
                </View>

                {/* Display the BMI message */}
                <View style={styles.bmi_Message_Section}> 
                  {message ? (
                    <Text style={[styles.bmi_Message_Text, menssageData, ]}>
                      {message}
                    </Text>
                  ) : null}
                </View>
              </View>
              
              {/* Button to trigger the BMI calculation */}
              <TouchableOpacity 
                style={styles.calculate_Button}
                onPress={calculate_BMI}>
                <Text style={styles.calculate_Button_Text}>Calcular
                </Text>
              </TouchableOpacity>
            </View>

          </ScrollView>  
        </Animated.View>
    </View>  
  );
}

// Define the styles for the components using StyleSheet.create
const styles = StyleSheet.create({

  Container_App:{
    backgroundColor:'#13101C',
    flex:1,  
  },

  Container_BMI:{
    alignItems:'center',
    justifyContent:'center',
    marginTop:'50%',
    margin:  '5%',  
  },

  Container_Title_App:{
    paddingRight:'40%',
  },

  Text_Title_App:{
    fontSize:26,
    color:'#ffff',
    borderBottomColor:'green',
    borderBottomWidth:4,
    alignSelf: 'flex-start',
  },

  height_Label:{   
    color:'#ffff',
    fontSize:18,
    paddingRight:'56%',
    paddingTop:'4%',
  },

  Containers_Inputs: {
    marginTop: '2%', 
    backgroundColor:'#ffff',
    width:'95%',
    height:'12%',
    borderRadius:5,
  },

  Inputs:{
    fontSize:22,
    marginLeft:'10%',
    marginTop:'1%',
  },

  unit_Label:{
    color:'black',
    fontSize:20,
    position:'absolute',
   
    marginLeft:'90%',
  },

  Icons:{
    color:'black', 
    position:'absolute',
    marginTop:'2.6%',
    marginLeft:'1%',
    
  },

  weight_Label:{
    color:'#ffff',
    fontSize:18,
    paddingRight:'69%',
    paddingTop:'4%',

  },

  result_Section:{
    flexDirection:'row',
    marginTop:"2%",   
    alignItems:'center',
  },

  bmi_Result:{
    flex:1,
    fontSize:30,
   
  },

  bmi_Display:{
    flex:1,
    marginLeft:'2%',
    
  },

  bmi_Message_Section:{
    flex:1,
    marginRight:'3%',
  },

  bmi_Message_Text:{
    fontSize:18,
    color:'#ffff',
    marginTop:'3%',
    
  },

  calculate_Button:{
    backgroundColor:'green',
    marginTop:50,
    width:'30%',
    height:'12%',
    borderRadius:7,
    justifyContent:'center',
    alignItems:'center',
    
  },
  
  calculate_Button_Text:{
    fontSize:20,
    alignItems:'center',
    color:'#ffff'
  },

});