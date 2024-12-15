import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ReturnPolicyScreen = ({ navigation }) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgree = () => {
    if (isAgreed) {
      // Điều hướng đến màn hình tiếp theo nếu người dùng đã đồng ý
      navigation.navigate('NextScreen');
    } else {
      Alert.alert("Vui lòng đọc và đồng ý với chính sách để tiếp tục.");
    }
  };
  //dhfd

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ReturnPolicy</Text>
      <ScrollView style={styles.policyContainer}>
        <Text style={styles.policyText}>
          {/* Nội dung chính sách đổi trả */}
          1. Điều kiện đổi trả: {"\n"}
          - Sản phẩm phải còn nguyên vẹn, chưa qua sử dụng và còn đầy đủ bao bì.{"\n"}
          - Đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng.{"\n"}
          - Cung cấp hóa đơn mua hàng khi yêu cầu đổi trả.{"\n\n"}

          2. Sản phẩm không áp dụng đổi trả: {"\n"}
          - Sản phẩm khuyến mãi hoặc giảm giá đặc biệt.{"\n"}
          - Sản phẩm hư hỏng do lỗi người dùng.{"\n\n"}

          3. Quy trình đổi trả: {"\n"}
          - Liên hệ với bộ phận chăm sóc khách hàng để được hỗ trợ đổi trả.{"\n"}
          - Gửi sản phẩm về trung tâm đổi trả theo hướng dẫn của nhân viên hỗ trợ.{"\n"}
          - Đợi xác nhận và hoàn tất quá trình đổi trả trong vòng 3-5 ngày làm việc.{"\n\n"}

          {/* Thêm nội dung khác nếu cần */}
        </Text>
        <View style={styles.footer}>
          
        </View>
        
      </ScrollView>
      
      
    </View>
  );
};

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

export default ReturnPolicyScreen;
