import React, { useState, useRef } from 'react'
import { connect } from 'react-redux';
import { setLayoutSiderWidth } from '@/redux/modules/user/action';
// import Layout from "@c/Layout";
// import Button from "@c/Button";
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import LayoutHeader from '@/view/header';
import LayoutFooter from '@/view/footer';
import LayoutSider from '@/view/sider';
import './layout.less';
import { dragRight } from '@h/hooks';
import { Outlet } from "react-router-dom";





function Home(props) {
  const dargRef = useRef(null)
  dragRight(dargRef, props.setSiderWidth)

  return (
    <>
      <Layout className='layout-container'>
        <Header><LayoutHeader /></Header>
        <Layout>
          <Sider theme="light" width={props.siderWidth}>
            <LayoutSider />
            <div className='drag-line_vertical' ref={dargRef}></div>
          </Sider>
          <Content>
            <Outlet></Outlet>
          </Content>
        </Layout>
        <Footer>
          <LayoutFooter />
        </Footer>
      </Layout>
    </>
  )
}

export default connect(
  ({ user }) => ({
    siderWidth: user.userConfiguration.layoutSiderWidth,
    // count: state.count,
  }),
  {
    setSiderWidth: setLayoutSiderWidth
  }
)(Home)
