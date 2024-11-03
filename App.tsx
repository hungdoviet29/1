import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

// Import các màn hình Admin
import AdminScreen from './ScreensAdmin/AdminScreen';

// Import các màn hình
import FindScreen from './Screens/Find';
import Favorite from './Screens/Favorite';
import BuyScreen from './Screens/Buy';
import CartScreen from './Screens/Cart';
import Splash from './Screens/Splash';
import Login from './Screens/Login';
import Register from './Screens/Register';
import HomeScreen from './Screens/HomeSCREEN';
import OderScreen from './Screens/OderScreen';
import PayScreen from './Screens/PayScreen';
import CheckoutScreen from './Screens/Checkout';
import HelpScreen from './Screens/HelpScreen';
import CustomDrawerContent from './Screens/CustomDrawerContent';
import AccountManagement from './Screens/Accountmanagement';
import PictureScreen from './Screens/PictureScreen';
import CommentScreen from './Screens/CommentScreen';
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen';
import OrderSuccesScreen from './Screens/OrderSuccesScreen';
import OrderFailedScreen from './Screens/OrderFailedScreen';
import ShippingScreen from './Screens/ShippingScreen';
// Import component Bottom Navigation
import BottomNavigation from './components/bottomnavigation';
import ProductScreen from './Screens/Buy';
import { getCartItems } from './redux/AsyncStorage';
import { loadCart } from './redux/cartSlice';
import { store } from './redux/store';
import NotificationScreen from './Screens/NotificationScreen';
import OTPVerificationScreen from './Screens/OTPVerificationScreen';
import ResetPasswordScreen from './Screens/ResetPasswordScreen';
import ReturnPolicyScreen from './Screens/ReturnPolicyScreen'
import MembershipPolicy from './Screens/Membershippolicy';
import UserManagementScreen from './ScreensAdmin/UserManagementScreen';
import PortfolioManagement from './ScreensAdmin/PortfolioManagement';
import ProductManagementScreen from './ScreensAdmin/ProductManagementScreen';
import OrderManagement from './ScreensAdmin/OrderManagement';
import ContactScreen from './ScreensAdmin/ContactScreen';
import ProfileScreen from './ScreensAdmin/ProfileScreen';
import StatisticalScreen from './ScreensAdmin/Statistical';

const Stack = createStackNavigator();
//chghd
const AppNavigator = ({ navigationRef }) => {
  const [currentRouteName, setCurrentRouteName] = useState('Splash');

  useEffect(() => {
    const unsubscribe = navigationRef.current?.addListener('state', () => {
      const currentRoute = navigationRef.current?.getCurrentRoute();
      setCurrentRouteName(currentRoute?.name || 'Splash');
    });

    return unsubscribe;
  }, [navigationRef]);

  return (
    <View style={styles.container}>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="AdminHome" component={AdminScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Find" component={FindScreen} />
        <Stack.Screen name="Favorite" component={Favorite} />
        <Stack.Screen name="Profile" component={MembershipPolicy} />
        <Stack.Screen name="Buy" component={BuyScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="OderScreen" component={OderScreen} />
        <Stack.Screen name="OrderSuccesScreen" component={OrderSuccesScreen} />
        <Stack.Screen name="OrderFailedScreen" component={OrderFailedScreen} />
        <Stack.Screen name="PayScreen" component={PayScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="HelpScreen" component={HelpScreen} />
        <Stack.Screen name="CustomDrawerContent" component={CustomDrawerContent} />
        <Stack.Screen name="Accountmanagement" component={AccountManagement} />
        <Stack.Screen name="PictureScreen" component={PictureScreen} />
        <Stack.Screen name="CommentScreen" component={CommentScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        <Stack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        <Stack.Screen name="ShippingScreen" component={ShippingScreen} />
        <Stack.Screen name="UserManagementScreen" component={UserManagementScreen} />
        <Stack.Screen name="PortfolioManagement" component={PortfolioManagement} />
        <Stack.Screen name="ProductManagementScreen" component={ProductManagementScreen} />
        <Stack.Screen name="OrderManagement" component={OrderManagement} />
        <Stack.Screen name="ContactScreen" component={ContactScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="Statistical" component={StatisticalScreen} />

      </Stack.Navigator>

      {/* Chỉ hiển thị Bottom Navigation khi không phải các màn hình Splash, Login, Register, MembershipPolicy */}
      {currentRouteName !== 'Splash' && currentRouteName !== 'Login' && currentRouteName !== 'Register' && currentRouteName !== 'Membershipolicy' && (
        <BottomNavigation />
      )}
    </View>
  );
};

const App = () => {
  useEffect(() => {
    // Dispatch action để tải giỏ hàng từ AsyncStorage
    store.dispatch(loadCart());
  }, []);
  
  const navigationRef = useRef(null);

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <AppNavigator navigationRef={navigationRef} />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
