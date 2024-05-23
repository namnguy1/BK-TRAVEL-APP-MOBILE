import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BASE_URL } from '../api';
import Toast from 'react-native-toast-message';
const TableVoucher = ({ orderId, token,isReload,setIsReload }) => {
  console.log('order id :', typeof orderId);
  
  const [listVoucher, setListVoucher] = useState([]);
  const handleGetAllVoucherInOrder = useCallback(async () => {
    try {
      const order_id = orderId;
      // console.log(`/api/v1/orders/${orderId}/vouchers`);
      const response = await axios.get(`${BASE_URL}/api/v1/orders/${order_id}/vouchers`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      if (response?.status === 200) {
        setListVoucher(response.data.vouchers.vouchers);
      }
    } catch (error) {
      console.error(error);
    }
  }, [token]);
  const handleRemoveVoucher = useCallback(async (codeVoucher) => {
    const requestBody = {
      order_id: orderId,
      code: codeVoucher,
    };
    console.log('requestBody', requestBody);
    const response = await axios.put(`${BASE_URL}/api/v1/orders/vouchers`, requestBody, {
      headers: {
        Authorization: `${token}`,
      },
    });
    if (response?.status === 200) {
      setIsReload(prev => !prev);
      Toast.show({
          type: 'success',
          text1: 'Cập nhập thông tin thành công',
          text2: 'Thông tin của bạn đã được cập nhập👋'
      });
  } else {
      Toast.show({
          type: 'error',
          text1: 'Cập nhập thông tin không thành công',
          text2: 'Vui lòng thử lại sau👋'
      });
  }


  }, [token]);
  useEffect(() => {
    handleGetAllVoucherInOrder();
  }, [handleGetAllVoucherInOrder, isReload]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách ưu đãi đã được áp dụng</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.header}>Mã giảm giá</Text>
          <Text style={styles.header}>Giá giảm</Text>
        </View>
        {listVoucher.length === 0 ? (
          <View style={styles.row}>
            <Text style={styles.cell}>None</Text>
          </View>
        ) : (
          listVoucher.map((voucher) => (
            <View key={voucher.code_voucher} style={styles.row}>
              <Text style={styles.cell}>{voucher.code_voucher}</Text>
              <View style={styles.discountCell}>
                <Text style={styles.discountText}>- {voucher.value_discount} VNĐ</Text>
                <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveVoucher(voucher.code_voucher)}>
                  <Text style={styles.removeButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 'bold'
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  header: {
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
  },
  discountCell: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountText: {
    color: 'red',
  },
  removeButton: {
    marginLeft: 8,
    padding: 4,
  },
  removeButtonText: {
    color: 'blue',
  },
});

export default TableVoucher;