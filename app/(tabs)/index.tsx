import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Image, Text, View } from 'react-native';
import Login from '../../components/Login';
import stores from '../../src/config/stores';
import { printOrder, hasUnprintedItems, fetchOrders, getEmployeeData } from '../../src/services/CloverApi';
import { LineItem, Order, POSEmployee, SocialUser, Store } from '../../src/types';
import { styles } from '../../src/styles/HomeScreen.styles';

const orderStates = [
  { label: 'All', value: '' },
  { label: 'Open', value: '&filter=state%3Dopen' }
];

export default function HomeScreen() {
  const [socialUser, setSocialUser] = useState<SocialUser | null>(null);
  const [employee, setEmployee] = useState<POSEmployee | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [selectedState, setSelectedState] = useState<string>('&filter=state%3Dopen');

  useEffect(() => {
    if (socialUser && selectedStore) {
      getEmployeeData(socialUser, selectedStore)
        .then(posEmployee => setEmployee(posEmployee))
    }
  }, [socialUser, selectedStore]);

  useEffect(() => {
    if (!selectedStore || !employee) return;
    setLoading(true);
    fetchOrders(selectedStore, selectedState, employee)
      .then((data) => setOrders(data))
      .catch((error) => console.error("Failed to load orders:", error))
      .finally(() => setLoading(false));
  }, [selectedStore, selectedState]);

  const renderLineItem = ({ item }: { item: LineItem }) => (
    <View style={styles.lineItemRow}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>${(item.price / 100).toFixed(2)}</Text>
      {item.printed ? (
        <Text style={styles.cell}>Yes</Text>
      ) : (
        <Text style={[styles.cell, styles.noPrinted]}>No</Text>
      )}
    </View>
  );

  const renderOrder = ({ item }: { item: Order }) => {
    let createdDisplay = new Date(item.createdTime).toLocaleString('en-US', {
      timeZone: 'America/Chicago',
    });

    return (
      <View style={styles.orderContainer}>
        {selectedStore && (
          <Button
            title="Print"
            onPress={() => printOrder(item, selectedStore)}
            color="#007bff"
            disabled={!hasUnprintedItems(item)}
          />
        )}
        <Text style={styles.orderTitle}>Order ID: {item.id}</Text>
        <Text>Title: {item.title}</Text>
        <Text>Total: ${(item.total / 100).toFixed(2)}</Text>
        <Text>Payment State: {item.paymentState}</Text>
        <Text>Note: {item.note}</Text>
        <Text>Created Date: {createdDisplay}</Text>
        <Text style={styles.lineItemsHeader}>Line Items:</Text>
        <View style={styles.lineItemHeaderRow}>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.headerCell}>Price</Text>
          <Text style={styles.headerCell}>Printed</Text>
        </View>
        <FlatList
          data={item.lineItems?.elements || []}
          keyExtractor={(li) => li.id}
          renderItem={renderLineItem}
        />
      </View>
    );
  };

  return (
    <>
      {!socialUser ? (
        <Login onLogin={setSocialUser} />
      ) : (

        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.header}>
              <Image
                source={require('../../assets/images/spice-mantra.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.pageHeader}>Spice Mantra Orders</Text>
            </View>
            <View style={styles.employeeInfoContainer}>
              <Text style={styles.employeeInfoText}>Email: {socialUser.email}</Text>
              <Text style={styles.employeeInfoText}>Employee ID: {socialUser.id}</Text>
              <Text style={styles.employeePOSIDInfoText}>POS ID: {employee?.id}</Text>
              <Text style={styles.employeePOSIDInfoText}>POS Employee Name: {employee?.name}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Select Store:</Text>
            <Picker
              selectedValue={selectedStore?.id}
              onValueChange={(storeId) => {
                const store = stores.find(s => s.id === storeId) || null;
                setSelectedStore(store);
              }}
              style={styles.picker}
            >
              <Picker.Item label="Select Store" value={null} />
              {stores.map((store) => (
                <Picker.Item key={store.id} label={store.name} value={store.id} />
              ))}
            </Picker>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Order State:</Text>
            <Picker
              selectedValue={selectedState}
              onValueChange={(value) => setSelectedState(value)}
              style={styles.picker}
            >
              {orderStates.map((state) => (
                <Picker.Item key={state.label} label={state.label} value={state.value} />
              ))}
            </Picker>
          </View>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={orders}
              keyExtractor={(order) => order.id}
              renderItem={renderOrder}
            />
          )}
        </View>)}
    </>
  );
}