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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const EditPersonalInformation = ({route, navigation}) => {
  const {userData} = route.params;

  // Khởi tạo giá trị từ userData
  const [name, setName] = useState(userData.tenDangNhap || '');
  const [email, setEmail] = useState(userData.email || 'example@example.com');
  const [phone, setPhone] = useState(userData.phone || 'Không có số');
  const [matKhau, setmatKhau] = useState(userData.matKhau);
  const [avatar, setAvatar] = useState(userData.avatar || '');

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
        `http://192.168.0.4:3000/update/${userData._id}`,
        updatedData,
      );
      if (response.status === 200) {
        Alert.alert('Thành công', 'Thông tin đã được cập nhật');
        if (editField === 'tenDangNhap') setName(newValue);
        if (editField === 'email') setEmail(newValue);
        if (editField === 'phone') setPhone(newValue);
        if (editField === 'matKhau') setmatKhau(newValue);
        setEditField(null);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Không thể cập nhật thông tin');
    }
  };

  // Hàm gửi ảnh lên server
  const uploadAvatar = async avatarUri => {
    const formData = new FormData();
    const uriParts = avatarUri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    const avatarFile = {
      uri: avatarUri,
      name: `avatar.${fileType}`,
      type: `image/${fileType}`,
    };

    formData.append('avatar', avatarFile);

    try {
      const response = await axios.post(
        `http://192.168.0.4:3000/user/${userData._id}/image`, // Sử dụng đúng userId
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.status === 200 && response.data.avatarUrl) {
        const avatarUrl = response.data.avatarUrl;

        const updatedData = {...userData, avatar: avatarUrl};
        const updateResponse = await axios.put(
          `http://192.168.0.4:3000/update/${userData._id}`,
          updatedData,
        );

        if (updateResponse.status === 200) {
          setAvatar(avatarUrl);
          Alert.alert('Thành công', 'Ảnh đại diện đã được cập nhật');
        } else {
          throw new Error('Cập nhật thông tin người dùng thất bại');
        }
      } else {
        throw new Error('Không nhận được URL ảnh từ server');
      }
    } catch (error) {
      if (error.response) {
        console.error('Server Error:', error.response.data);
        Alert.alert(
          'Lỗi',
          `Server: ${
            error.response.data.message || 'Không thể cập nhật ảnh đại diện'
          }`,
        );
      } else {
        console.error('Client Error:', error.message);
        Alert.alert('Lỗi', 'Không thể kết nối đến server');
      }
    }
  };

  // Hàm chọn hoặc chụp ảnh mới
  const handleAvatarChange = () => {
    Alert.alert(
      'Thay đổi ảnh đại diện',
      'Chọn một tùy chọn',
      [
        {
          text: 'Chọn ảnh từ thư viện',
          onPress: () => openImagePicker(),
        },
        {
          text: 'Chụp ảnh mới',
          onPress: () => openCamera(),
        },
        {
          text: 'Hủy',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  // Mở thư viện ảnh
  const openImagePicker = () => {
    launchImageLibrary(
      {mediaType: 'photo', maxWidth: 500, maxHeight: 500},
      response => {
        const uri = response.assets && response.assets[0]?.uri;
        if (uri) {
          setAvatar(uri);
          uploadAvatar(uri);
        } else {
          console.log('Error: No URI returned from picker');
        }
      },
    );
  };

  // Mở camera
  const openCamera = () => {
    launchCamera(
      {mediaType: 'photo', maxWidth: 500, maxHeight: 500},
      response => {
        const uri = response.assets && response.assets[0]?.uri;
        if (uri) {
          setAvatar(uri);
          uploadAvatar(uri);
        } else {
          console.log('Error: No URI returned from camera');
        }
      },
    );
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
        <TouchableOpacity style={styles.infoItem} onPress={handleAvatarChange}>
          <Text style={styles.label}>Ảnh đại diện</Text>
          <Image source={{uri: avatar}} style={styles.avatar} />
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
        {/*Pass*/}
        <TouchableOpacity
          style={styles.infoItem5}
          onPress={() => navigation.navigate('FixPasswordScreen')}>
          <Text style={styles.label}>Mật khẩu</Text>
          <Text style={styles.value}>******</Text>
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
  modalButtons: {flexDirection: 'row', justifyContent: 'space-between'},
});

export default EditPersonalInformation;
