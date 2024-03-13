import React, { useEffect, useState } from 'react';
import { Row, Col, Layout, Table } from "antd";
import qs from 'qs';

import DFooter from './Dfooter';
import Dmenu from './Dmenu';
import Dtable from './Dtable';
import Dfilter2 from './Dfilter2';
import Dtop5 from './Dtop5';

// import "antd/dist/antd.css";
  
export default function Test() {
  const { Footer, Header, Content } = Layout;

  const headerStyle = {
    textAlign: 'center',
    color: 'black',
    height: '200px',
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#A7EBF4',
    fontSize: '50px', 
    display: 'flex',
    alignItems: 'center', // 수직 정렬
    justifyContent: 'center', // 좌우 정렬
  };
  const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: 'black',
    backgroundColor: '#FEFDED',
  };

  const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#A7EBF4',
    height: '30%',
    fontSize: '25px', 
  };
  const layoutStyle = {
    
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%', //calc(50% - 8px)
    maxWidth: '100%', //calc(50% - 8px)
  };

  return (
    <Layout style={layoutStyle}>
        <Header style={headerStyle}>
            <Dmenu>
            </Dmenu>
        </Header>
        <Content style={contentStyle}>
            <Row justify="space-around" align="middle">
              <Col>
                  <Dtable />
              </Col>
            </Row>
        </Content>
        <Footer style={footerStyle}>
            <DFooter />
        </Footer>
    </Layout>
  );
}