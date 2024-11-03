import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const WarrantyPolicyScreen = ({ navigation }) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgree = () => {
    if (isAgreed) {
      // Điều hướng đến màn hình tiếp theo nếu người dùng đã đồng ý
      navigation.navigate('NextScreen');
    } else {
      Alert.alert("Vui lòng đọc và đồng ý với chính sách để tiếp tục.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chính Sách Bảo Hành</Text>
      <ScrollView style={styles.policyContainer}>
        <Text style={styles.policyText}>
          {/* Nội dung chính sách bảo hành */}
          1. Điều kiện bảo hành: {"\n"}
          - Sản phẩm được bảo hành miễn phí trong thời gian bảo hành nếu gặp lỗi kỹ thuật từ nhà sản xuất.{"\n"}
          - Sản phẩm còn trong thời hạn bảo hành và có hóa đơn mua hàng hợp lệ.{"\n\n"}

          2. Các trường hợp không được bảo hành: {"\n"}
          - Sản phẩm hư hỏng do tác động ngoại lực, sử dụng sai cách hoặc bảo quản không đúng hướng dẫn.{"\n"}
          - Sản phẩm đã được sửa chữa ở nơi không được ủy quyền.{"\n\n"}

          3. Quy trình yêu cầu bảo hành: {"\n"}
          - Liên hệ với bộ phận chăm sóc khách hàng để yêu cầu bảo hành.{"\n"}
          - Gửi sản phẩm về trung tâm bảo hành hoặc điểm tiếp nhận theo hướng dẫn.{"\n"}
          - Thời gian xử lý bảo hành từ 5-7 ngày làm việc tùy theo mức độ hư hỏng của sản phẩm.{"\n\n"}

          {/* Thêm nội dung khác nếu cần */}
        </Text>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setIsAgreed(!isAgreed)}
          >
            <View style={[styles.checkbox, isAgreed && styles.checkboxChecked]}>
              {isAgreed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Tôi đồng ý với các điều khoản trên</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: isAgreed ? '#007AFF' : '#FFFFFF',
                borderColor: isAgreed ? '#007AFF' : '#CCCCCC',
              },
            ]}
            onPress={handleAgree}
            disabled={!isAgreed}
          >
            <Text style={[styles.buttonText, { color: isAgreed ? '#FFFFFF' : '#000000' }]}>
              Tiếp tục
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
//cgdf

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  policyContainer: {
    flex: 1,
  },
  policyText: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#555',
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WarrantyPolicyScreen;
