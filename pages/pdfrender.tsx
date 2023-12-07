import { renderToStaticMarkup } from 'react-dom/server'
import pdf from 'html-pdf'
import PDFLayout from './pdflayout'
import Colors from './colors'
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import { ReactElement, JSXElementConstructor } from 'react';
//import SpaceMono from './font.ttf'
export default function Test() {
    return(<Colors></Colors>)

}

  Test.getInitialProps = async (ctx: { query: any; req: any; res: any;}) => {
    Font.register({family: '"Space Mono"', src: 'https://github.com/google/fonts/raw/1473ffb71f25b1f12bcdaa5e98a599db9becb87b/ofl/spacemono/SpaceMono-Regular.ttf'})
    let query = ctx.query;
    let req = ctx.req;
    let res = ctx.res
    const exportPDF = query.exportPDF === 'true';
    const color: string = query.color+ '';
    if (!color) return {};
    const isServer = !!req;
    
    if (isServer && exportPDF) {
      const buffer = await  
    ReactPDF.renderToStream(<MyDocument bgcolor={"#" + color.toString()} />);
      // prompt to download pdf
      res.setHeader('Content-disposition', 'attachment; filename="article.pdf');
      
      // set content type
      res.setHeader('Content-Type', 'application/pdf');

      const chunks = [];
      for await (let chunk of buffer) {
        chunks.push(chunk);
      }
      //@ts-ignore
      const rbuffer = Buffer.concat(chunks);
      // output the pdf buffer
      res.end(rbuffer);
    }
    
    return {};
  }
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: 'rgb(15,23,42)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
      color: 'white',
      fontFamily: '\"Space Mono\"',
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }
  });
  interface Props {
    bgcolor: string;
  }
  const MyDocument = (props: Props) => (<Document>
    <Page size="A4" style={styles.page} orientation='landscape'>
      <View style={styles.section}>
        <Text>Ewan&apos;s Yellows</Text>
        <View style={{backgroundColor: props.bgcolor,  width: 100, height: 100}}></View>
      </View>
    </Page>
  </Document>)