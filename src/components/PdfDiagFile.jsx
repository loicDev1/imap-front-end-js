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

function PdfDiagFile({ diagData: data }) {
  console.log('diagData : ', data);
  const currentUser = getLocalStorage(LS_USER_KEY);
  return (
    <Document>
      <Page>
        <View>
          <View>
            <Image
              style={{
                position: 'absolute',
                top: '10px',
                left: '20px',
                width: '80px',
                height: '80px',
              }}
              src={logo}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              //left: '100px',
              top: '100px',
              width: '100%',
              textAlign: 'center',
              textDecoration: 'underline',
              fontSize: '20px',
              fontWeight: '1000',
            }}
          >
            <Text>Fiche de diagnostic</Text>
          </View>
          <View
            style={{
              position: 'absolute',
              left: '50px',
              top: '150px',
              width: '500px',
            }}
          >
            <View style={{ width: '500px' }}>
              <Text
                style={{
                  border: '1px solid black',
                  padding: '5px 5px 5px 15px',
                  fontSize: '15px',
                }}
              >
                Nom Technicien
              </Text>
              <Text
                style={{
                  position: 'absolute',
                  left: '150px',
                  width: '100%',
                  height: '100%',
                  padding: '5px 5px 5px 15px',
                  borderLeft: '1px solid black',
                  fontSize: '13px',
                }}
              >
                {data.user.nom.toUpperCase() +
                  '  ' +
                  firstLetterUc(data.user.prenom)}
              </Text>
              <Text
                style={{
                  border: '1px solid black',
                  padding: '5px 5px 5px 15px',
                  fontSize: '15px',
                  fontWeight: 'extrabold',
                }}
              >
                Date
              </Text>
              <Text
                style={{
                  position: 'absolute',
                  top: '31px',
                  fontSize: '15px',
                  left: '150px',
                  width: '100%',
                  padding: '5px 5px 5px 15px',
                  borderLeft: '1px solid black',
                  fontSize: '13px',
                  fontWeight: 'extrabold',
                }}
              >
                {'Le ' + formatDate(data.createdAt)}
              </Text>
            </View>
            {/* <View>
              <Text> lololol </Text>
              <Text> lo lololo </Text>
            </View> */}
          </View>
          <View
            style={{
              position: 'absolute',
              left: '50px',
              top: '250px',
              width: '500px',
            }}
          >
            <View style={{ width: '500px' }}>
              <Text
                style={{
                  border: '1px solid black',
                  padding: '33px 15px 15px 15px',
                  fontSize: '15px',
                  height: '85px',
                  width: '151px',
                  fontWeight: 'extrabold',
                }}
              >
                Problematique
              </Text>
              <Text
                style={{
                  position: 'absolute',
                  fontSize: '15px',
                  left: '150px',
                  display: 'block',
                  width: '350px',

                  height: '85px',
                  overflow: 'auto',
                  padding: '15px 17px 15px 15px',
                  justifyContent: 'center',

                  borderTop: '1px solid black',
                  borderRight: '1px solid black',
                  borderBottom: '1px solid black',
                  fontSize: '13px',
                  fontWeight: 'extrabold',
                }}
              >
                {data.problematique}
              </Text>
              <Text
                style={{
                  border: '1px solid black',
                  padding: '33px 15px 15px 15px',
                  fontSize: '15px',
                  height: '85px',
                  width: '151px',
                  fontWeight: 'extrabold',
                }}
              >
                Analyse
              </Text>
              <Text
                style={{
                  position: 'absolute',
                  fontSize: '15px',
                  left: '150px',
                  display: 'block',
                  width: '350px',
                  top: '85px',
                  height: '85px',
                  overflow: 'auto',
                  padding: '15px 17px 15px 15px',
                  justifyContent: 'center',

                  borderTop: '1px solid black',
                  borderRight: '1px solid black',
                  borderBottom: '1px solid black',
                  fontSize: '13px',
                  fontWeight: 'extrabold',
                }}
              >
                {data.analyse}
              </Text>
            </View>
            <View style={{ width: '500px' }}>
              <Text
                style={{
                  border: '1px solid black',
                  padding: '33px 15px 15px 15px',
                  fontSize: '15px',
                  height: '85px',
                  width: '151px',
                  fontWeight: 'extrabold',
                }}
              >
                Perspectives
              </Text>
              <Text
                style={{
                  position: 'absolute',
                  fontSize: '15px',
                  left: '150px',
                  display: 'block',
                  width: '350px',

                  height: '85px',
                  overflow: 'auto',
                  padding: '15px 17px 15px 15px',
                  justifyContent: 'center',

                  borderTop: '1px solid black',
                  borderRight: '1px solid black',
                  borderBottom: '1px solid black',
                  fontSize: '13px',
                  fontWeight: 'extrabold',
                }}
              >
                {data.perspective}
              </Text>
              <Text
                style={{
                  border: '1px solid black',
                  padding: '5px 5px 5px 15px',
                  fontSize: '15px',
                  height: '50px',
                  width: '151px',
                  fontWeight: 'extrabold',
                }}
              >
                Ressources Materiels
              </Text>
              <Text
                style={{
                  position: 'absolute',
                  top: '85px',
                  fontSize: '15px',
                  left: '150px',
                  display: 'block',
                  width: '350px',

                  height: '50px',
                  overflow: 'auto',
                  paddingLeft: '15px',
                  paddingRight: '15px',
                  justifyContent: 'center',

                  borderTop: '1px solid black',
                  borderRight: '1px solid black',
                  borderBottom: '1px solid black',
                  fontSize: '13px',
                  fontWeight: 'extrabold',
                }}
              >
                {data.resource
                  .filter((r) => r.type === 'materiel')
                  .map((r) => r.value)
                  .join(', ')}
              </Text>
              <Text
                style={{
                  border: '1px solid black',
                  padding: '5px 5px 5px 15px',
                  fontSize: '15px',
                  height: '50px',
                  width: '151px',
                  fontWeight: 'extrabold',
                }}
              >
                Ressources Imateriels
              </Text>
              <Text
                style={{
                  position: 'absolute',
                  top: '135px',
                  fontSize: '15px',
                  left: '150px',
                  display: 'block',
                  width: '350px',

                  height: '50px',
                  overflow: 'auto',
                  paddingLeft: '15px',
                  paddingRight: '15px',
                  justifyContent: 'center',

                  borderTop: '1px solid black',
                  borderRight: '1px solid black',
                  borderBottom: '1px solid black',
                  fontSize: '13px',
                  fontWeight: 'extrabold',
                }}
              >
                {data.resource
                  .filter((r) => r.type === 'imateriel')
                  .map((r) => r.value)
                  .join(', ')}
              </Text>
              <Text
                style={{
                  border: '1px solid black',
                  padding: '5px 5px 5px 15px',
                  fontSize: '15px',
                  height: '50px',
                  width: '151px',
                  fontWeight: 'extrabold',
                }}
              >
                Ressources Humains
              </Text>
              <Text
                style={{
                  position: 'absolute',
                  top: '185px',
                  fontSize: '15px',
                  left: '150px',
                  display: 'block',
                  width: '350px',

                  height: '50px',
                  overflow: 'auto',
                  paddingLeft: '15px',
                  paddingRight: '15px',
                  justifyContent: 'center',

                  borderTop: '1px solid black',
                  borderRight: '1px solid black',
                  borderBottom: '1px solid black',
                  fontSize: '13px',
                  fontWeight: 'extrabold',
                }}
              >
                {data.resource
                  .filter((r) => r.type === 'humain')
                  .map((r) => r.value)
                  .join(', ')}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  position: 'absolute',
                  top: '70px',
                  fontSize: '15px',
                  textDecoration: 'underline',
                  fontWeight: 1500,
                }}
              >
                {' '}
                Signature{' '}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default PdfDiagFile;
