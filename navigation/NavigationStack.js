import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Welcome from '../app/screens/welcomeScreen/index';
import Login from '../app/screens/login/index';
import EmployeeList from '../app/screens/dashboard/index';
import RegistrationScreen from '../app/Registration';

const screens = {
  Welcome: {
    screen: Welcome,
  },
  Login: {
    screen: Login,
  },
  Registration: {
    screen: RegistrationScreen,
  },
  Dashboard: {
    screen: EmployeeList,
  },
};

const NavigationStack = createStackNavigator(screens);

export default createAppContainer(NavigationStack);
