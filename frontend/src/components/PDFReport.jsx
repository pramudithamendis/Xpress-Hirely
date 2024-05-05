// PDFReport.js
import React from "react";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: 'auto', flexDirection: 'row' },
  tableCol: { width: '140px', borderStyle: 'solid', borderColor: '#bfbfbf', borderWidth: 1, padding: 5 },
  
  
});

const PDFReport = ({ data }) => (
  <Document>
    <Page size="A1" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Vehicle Details Report</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text>Owner Name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>Owner Email</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>VIN</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>Brand</Text>
              </View>
              <View style={styles.tableCol}>
              <Text>Model</Text>
             </View>
              <View style={styles.tableCol}>
              <Text>Year</Text>
              </View>
              <View style={styles.tableCol}>
              <Text>Fuel Comsumption</Text>
              </View>
              <View style={styles.tableCol}>
              <Text>Color</Text>
              </View>
              <View style={styles.tableCol}>
              <Text>Company</Text>
              </View>
              <View style={styles.tableCol}>
              <Text>Price per km</Text>
              </View>
              <View style={styles.tableCol}>
              <Text>Features</Text>
              </View>
          </View>
          {data.map(vehicle => (
            <View style={styles.tableRow} key={vehicle._id}>
              <View style={styles.tableCol}>
                <Text>{vehicle.owner_Name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{vehicle.owner_Email}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{vehicle.VIN}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{vehicle.brand}</Text>
                </View>
                <View style={styles.tableCol}>
                <Text>{vehicle.model}</Text>
                </View> 
                <View style={styles.tableCol}>
                <Text>{vehicle.year}</Text>
                </View>
                <View style={styles.tableCol}>
                <Text>{vehicle.fuel_consumption}</Text>
                </View> 
                <View style={styles.tableCol}>
                <Text>{vehicle.color}</Text>
                </View> 
                <View style={styles.tableCol}>
                <Text>{vehicle.company}</Text>
                </View>
                <View style={styles.tableCol}>
                <Text>{vehicle.price_per_km}</Text>
                </View>
                <View style={styles.tableCol}>
                <Text>{vehicle.features}</Text>
                </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default PDFReport;
