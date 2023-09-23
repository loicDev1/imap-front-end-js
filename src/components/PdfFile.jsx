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
import {
  getLocalStorage,
  LS_USER_KEY,
  firstLetterUc,
  addZeroOrNo,
  formatDate,
  formatHours,
} from '../helpers/utils';

const pageColors = ['#f6d186', '#f67280', '#c06c84'];

const styles = StyleSheet.create({
  page: {
    position: 'relative',
    padding: '10px',
  },

  margeTextBas: {
    margin: '5px 0px',
    // textDecoration : 'underline'
  },

  // view : {
  //   position: 'absolute'
  // },

  // centerImage: {
  //   alignItems: 'center',
  //   flexGrow: 1,
  // },
  text: { display: 'block', width: '100%', textAlign: 'center' },
});

function PdfFile({ interventionData, admin }) {
  const currentUser = getLocalStorage(LS_USER_KEY);
  return (
    <Document>
      <Page style={styles.page} size="A4">
        <View>
          <View
            style={{
              position: 'absolute',
              fontSize: '12px',
              width: '230px',
            }}
          >
            <Text style={styles.text}> REPUBLIQUE DU CAMEROUN </Text>
            <Text style={styles.text}> ........... </Text>
            <Text style={styles.text}> Paix - Travail - Patrie</Text>
            <Text style={styles.text}> ........... </Text>
            <Text style={styles.text}> MINISTERE DE LA SANTE PUBLIQUE </Text>
            <Text style={styles.text}> ........... </Text>
            <Text style={styles.text}> HOPITAL GENERAL DE YAOUNDE </Text>
            <Text style={styles.text}> ........... </Text>
            <Text style={styles.text}> DIRECTION GENERALE </Text>
            <Text style={styles.text}> ........... </Text>
            <Text style={styles.text}> CELLULE INFORMATIQUE ET DES </Text>
            <Text style={styles.text}> STATISTIQUES </Text>
          </View>

          <Image
            style={{
              position: 'absolute',
              top: '30px',
              left: '240px',
              width: '100px',
              height: '100px',
            }}
            src={logo}
          />

          <View
            style={{
              position: 'absolute',
              right: '0px',
              fontSize: '12px',
              width: '230px',
            }}
          >
            <Text style={styles.text}> REPUBLIC OF CAMEROON </Text>
            <Text style={styles.text}> ........... </Text>
            <Text style={styles.text}> Peace - Work - Fatherland</Text>
            <Text style={styles.text}> ........... </Text>
            <Text style={styles.text}> MINISTRY OF PUBLIC HEALTH </Text>
            <Text style={styles.text}> ........... </Text>
            <Text style={styles.text}> GENERAL HOSPITAL OF YAOUNDE </Text>
            <Text style={styles.text}> ........... </Text>
            <Text style={styles.text}> GENARAL MANAGEMENT DEPARTMENT </Text>
            <Text style={styles.text}> ........... </Text>
            <Text style={styles.text}> COMPUTING AND STATISTICS UNIT </Text>
            {/* <Text> STATISTIQUES </Text> */}
          </View>
        </View>

        <View
          style={{
            position: 'relative',
            fontSize: '20px',
            fontWeigth: '1000',
            textAlign: 'center',
            padding: '15px 10px',
            width: '450px',
            top: '230px',
            left: '60px',
            margin: '20px , auto',
            borderRadius: '5px',
            border: '2px solid aqua',
          }}
        >
          <Text>
            {' '}
            FICHE DE DEMANDE D'INTERVENTION OU DE MAINTENANCE INFORMATIQUE{' '}
          </Text>
        </View>

        <View
          style={{
            position: 'absolute',
            top: '360px',
            padding: '20px',
            fontSize: '15px',
          }}
        >
          <Text style={styles.margeTextBas}>
            {' '}
            Nom(s) / qualité du demandeur :{' '}
            {`${firstLetterUc(currentUser.nom)} ${firstLetterUc(
              currentUser.prenom
            )}`}{' '}
          </Text>
          <Text style={styles.margeTextBas}>
            {' '}
            Service d'appartenance : {firstLetterUc(currentUser.service)}{' '}
          </Text>
          <Text style={styles.margeTextBas}>
            {' '}
            Date de sollicitation de l'intervention :{' Le '}
            {formatDate(interventionData.createdAt)}
          </Text>
          <Text style={styles.margeTextBas}>
            {' '}
            Heure : {formatHours(interventionData.createdAt)}{' '}
          </Text>
          <Text style={styles.margeTextBas}>
            {' '}
            Probleme : {interventionData.description}{' '}
          </Text>
        </View>

        <View
          style={{
            position: 'absolute',
            top: '600px',
            textAlign: 'center',
            width: '100%',
            fontSize: '15px',
          }}
        >
          <Text style={{ textDecoration: 'underline' }}>
            {' '}
            {admin
              ? 'Nom et Acusé de reception du maintenancier'
              : "Nom et Signature du demandeur de l'intervention"}{' '}
          </Text>
        </View>

        {/* <View style={styles.text}>
        InterventionData
        <Text> azeaze </Text>
        <Text> azeaze </Text>
      </View>
      <Text style={styles.text}>
        Learn more at 
      </Text> */}
      </Page>
    </Document>
  );
}

export default PdfFile;
