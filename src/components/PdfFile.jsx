import React from 'react';
import logo from '../img/logo hgy.png';
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  View,
} from '@react-pdf/renderer';

const pageColors = ['#f6d186', '#f67280', '#c06c84'];

const styles = StyleSheet.create({
  page: {
    flexDirection: "column"
  },
  image: {
    width: "50%",
    padding: 10
  },
  centerImage: {
    alignItems: "center",
    flexGrow: 1
  },
  text: {
    width: "100%",
    border: '1px solid green',
    display: "block",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 50,
    paddingVertical: 30,
    color: "red"
  }
});

function PdfFile({ data }) {
  return (
    <Document>
    <Page style={styles.page} size="A4">
      <View style={styles.centerImage}>
        <Image style={styles.image} src="/pspdfkit-logo.png" />
      </View>
      <View style={styles.text}>
        <Text> azeaze </Text>
        <Text> azeaze </Text>
      </View>
      <Text style={styles.text}>
        Learn more at 
      </Text>
    </Page>
  </Document>
  );
}

export default PdfFile;
