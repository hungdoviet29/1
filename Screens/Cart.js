import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

const CartScreen = () => {
  const [userId, setUserId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigation = useNavigation();
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (id) {
          console.log('Retrieved userId:', id);
          setUserId(id);
          fetchCartItems(id);
        } else {
          Alert.alert('Error', 'User ID not found. Please log in again.');
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
        Alert.alert('Error', 'Failed to retrieve user ID.');
      }
    };

    fetchUserId(); // Chỉ gọi một lần khi màn hình được lần đầu tiên render
  }, []); // [] để chỉ gọi một lần khi component được mount lần đầu

  useFocusEffect(
    React.useCallback(() => {
      // Kiểm tra lại khi màn hình focus và `userId` đã có
      if (userId) {
        fetchCartItems(userId);
      }
    }, [userId]), // Chỉ chạy lại khi `userId` thay đổi
  );
  const toggleSelectItem = (productId) => {
    setSelectedItems((prevSelected) => {
        if (prevSelected.includes(productId)) {
            return prevSelected.filter((id) => id !== productId); // Bỏ chọn
        } else {
            return [...prevSelected, productId]; // Chọn thêm
        }
    });
};
const calculateSelectedTotal = () => {
  return cartItems
      .filter((item) => selectedItems.includes(item.productId?._id))
      .reduce((sum, item) => {
          return sum + item.productId.gia * item.quantity;
      }, 0);
};

const toggleSelectAll = () => {
  if (selectedItems.length === cartItems.length) {
      setSelectedItems([]); // Bỏ chọn tất cả
  } else {
      setSelectedItems(cartItems.map((item) => item.productId?._id)); // Chọn tất cả
  }
};


  const fetchCartItems = async id => {
    try {
      const response = await fetch(`http://192.168.0.245:3000/cart/${id}`);
      const data = await response.json();
      console.log('Cart API Response:', data);
      if (response.ok) {
        setCartItems(data.items || []);
        calculateTotal(data.items || []);
      } else {
        Alert.alert('Error', data.message || 'Failed to load cart.');
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      Alert.alert(
        'Error',
        'Unable to connect to the server. Please try again later.',
      );
    }
  };

  const calculateTotal = items => {
    const total = items.reduce((sum, item) => {
      if (item.productId?.gia && item.quantity) {
        return sum + item.productId.gia * item.quantity;
      }
      return sum;
    }, 0);
    setTotalAmount(total);
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      Alert.alert('Error', 'Quantity must be at least 1.');
      return;
    }

    // Optimistic Update
    const updatedCartItems = cartItems.map(item =>
      item.productId._id === productId
        ? {...item, quantity: newQuantity}
        : item,
    );
    setCartItems(updatedCartItems);
    calculateTotal(updatedCartItems);

    try {
      const response = await fetch('http://192.168.0.245:3000/cart/update', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId, productId, quantity: newQuantity}),
      });
      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      Alert.alert('Error', 'Unable to update quantity. Please try again.');
      // Rollback optimistic update
      fetchCartItems(userId);
    }
  };

  const handleRemoveItem = async productId => {
    try {
      const response = await fetch('http://192.168.0.245:3000/cart/remove', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId, productId}),
      });
      const data = await response.json();
      if (response.ok) {
        fetchCartItems(userId); // Gọi lại API để làm mới dữ liệu
      } else {
        Alert.alert('Error', data.message || 'Failed to remove item.');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      Alert.alert(
        'Error',
        'Unable to connect to the server. Please try again later.',
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Cart</Text>
      </View>
      <ScrollView contentContainerStyle={styles.cartContainer}>
    {cartItems.length > 0 ? (
        cartItems.map((item) => (
            <View key={item.productId?._id || item._id} style={styles.cartItem}>
                {/* Checkbox */}
                <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => toggleSelectItem(item.productId?._id)}
                >
                    {selectedItems.includes(item.productId?._id) && (
                        <View style={styles.checkboxSelected} />
                    )}
                </TouchableOpacity>

                {/* Product Details */}
                <Image
                    source={{ uri: item.productId?.hinhAnh }}
                    style={styles.itemImage}
                />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>
                        {item.productId?.ten || 'Unknown Product'}
                    </Text>
                    <Text style={styles.itemPrice}>
                        {item.productId?.gia
                            ? `${item.productId.gia.toLocaleString()} VND`
                            : 'Price unavailable'}
                    </Text>
                </View>
                <View style={styles.itemActions}>
                    <TouchableOpacity
                        onPress={() =>
                            handleUpdateQuantity(
                                item.productId?._id,
                                item.quantity - 1
                            )
                        }
                        style={styles.quantityButton}
                    >
                        <Text style={styles.quantityText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                        onPress={() =>
                            handleUpdateQuantity(
                                item.productId?._id,
                                item.quantity + 1
                            )
                        }
                        style={styles.quantityButton}
                    >
                        <Text style={styles.quantityText}>+</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity

                    onPress={() => handleRemoveItem(item.productId?._id)}
                >
                    <Text style={styles.removeItemText}>✕</Text>
                </TouchableOpacity>

            </View>
        ))
    ) : (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
    )}

</ScrollView>

<View style={styles.checkoutBa}>
<TouchableOpacity style={styles.selectAllButton} onPress={toggleSelectAll}>
    <Text style={styles.selectAllText}>
        {selectedItems.length === cartItems.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
    </Text>
</TouchableOpacity>
</View>
      <View style={styles.checkoutBar}>


<TouchableOpacity
    style={styles.checkoutButton}
    onPress={() =>
        navigation.navigate('Checkout', {
            selectedItems: cartItems.filter((item) =>
                selectedItems.includes(item.productId?._id)
            ),
            totalAmount: calculateSelectedTotal(),
        })
    }
>

    <Text style={styles.checkoutText}>Checkout</Text>
    <Text style={styles.totalAmount}>
        {`${calculateSelectedTotal().toLocaleString()} VND`}
    </Text>
</TouchableOpacity>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  totalAmount: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    marginBottom: 60,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#F68B1E',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  icon: {
    width: 24,
    height: 24,
  },
  cartContainer: {
    paddingHorizontal: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F4FA',
    borderRadius: 10,
    marginVertical: 10,
    padding: 16,
  },
  itemImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  quantityButton: {
    padding: 6,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  removeItemText: {
    fontSize: 20,
    color: '#E57373',
    fontWeight: 'bold',
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
  },
  checkoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F8B400',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  checkoutBa: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 56,
    paddingHorizontal: 32,
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkoutText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
},
checkboxSelected: {
    width: 12,
    height: 12,
    backgroundColor: '#f68b1e',
    borderRadius: 2,
},
selectAllButton: {
  backgroundColor: '#f68b1e',
  padding: 10,
  borderRadius: 8,
  alignItems: 'center',
  marginVertical: 10,
},
selectAllText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},


});

export default CartScreen;







// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useFocusEffect} from '@react-navigation/native';
// import {useNavigation} from '@react-navigation/native';

// const CartScreen = () => {
//   const [userId, setUserId] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const navigation = useNavigation();
//   const [selectedItems, setSelectedItems] = useState([]);

//   useEffect(() => {
//     const fetchUserId = async () => {
//       try {
//         const id = await AsyncStorage.getItem('userId');
//         if (id) {
//           console.log('Retrieved userId:', id);
//           setUserId(id);
//           fetchCartItems(id);
//         } else {
//           Alert.alert('Error', 'User ID not found. Please log in again.');
//         }
//       } catch (error) {
//         console.error('Error fetching user ID:', error);
//         Alert.alert('Error', 'Failed to retrieve user ID.');
//       }
//     };

//     fetchUserId();
//   }, []);

//   useFocusEffect(
//     React.useCallback(() => {
//       if (userId) {
//         fetchCartItems(userId);
//       }
//     }, [userId]),
//   );

//   const toggleSelectItem = (productId) => {
//     setSelectedItems((prevSelected) => {
//       if (prevSelected.includes(productId)) {
//         return prevSelected.filter((id) => id !== productId);
//       } else {
//         return [...prevSelected, productId];
//       }
//     });
//   };

//   const calculateSelectedTotal = () => {
//     return cartItems
//       .filter((item) => selectedItems.includes(item.productId?._id))
//       .reduce((sum, item) => {
//         return sum + item.productId.gia * item.quantity;
//       }, 0);
//   };

//   const toggleSelectAll = () => {
//     if (selectedItems.length === cartItems.length) {
//       setSelectedItems([]);
//     } else {
//       setSelectedItems(cartItems.map((item) => item.productId?._id));
//     }
//   };

//   const fetchCartItems = async (id) => {
//     try {
//       const response = await fetch(`http://192.168.1.19:3000/cart/${id}`);
//       const data = await response.json();
//       console.log('Cart API Response:', data);
//       if (response.ok) {
//         setCartItems(data.items || []);
//         calculateTotal(data.items || []);
//       } else {
//         Alert.alert('Error', data.message || 'Failed to load cart.');
//       }
//     } catch (error) {
//       console.error('Error fetching cart:', error);
//       Alert.alert(
//         'Error',
//         'Unable to connect to the server. Please try again later.',
//       );
//     }
//   };

//   const calculateTotal = (items) => {
//     const total = items.reduce((sum, item) => {
//       if (item.productId?.gia && item.quantity) {
//         return sum + item.productId.gia * item.quantity;
//       }
//       return sum;
//     }, 0);
//     setTotalAmount(total);
//   };

//   const handleUpdateQuantity = async (productId, newQuantity) => {
//     if (newQuantity < 1) {
//       Alert.alert('Error', 'Quantity must be at least 1.');
//       return;
//     }

//     const updatedCartItems = cartItems.map((item) =>
//       item.productId._id === productId
//         ? {...item, quantity: newQuantity}
//         : item,
//     );
//     setCartItems(updatedCartItems);
//     calculateTotal(updatedCartItems);

//     try {
//       const response = await fetch('http://192.168.1.19:3000/cart/update', {
//         method: 'PUT',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({userId, productId, quantity: newQuantity}),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to update quantity');
//       }
//     } catch (error) {
//       console.error('Error updating quantity:', error);
//       Alert.alert('Error', 'Unable to update quantity. Please try again.');
//       fetchCartItems(userId);
//     }
//   };

//   const handleRemoveItem = async (productId) => {
//     try {
//       const response = await fetch('http://192.168.1.19:3000/cart/remove', {
//         method: 'DELETE',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({userId, productId}),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         fetchCartItems(userId);
//       } else {
//         Alert.alert('Error', data.message || 'Failed to remove item.');
//       }
//     } catch (error) {
//       console.error('Error removing item:', error);
//       Alert.alert(
//         'Error',
//         'Unable to connect to the server. Please try again later.',
//       );
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>My Cart</Text>
//       </View>

//       <ScrollView contentContainerStyle={styles.cartContainer}>
//         {cartItems.length > 0 ? (
//           cartItems.map((item) => (
//             <View key={item.productId?._id || item._id} style={styles.cartItem}>
//               <TouchableOpacity
//                 style={styles.checkbox}
//                 onPress={() => toggleSelectItem(item.productId?._id)}
//               >
//                 {selectedItems.includes(item.productId?._id) && (
//                   <View style={styles.checkboxSelected} />
//                 )}
//               </TouchableOpacity>

//               <Image
//                 source={{uri: item.productId?.hinhAnh}}
//                 style={styles.itemImage}
//               />
//               <View style={styles.itemDetails}>
//                 <Text style={styles.itemName}>
//                   {item.productId?.ten || 'Unknown Product'}
//                 </Text>
//                 <Text style={styles.itemPrice}>
//                   {item.productId?.gia
//                     ? `${item.productId.gia.toLocaleString()} VND`
//                     : 'Price unavailable'}
//                 </Text>
//               </View>

//               <View style={styles.itemActions}>
//                 <TouchableOpacity
//                   onPress={() =>
//                     handleUpdateQuantity(
//                       item.productId?._id,
//                       item.quantity - 1,
//                     )
//                   }
//                   style={styles.quantityButton}
//                 >
//                   <Text style={styles.quantityText}>-</Text>
//                 </TouchableOpacity>
//                 <Text style={styles.quantityText}>{item.quantity}</Text>
//                 <TouchableOpacity
//                   onPress={() =>
//                     handleUpdateQuantity(
//                       item.productId?._id,
//                       item.quantity + 1,
//                     )
//                   }
//                   style={styles.quantityButton}
//                 >
//                   <Text style={styles.quantityText}>+</Text>
//                 </TouchableOpacity>
//               </View>

//               <TouchableOpacity
//                 onPress={() => handleRemoveItem(item.productId?._id)}
//               >
//                 <Text style={styles.removeItemText}>✕</Text>
//               </TouchableOpacity>
//             </View>
//           ))
//         ) : (
//           <Text style={styles.emptyCartText}>Your cart is empty.</Text>
//         )}
//       </ScrollView>

//       <View style={styles.selectAllContainer}>
//         <TouchableOpacity
//           style={styles.selectAllButton}
//           onPress={toggleSelectAll}
//         >
//           <Text style={styles.selectAllText}>
//             {selectedItems.length === cartItems.length
//               ? 'Unselect All'
//               : 'Select All'}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.checkoutBar}>
//         <TouchableOpacity
//           style={styles.checkoutButton}
//           onPress={() =>
//             navigation.navigate('Checkout', {
//               selectedItems: cartItems.filter((item) =>
//                 selectedItems.includes(item.productId?._id),
//               ),
//               totalAmount: calculateSelectedTotal(),
//             })
//           }
//         >
//           <Text style={styles.checkoutText}>Checkout</Text>
//           <Text style={styles.totalAmount}>
//             {`${calculateSelectedTotal().toLocaleString()} VND`}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   header: {
//     paddingHorizontal: 16,
//     paddingVertical: 20,
//     backgroundColor: '#F68B1E',
//     alignItems: 'center',
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//   },
//   cartContainer: {
//     paddingHorizontal: 16,
//     paddingBottom: 80,
//   },
//   cartItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FAFAFA',
//     borderRadius: 10,
//     marginVertical: 8,
//     padding: 16,
//     elevation: 1,
//   },
//   itemImage: {
//     width: 60,
//     height: 60,
//     resizeMode: 'cover',
//     marginRight: 12,
//     borderRadius: 6,
//   },
//   itemDetails: {
//     flex: 1,
//   },
//   itemName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333333',
//     marginBottom: 4,
//   },
//   itemPrice: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#F68B1E',
//   },
//   itemActions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   quantityButton: {
//     padding: 8,
//     backgroundColor: '#EEEEEE',
//     borderRadius: 4,
//   },
//   quantityText: {
//     marginHorizontal: 10,
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333333',
//   },
//   removeItemText: {
//     fontSize: 20,
//     color: '#FF5A5F',
//     fontWeight: 'bold',
//   },
//   emptyCartText: {
//     textAlign: 'center',
//     fontSize: 18,
//     color: '#888888',
//     marginTop: 50,
//   },
//   selectAllContainer: {
//     padding: 16,
//     borderTopWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   selectAllButton: {
//     backgroundColor: '#F68B1E',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   selectAllText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   checkoutBar: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#F68B1E',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//   },
//   checkoutButton: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     flex: 1,
//   },
//   checkoutText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//   },
//   totalAmount: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//   },
//   checkbox: {
//     width: 24,
//     height: 24,
//     borderWidth: 2,
//     borderColor: '#F68B1E',
//     borderRadius: 4,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 12,
//   },
