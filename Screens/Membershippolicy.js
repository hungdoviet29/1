import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const MembershipPolicy = ({ navigation }) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgree = () => {
    if (isAgreed) {
      navigation.navigate('NextScreen');
    } else {
      Alert.alert("Vui lòng đọc và đồng ý với chính sách để tiếp tục.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Membership Policy</Text>
      <ScrollView style={styles.policyContainer}>
        <Text style={styles.policyText}>
          {/* Nội dung chính sách thành viên */}
          1. Điều khoản 1: Điều khoản đăng ký thành viên {"\n\n"}
          - Người dùng phải cung cấp thông tin chính xác và cập nhật khi đăng ký thành viên.{"\n"}
          - Mỗi cá nhân hoặc tổ chức chỉ được đăng ký một tài khoản thành viên trên ứng dụng.{"\n"}
          - Tài khoản thành viên là duy nhất và không được chuyển nhượng hoặc chia sẻ với người khác.{"\n\n"}
          
          2. Điều khoản 2: Phân loại và quyền lợi thành viên {"\n\n"}
          - Ứng dụng có thể cung cấp các cấp độ thành viên khác nhau, như Thành viên cơ bản, Thành viên VIP, v.v. Mỗi cấp độ sẽ có quyền lợi riêng biệt (như giảm giá, ưu tiên mua hàng, tích điểm thưởng, v.v.).{"\n"}
          - Quyền lợi của mỗi cấp độ thành viên sẽ được công khai và có thể thay đổi dựa trên chính sách của ứng dụng.{"\n\n"}
          
          3. Điều khoản 3: Phí và gia hạn thành viên {"\n\n"}
          - Nếu có, phí thành viên sẽ được thanh toán theo định kỳ và có thể tự động gia hạn trừ khi thành viên chọn hủy.{"\n"}
          - Các khoản phí này không được hoàn lại, trừ khi có quy định khác trong các trường hợp cụ thể.{"\n"}
          - Thông tin về phí và các điều kiện gia hạn sẽ được thông báo rõ ràng trước khi thanh toán.{"\n\n"}
          4. Điều khoản 4: Chính sách tích điểm và đổi thưởng : {"\n\n"}
          -Thành viên có thể tích điểm thưởng khi mua hàng hoặc tham gia các hoạt động khác trên ứng dụng.{"\n"}
          -Điểm thưởng có thể được đổi thành các ưu đãi, giảm giá hoặc quà tặng, tuỳ thuộc vào các chương trình mà ứng dụng cung cấp.{"\n"}
          -Điểm thưởng có thời hạn và sẽ hết hạn nếu không sử dụng.{"\n\n"}
          5. Điều khoản 5: Quy định về hủy thành viên: {"\n\n"}
          -Thành viên có quyền hủy tài khoản thành viên bất kỳ lúc nào.{"\n"}
          -Nếu thành viên hủy tài khoản giữa chu kỳ thanh toán, họ sẽ không được hoàn lại phí đã thanh toán.{"\n"}
          -Khi hủy, mọi quyền lợi của thành viên (bao gồm điểm thưởng và các ưu đãi) sẽ bị mất.{"\n\n"}
          6. Điều khoản 6: Chính sách bảo mật và sử dụng dữ liệu: {"\n\n"}
          -Ứng dụng cam kết bảo mật thông tin cá nhân của thành viên theo chính sách bảo mật của mình.{"\n"}
          -Dữ liệu cá nhân của thành viên chỉ được sử dụng cho mục đích quản lý tài khoản, cải thiện dịch vụ và cung cấp ưu đãi cá nhân hóa.{"\n\n"}
          7. Điều khoản 7: Quyền hạn của ứng dụng:{"\n\n"}
          -Ứng dụng có quyền tạm ngưng hoặc hủy bỏ tư cách thành viên nếu phát hiện thành viên vi phạm các điều khoản, chẳng hạn như gian lận điểm thưởng hoặc cung cấp thông tin không chính xác.{"\n"}
          -Ứng dụng có thể thay đổi các điều khoản của chính sách thành viên theo thời gian và sẽ thông báo cho thành viên trước khi thay đổi có hiệu lực.{"\n\n"}
          8. Điều khoản 8: Hỗ trợ và giải quyết tranh chấp: {"\n\n"}
          -Ứng dụng sẽ cung cấp dịch vụ hỗ trợ khách hàng cho thành viên, đảm bảo giải quyết các vấn đề liên quan đến tài khoản, quyền lợi hoặc tranh chấp.{"\n"}
          -Trong trường hợp có tranh chấp, ứng dụng sẽ ưu tiên giải quyết qua các phương thức hòa giải trước khi tiến hành các bước pháp lý.{"\n\n"}
          9. Điều khoản 9: Cam kết của thành viên: {"\n\n"}
          -Thành viên cam kết tuân thủ các điều khoản và không lạm dụng các ưu đãi hoặc quyền lợi của mình.{"\n"}
          -Thành viên chịu trách nhiệm bảo vệ thông tin tài khoản cá nhân, tránh chia sẻ với người khác để bảo đảm an toàn.{"\n\n"}
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
//vbcbvc

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
    marginBottom: 30,
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
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MembershipPolicy;
