import * as React from 'react';
import { Text, View, Button ,StatusBar,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home'
import Discover from './Discover'
import HomeIcon from './components/Icons/HomeIcon';
import SettingsIcon from './components/Icons/SettingsIcon';
import SearchIcon from './components/Icons/SearchIcon';
import CollectionIcon from './components/Icons/CollectionIcon';
import Collections from './Collections';
import { backgroundColor } from './app.json';
import Header from './components/HeaderPlain';
import UserProfile from './components/UserProfile';
import Collection from './components/Collection';


function Icon(props) {

    if (props.name == "Home") {
        return <HomeIcon color={props.color} filled={props.filled} />;
    } else if (props.name == "Discover") {
        return <SearchIcon color={props.color} filled={props.filled} />;
    } else if (props.name == "Collections") {
        return <CollectionIcon color={props.color} filled={props.filled} />;
    } else if (props.name == "Settings") {
        return <SettingsIcon color={props.color} filled={props.filled} />;
    }

}
function SettingsScreen() {
    return (
        <View>
            <Header/>
        </View>

    );
}
function collectionsScreen() {
    return(<Stack.Navigator>
    <Stack.Screen 
    name="Collections" 
    component={Collections} 
    options={{
        headerTitle: props => <Text></Text>,
        headerStyle: {
            backgroundColor: '#fff',
            height:1
          },

    }}
    />
    <Stack.Screen 
    name="CollectionFeed" 
    component={Collection}
      options={{
        headerTitle: (props) => <Header {...props}/>,
        headerStyle: {
            backgroundColor: '#fff',
            elevation:0
          }
    }}
           />
  </Stack.Navigator>);
}
function HomeScreen() {
    return(<Stack.Navigator>
        <Stack.Screen 
        name="HomeScreen" 
        component={Home} 
        options={{
            headerTitle: props => <Text></Text>,
            headerStyle: {
                backgroundColor: '#fff',
                height:1
              },
    
        }}
        />
        <Stack.Screen 
        name="UserProfile" 
        component={UserProfile}
          options={{
            headerTitle: (props) => <Header {...props} title={""}/>,
            headerStyle: {
                backgroundColor: '#fff',
                elevation:0
              }
        }}
               />
      </Stack.Navigator>);
}
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export default class App extends React.Component {
    constructor(props) {
        super(props);
        global.bg = "#fff";
    }
    render() {
        return (
            <NavigationContainer>
                <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
                <Tab.Navigator

                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            return <Icon name={route.name} color={color} filled={focused} />;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: '#0066ff',
                        inactiveTintColor: 'gray',
                        showLabel: false,
                        style: {
                            borderTopColor: 'transparent',
                            backgroundColor: global.bg,
                            height: 60,
                            padding: 18,
                            paddingBottom: 20
                        },
                        activeTabStyle: {
                            backgroundColor: 'blue',
                            borderBottomWidth: 4,
                            borderColor: '#6C1D7C'
                        }
                    }}
                >
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Discover" component={Discover} />
                    <Tab.Screen name="Collections" component={collectionsScreen} />
                    <Tab.Screen name="Settings" component={SettingsScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }

}