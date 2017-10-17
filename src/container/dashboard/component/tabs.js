import React,{ Component } from 'react' ;
import { TabHeading, Tab, Tabs, Text, } from 'native-base' ;
import Circle from './Circle';
import Map from './map';

class UpperTab extends Component{

  render(){
    return(
        <Tabs>
          <Tab heading={ <TabHeading style= {{backgroundColor: 'green' }} ><Text>Map</Text></TabHeading>}>
            <Map />
          </Tab>
          <Tab heading={ <TabHeading style= {{backgroundColor: 'green' }} ><Text>Circle</Text></TabHeading>}>
            <Circle />
          </Tab>
        </Tabs>
    )
  }
}

export default UpperTab ;