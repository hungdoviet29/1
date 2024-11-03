import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const PaymentPolicyScreen = ({ navigation }) => {
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
      <Text style={styles.header}>PaymentPolicyScreen</Text>
      <ScrollView style={styles.policyContainer}>
        <Text style={styles.policyText}>
          {/* Nội dung chính sách thanh toán */}
          1. Phương thức thanh toán chấp nhận: {"\n"}
          - Thanh toán qua thẻ tín dụng hoặc thẻ ghi nợ (Visa, MasterCard).{"\n"}
          - Thanh toán qua chuyển khoản ngân hàng.{"\n"}
          - Thanh toán qua ví điện tử (Momo, ZaloPay, v.v.).{"\n\n"}

          2. Điều kiện thanh toán: {"\n"}
          - Thanh toán phải được thực hiện đầy đủ trước khi tiến hành giao dịch hoặc giao hàng.{"\n"}
          - Đảm bảo thông tin thanh toán chính xác để tránh phát sinh lỗi.{"\n\n"}

          3. Chính sách hoàn tiền: {"\n"}
          - Hoàn tiền sẽ được xử lý trong vòng 7-10 ngày làm việc sau khi yêu cầu hoàn tiền được xác nhận.{"\n"}
          - Tiền hoàn trả sẽ được gửi về phương thức thanh toán ban đầu.{"\n\n"}

          4. Lưu ý: {"\n"}
          - Mọi giao dịch thanh toán đều tuân thủ các quy định về bảo mật và an toàn thông tin.{"\n"}
          - Trong trường hợp có lỗi hệ thống, vui lòng liên hệ bộ phận hỗ trợ khách hàng để được trợ giúp.{"\n\n"}

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
//sdhsydghsdsh
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

export default PaymentPolicyScreen;
