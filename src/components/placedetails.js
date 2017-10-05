import React , {Component} from 'react' ;
import { View ,Text , StyleSheet, Dimensions,Image } from 'react-native' 

export default class PlaceDetails extends Component{
   constructor(){
       super();
       console.disableYellowBox= true;
   }
    static navigationOptions = {
        title: 'Place Details',
      }

    render(){
        const { params } = this.props.navigation.state;
        return (
          <View style= {styles.container} >
             <Text style={{fontSize:20,fontWeight:'bold'}} >
                 {params.name}
             </Text>
             <View style={{flexDirection:'column'}} >
             <Text style={{fontSize:16,fontWeight:'bold'}} >
                 Complete Address: 
             </Text>
             <Text style={{fontSize:15}} >
               {params.vicinity}
             </Text>
             </View>
             <View>
             <Text style={{fontSize:16,fontWeight:'bold'}} >
                 Rating : 
             </Text>
             <Text style={{fontSize:15}} >
               {params.rating}
             </Text>
             </View>
             <View>
             <Text style={{fontSize:16,fontWeight:'bold'}} >
                 Types : 
             </Text>
             <Text style={{fontSize:15}} >
               {params.types.map((v,i)=>{
                  return (<Text key={i} >{v}</Text>)
               })}
             </Text>
             </View>
          </View>
        );
    }
}

const { height, width } = Dimensions.get('window') ;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        height,
        alignItems: 'center' ,
    },
   
})