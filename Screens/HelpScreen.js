import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HelpScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../acssets/BackButton.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Help</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Policy List */}
      <View style={styles.policyContainer}>
        <TouchableOpacity
          style={styles.policyButton}
          onPress={() => navigation.navigate('Membershippolicy')}
        >
          <Text style={styles.policyText}>Chính sách thành viên</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.policyButton}
          onPress={() => navigation.navigate('ReturnPolicyScreen')}
        >
          <Text style={styles.policyText}>Chính sách đổi trả</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.policyButton}
          onPress={() => navigation.navigate('WarrantyPolicyScreen')}
        >
          <Text style={styles.policyText}>Chính sách bảo hành</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.policyButton}
          onPress={() => navigation.navigate('PaymentPolicyScreen')}
        >
          <Text style={styles.policyText}>Chính sách thanh toán</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity>
          <Image source={require('../acssets/home.png')} style={styles.iconNav} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../acssets/BasketIcon.png')} style={styles.iconNav} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../acssets/Vector.png')} style={styles.iconNav} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../acssets/profile.png')} style={styles.iconNav} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
//dùhdufhd

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSpacer: {
    width: 24,
  },
  policyContainer: {
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    margin: 20,
    paddingVertical: 20,
  },
  policyButton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  policyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 30,
    backgroundColor: '#f1f1f1',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconNav: {
    width: 24,
    height: 24,
  },
});

export default HelpScreen;
