import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, marginTop: 40, backgroundColor: '#fff', width: '85%', alignContent: 'center', alignSelf: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#222' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  label: { fontWeight: 'bold', color: '#222', marginRight: 8 },
  picker: { width: 100, height: 40 },
  orderContainer: { marginBottom: 32, padding: 12, borderWidth: 1, borderRadius: 8, borderColor: '#ccc', backgroundColor: '#f9f9f9' },
  orderTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 4, color: '#222' },
  lineItemsHeader: { marginTop: 8, fontWeight: 'bold', color: '#222' },
  lineItemHeaderRow: { flexDirection: 'row', borderBottomWidth: 1, paddingBottom: 4, marginTop: 4, borderColor: '#ccc' },
  headerCell: { flex: 1, fontWeight: 'bold', color: '#222' },
  lineItemRow: { flexDirection: 'row', paddingVertical: 4, borderBottomWidth: 0.5, borderColor: '#eee' },
  cell: { flex: 1, color: '#222' },
  noPrinted: { color: 'red', fontWeight: 'bold' },
  printButton: { marginVertical: 8 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 250,
    height: 65,
    marginRight: 12,
  },
  pageHeader: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
  },
    employeeInfoContainer: {
    backgroundColor: '#eef',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#ddd'
  },
  employeeInfoText: {
    fontSize: 16,
    color: '#333'
  },
  employeePOSIDInfoText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Pushes children to the start and end
    alignItems: 'center', // Aligns children vertically
    marginBottom: 24,
    width: '100%', // Ensure it spans the full width
  },
});