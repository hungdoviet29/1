// import React from 'react';
// import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons

// const notifications = [
//   { id: '1', message: 'MÃ GIẢM GIÁ 10% CHO LẦN MUA TIẾP THEO CỦA BẠN. HÃY SỬ DỤNG MÃ "SALE10" NGAY HÔM NAY!' },
//   { id: '2', message: 'MÃ GIẢM GIÁ 10% CHO LẦN MUA TIẾP THEO CỦA BẠN. HÃY SỬ DỤNG MÃ "SALE10" NGAY HÔM NAY!' },
//   { id: '3', message: 'MÃ GIẢM GIÁ 10% CHO LẦN MUA TIẾP THEO CỦA BẠN. HÃY SỬ DỤNG MÃ "SALE10" NGAY HÔM NAY!' },
//   { id: '4', message: 'MÃ GIẢM GIÁ 10% CHO LẦN MUA TIẾP THEO CỦA BẠN. HÃY SỬ DỤNG MÃ "SALE10" NGAY HÔM NAY!' },
//   { id: '5', message: 'MÃ GIẢM GIÁ 10% CHO LẦN MUA TIẾP THEO CỦA BẠN. HÃY SỬ DỤNG MÃ "SALE10" NGAY HÔM NAY!' },
// ];

// export default function NotificationScreen() {
//   const renderNotification = ({ item }) => (
//     <View style={styles.notificationCard}>
//       <Image
//         source={{ uri: 'https://via.placeholder.com/60' }}
//         style={styles.productImage}
//       />
//       <Text style={styles.notificationText}>{item.message}</Text>
//       <TouchableOpacity style={styles.closeButton}>
//         <Ionicons name="close" size={20} color="#666" />
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity>
//           <Ionicons name="arrow-back" size={24} color="black" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Notification</Text>
//         <TouchableOpacity>
//           <Ionicons name="search" size={24} color="black" />
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         data={notifications}
//         renderItem={renderNotification}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.notificationList}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f2f2f2',
//     paddingHorizontal: 20,
//     paddingTop: 40,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   notificationList: {
//     paddingBottom: 20,
//   },
//   notificationCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#e8f0fe',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   productImage: {
//     width: 60,
//     height: 60,
//     marginRight: 10,
//     borderRadius: 4,
//   },
//   notificationText: {
//     flex: 1,
//     fontSize: 14,
//     color: '#333',
//   },
//   closeButton: {
//     padding: 4,
//   },
// });
import React from 'react';
import { View, Text } from 'react-native';

const NotificationScreen = () => {
  return (
    <View>
      <Text>Notification Screen</Text>
    </View>
  );
};

export default NotificationScreen;
