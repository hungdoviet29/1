import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  Button,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';

const EditPersonalInformation = ({route, navigation}) => {
  const {userData} = route.params; // Nhận dữ liệu từ màn trước

  // Khởi tạo giá trị từ userData
  const [name, setName] = useState(userData.tenDangNhap || '');
  const [birthDate, setBirthDate] = useState(
    userData.birthDate || '01/01/2000',
  );
  const [email, setEmail] = useState(userData.email || 'example@example.com');
  const [phone, setPhone] = useState(userData.phone || 'Không có số');

  // Modal trạng thái chỉnh sửa
  const [editField, setEditField] = useState(null);
  const [newValue, setNewValue] = useState('');

  // Hàm mở modal chỉnh sửa
  const openEditModal = (field, value) => {
    setEditField(field);
    setNewValue(value);
  };

  // Hàm lưu chỉnh sửa
  const handleSave = async () => {
    const updatedData = {...userData, [editField]: newValue};
    try {
      const response = await axios.put(
        `http://192.168.0.3:3000/update/${userData._id}`,
        updatedData,
      );

      if (response.status === 200) {
        Alert.alert('Thành công', 'Thông tin đã được cập nhật');
        // Cập nhật dữ liệu hiển thị
        if (editField === 'tenDangNhap') setName(newValue);
        if (editField === 'email') setEmail(newValue);
        if (editField === 'phone') setPhone(newValue);
        setEditField(null); // Đóng modal
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Không thể cập nhật thông tin');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.header}>Edit Personal Information</Text>
        </View>

        {/* Hiển thị avatar */}
        <TouchableOpacity
          style={styles.infoItem}
          onPress={() => Alert.alert('Thay đổi avatar')}>
          <Text style={styles.label}>Ảnh đại diện</Text>
          <Image source={{uri: userData.avatar}} style={styles.avatar} />
        </TouchableOpacity>

        {/* Hiển thị tên đăng nhập */}
        <TouchableOpacity
          style={styles.infoItem}
          onPress={() => openEditModal('tenDangNhap', name)}>
          <Text style={styles.label}>Họ và tên</Text>
          <Text style={styles.value}>{name}</Text>
        </TouchableOpacity>

        {/* Email */}
        <TouchableOpacity
          style={styles.infoItem}
          onPress={() => openEditModal('email', email)}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{email}</Text>
        </TouchableOpacity>

        {/* Số điện thoại */}
        <TouchableOpacity
          style={styles.infoItem}
          onPress={() => openEditModal('phone', phone)}>
          <Text style={styles.label}>Số điện thoại</Text>
          <Text style={styles.value}>{phone}</Text>
        </TouchableOpacity>
      </View>

      {/* Modal chỉnh sửa */}
      <Modal
        visible={editField !== null}
        transparent={true}
        animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chỉnh sửa {editField}</Text>
            <TextInput
              style={styles.input}
              value={newValue}
              onChangeText={setNewValue}
              placeholder={`Nhập ${editField} mới`}
            />
            <View style={styles.modalButtons}>
              <Button title="Hủy" onPress={() => setEditField(null)} />
              <Button title="Lưu" onPress={handleSave} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F8F8F8', padding: 20},
  headerContainer: {flexDirection: 'row', alignItems: 'center', padding: 10},
  backButton: {marginRight: 10},
  backIcon: {fontSize: 24, color: '#333'},
  header: {fontSize: 22, fontWeight: 'bold'},
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    borderRadius: 10,
  },
  label: {fontSize: 16, color: '#333'},
  value: {fontSize: 16, color: '#666'},
  avatar: {width: 50, height: 50, borderRadius: 25},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {fontSize: 18, marginBottom: 10},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtons: {flexDirection: 'row', justifyContent: 'space-around'},
});

export default EditPersonalInformation;
