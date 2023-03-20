import { renderToStaticMarkup } from 'react-dom/server'
import pdf from 'html-pdf'
import PDFLayout from './pdflayout'
import Colors from './colors'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import { ReactElement, JSXElementConstructor } from 'react';
import getRawBody from 'raw-body';
export default function Test() {
    return(<Colors></Colors>)

}
  Test.getInitialProps = async (ctx: { query: any; req: any; res: any;}) => {
    let query = ctx.query;
    let req = ctx.req;
    let res = ctx.res
    const exportPDF = query.exportPDF === 'true';
    const isServer = !!req;
    
    if (isServer && exportPDF) {
      const buffer = await  
    ReactPDF.renderToStream(<MyDocument />);
      // prompt to download pdf
      res.setHeader('Content-disposition', 'attachment; filename="article.pdf');
      
      // set content type
      res.setHeader('Content-Type', 'application/pdf');

      const chunks = [];
      for await (let chunk of buffer) {
        chunks.push(chunk);
      }
      const rbuffer = Buffer.concat(chunks);
      // output the pdf buffer
      res.end(rbuffer);
    }
    
    return {};
  }
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });
  const MyDocument = () => (<Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>

      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>)