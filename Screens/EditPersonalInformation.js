// import React, { useState } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
// import { Picker } from '@react-native-picker/picker'; // Ensure to import this correctly

// const EditPersonalInformation = ({ route, navigation }) => {
//   const { userData } = route.params;
//   const [name, setName] = useState(userData.name);
//   const [nationality, setNationality] = useState(userData.nationality);
//   const [gender, setGender] = useState(userData.gender);
//   const [birthDate, setBirthDate] = useState(userData.birthDate);
//   const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
//   const [isDateModalVisible, setIsDateModalVisible] = useState(false);
//   const [selectedDay, setSelectedDay] = useState(new Date(birthDate).getDate());
//   const [selectedMonth, setSelectedMonth] = useState(new Date(birthDate).getMonth() + 1);
//   const [selectedYear, setSelectedYear] = useState(new Date(birthDate).getFullYear());

//   const handlePress = (field) => {
//     if (field === 'Họ và tên') {
//       navigation.navigate('RenameScreen', {
//         currentName: name,
//         onSave: (newName) => setName(newName),
//       });
//     } else if (field === 'Ảnh đại diện') {
//       Alert.alert(
//         'Chọn Ảnh đại diện',
//         '',
//         [
//           { text: 'Chụp Ảnh', onPress: () => console.log('Chụp ảnh') },
//           { text: 'Chọn từ Album', onPress: () => console.log('Chọn từ Album') },
//           { text: 'Hủy bỏ', style: 'cancel' },
//         ],
//         { cancelable: true }
//       );
//     } else if (field === 'Quốc tịch') {
//       navigation.navigate('CountrySelectScreen', {
//         currentCountry: nationality,
//         onSelectCountry: (selectedCountry) => setNationality(selectedCountry),
//       });
//     } else if (field === 'Giới tính') {
//       setIsGenderModalVisible(true);
//     } else if (field === 'Ngày sinh') {
//       setIsDateModalVisible(true);
//     } else if (field === 'Số điện thoại') {
//       navigation.navigate('ChangePhoneNumberScreen');
//     } else if (field === 'Mật khẩu') {
//       navigation.navigate('FixPasswordScreen'); // Navigate to FixPasswordScreen when "Mật khẩu" is pressed
//     } else {
//       Alert.alert('Chỉnh sửa thông tin', `Chức năng chỉnh sửa ${field}`);
//     }
//   };

//   const handleGenderSelect = (selectedGender) => {
//     setGender(selectedGender);
//     setIsGenderModalVisible(false);
//   };

//   const handleDateConfirm = () => {
//     const newDate = `${selectedDay}/${selectedMonth}/${selectedYear}`;
//     setBirthDate(newDate);
//     setIsDateModalVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Text style={styles.backIcon}>←</Text>
//         </TouchableOpacity>
//         <Text style={styles.header}>Edit Personal Information</Text>
//       </View>

//       <TouchableOpacity style={styles.infoItem1} onPress={() => handlePress('Ảnh đại diện')}>
//         <Text style={styles.label}>Ảnh đại diện</Text>
//         <Image source={{ uri: userData.avatar }} style={styles.avatar} />
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.infoItem2} onPress={() => handlePress('Họ và tên')}>
//         <Text style={styles.label}>Họ và tên</Text>
//         <Text style={styles.value}>{name}</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.infoItem2} onPress={() => handlePress('Quốc tịch')}>
//         <Text style={styles.label}>Quốc tịch</Text>
//         <Text style={styles.value}>{nationality}</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.infoItem2} onPress={() => handlePress('Giới tính')}>
//         <Text style={styles.label}>Giới tính</Text>
//         <Text style={styles.value}>{gender}</Text>
//       </TouchableOpacity>

//       <Modal visible={isGenderModalVisible} transparent={true} animationType="slide">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Chọn Giới Tính</Text>
//             <TouchableOpacity onPress={() => handleGenderSelect('Nam')}>
//               <Text style={styles.modalOption}>Nam</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => handleGenderSelect('Nữ')}>
//               <Text style={styles.modalOption}>Nữ</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => handleGenderSelect('Khác')}>
//               <Text style={styles.modalOption}>Khác</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => setIsGenderModalVisible(false)}>
//               <Text style={styles.modalCancel}>Hủy bỏ</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       <TouchableOpacity style={styles.infoItem4} onPress={() => handlePress('Ngày sinh')}>
//         <Text style={styles.label}>Ngày sinh</Text>
//         <Text style={styles.value}>{birthDate}</Text>
//       </TouchableOpacity>

//       <Modal visible={isDateModalVisible} transparent={true} animationType="slide">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Chọn ngày sinh</Text>
//             <View style={styles.pickerContainer}>
//               <Picker
//                 selectedValue={selectedDay}
//                 onValueChange={(itemValue) => setSelectedDay(itemValue)}
//                 style={styles.picker}
//               >
//                 {[...Array(31)].map((_, i) => (
//                   <Picker.Item key={i} label={`${i + 1}`} value={i + 1} />
//                 ))}
//               </Picker>
//               <Picker
//                 selectedValue={selectedMonth}
//                 onValueChange={(itemValue) => setSelectedMonth(itemValue)}
//                 style={styles.picker}
//               >
//                 {[...Array(12)].map((_, i) => (
//                   <Picker.Item key={i} label={`Tháng ${i + 1}`} value={i + 1} />
//                 ))}
//               </Picker>
//               <Picker
//                 selectedValue={selectedYear}
//                 onValueChange={(itemValue) => setSelectedYear(itemValue)}
//                 style={styles.picker}
//               >
//                 {Array.from({ length: 100 }, (_, i) => (
//                   <Picker.Item key={i} label={`${2023 - i}`} value={2023 - i} />
//                 ))}
//               </Picker>
//             </View>
//             <View style={styles.modalButtons}>
//               <TouchableOpacity onPress={() => setIsDateModalVisible(false)}>
//                 <Text style={styles.cancelButton}>Hủy bỏ</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={handleDateConfirm}>
//                 <Text style={styles.confirmButton}>Xác nhận</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       <TouchableOpacity style={styles.infoItem3} onPress={() => handlePress('Số điện thoại')}>
//         <Text style={styles.label}>Số điện thoại</Text>
//         <Text style={styles.value}>{userData.phone}</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.infoItem4} onPress={() => handlePress('Email')}>
//         <Text style={styles.label}>Email</Text>
//         <Text style={styles.value}>{userData.email}</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.infoItem5} onPress={() => handlePress('Mật khẩu')}>
//         <Text style={styles.label}>Mật khẩu</Text>
//         <Text style={styles.value}>******</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#E6E6E6',
//     padding: 2,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//   },
//   backButton: {
//     marginRight: 10,
//   },
//   backIcon: {
//     fontSize: 24,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   infoItem1: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//     paddingVertical: 15,
//     backgroundColor: '#FFFFFF',
//     marginTop: 45,
//     marginBottom: 45,
//     width: '100%',
//   },
//   infoItem2: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//     paddingVertical: 15,
//     backgroundColor: '#FFFFFF',
//     width: '100%',
//   },
//   infoItem3: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//     paddingVertical: 15,
//     marginTop: 35,
//     backgroundColor: '#FFFFFF',
//     width: '100%',
//   },
//   infoItem4: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//     paddingVertical: 15,
//     backgroundColor: '#FFFFFF',
//     width: '100%',
//   },
//   infoItem5: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E0E0E0',
//     paddingVertical: 15,
//     backgroundColor: '#FFFFFF',
//     marginTop: 35,
//     width: '100%',
//   },
//   label: {
//     fontSize: 16,
//     padding: 10,
//     color: '#333',
//   },
//   value: {
//     fontSize: 16,
//     color: '#666',
//     padding: 10,
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     width: '90%',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//   },
//   pickerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginVertical: 10,
//   },
//   picker: {
//     flex: 1,
//     height: 200, // Ensure enough space for scrolling
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginTop: 20,
//   },
//   cancelButton: {
//     fontSize: 16,
//     color: 'red',
//   },
//   confirmButton: {
//     fontSize: 16,
//     color: 'green',
//   },
// });

// export default EditPersonalInformation;
