import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30, backgroundColor: '#fff', fontFamily: 'Helvetica' },
  header: { marginBottom: 20, borderBottom: 1, borderBottomColor: '#1976d2', paddingBottom: 10 },
  title: { fontSize: 18, color: '#1976d2', fontWeight: 'bold' },
  // Estilos de la Tabla
  table: { display: 'table', width: 'auto', borderStyle: 'solid', borderWidth: 0.5, borderColor: '#bfbfbf' },
  tableRow: { flexDirection: 'row', borderBottomColor: '#bfbfbf', borderBottomWidth: 0.5, alignItems: 'center', minHeight: 25 },
  tableColHeader: { backgroundColor: '#1976d2' },
  tableCellHeader: { fontSize: 8, fontWeight: 'bold', margin: 4, color: '#fff', textAlign: 'center' },
  tableCell: { fontSize: 8, margin: 4, textAlign: 'center' },
  // Anchos proporcionales para las columnas de la imagen
  colId: { width: '8%' },
  colName: { width: '22%' },
  colTellers: { width: '12%' },
  colIncome: { width: '18%' },
  colDate: { width: '15%' },
  colOpen: { width: '12%' },
  colBank: { width: '13%' },
  footer: { position: 'absolute', bottom: 20, textAlign: 'center', fontSize: 8, color: 'grey', width: '100%' }
});

const InformeSucursales = ({ rows }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Informe Detallado de Sucursales</Text>
        <Text style={{ fontSize: 9, color: '#666', marginTop: 4 }}>
          Documento generado el {new Date().toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableColHeader]}>
          <View style={styles.colId}><Text style={styles.tableCellHeader}>ID</Text></View>
          <View style={styles.colName}><Text style={styles.tableCellHeader}>NOMBRE</Text></View>
          <View style={styles.colTellers}><Text style={styles.tableCellHeader}>CAJEROS</Text></View>
          <View style={styles.colIncome}><Text style={styles.tableCellHeader}>INGRESOS (M)</Text></View>
          <View style={styles.colDate}><Text style={styles.tableCellHeader}>APERTURA</Text></View>
          <View style={styles.colOpen}><Text style={styles.tableCellHeader}>ESTADO</Text></View>
          <View style={styles.colBank}><Text style={styles.tableCellHeader}>ID BANCO</Text></View>
        </View>
        {rows.map((row, index) => (
          <View style={styles.tableRow} key={row.id || index} wrap={false}>
            <View style={styles.colId}><Text style={styles.tableCell}>{row.id}</Text></View>
            <View style={styles.colName}><Text style={[styles.tableCell, { textAlign: 'left' }]}>{row.name}</Text></View>
            <View style={styles.colTellers}><Text style={styles.tableCell}>{row.n_tellers}</Text></View>
            <View style={styles.colIncome}><Text style={styles.tableCell}>{row.monthly_income} €</Text></View>
            <View style={styles.colDate}><Text style={styles.tableCell}>{row.opening_date}</Text></View>
            <View style={styles.colOpen}>
              <Text style={styles.tableCell}>{row.open === 1 || row.open === true ? "Abierta" : "Cerrada"}</Text>
            </View>
            <View style={styles.colBank}><Text style={styles.tableCell}>{row.id_bank}</Text></View>
          </View>
        ))}
      </View>

      <Text 
        style={styles.footer} 
        render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`} 
        fixed 
      />
    </Page>
  </Document>
);

export default InformeSucursales;