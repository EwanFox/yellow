import React from 'react';
import PropTypes from 'prop-types';



const PDFLayout = ({ children }) => (
  <html style={{backgroundColor: "#0E172A", boxSizing: "border-box", margin: 0, padding: 0}}>
    <head>
      <meta charSet="utf8" />
    </head>
    <body>
      {children}
    </body>
  </html>
);

PDFLayout.propTypes = {
  children: PropTypes.node,
};

export default PDFLayout;
