import React, {Component} from 'react';
import './App.css';
import {NavLink, Route, Routes} from "react-router-dom";
import ContentContainer from "./components/Content/ContentContainer";
import HeaderContainer from "./components/Header/Header-Container";
import LoginPage from "./components/Login/Login";
import {connect} from "react-redux";
import 'antd/dist/antd.css';
import {initializeApp} from "./redux/App-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {Layout, Menu} from 'antd'
import {UserOutlined} from '@ant-design/icons'
import { AppStateType } from './redux/redux-store';

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    initializeApp: () => void
}

const {SubMenu} = Menu
const {Content, Sider} = Layout

class App extends Component<MapPropsType & DispatchPropsType> {
    componentDidMount() {
        this.props.initializeApp();
    }

    /*если мы не проинициализировались тогда верни крутилку прелоадер*/
    render() {
        if (!this.props.initialized) { return <Preloader/> }

        return (
            <Layout>
                <HeaderContainer/>

                <Content style={{padding: '0 50px'}}>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultOpenKeys={['sub1']}
                                style={{height: '100%'}}>
                                <SubMenu key="sub1" icon={<UserOutlined/>} title="Menu">
                                    <Menu.Item key="1"> <NavLink to="/profile">Contacts</NavLink></Menu.Item>
                                </SubMenu>

                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>

                            <Routes>
                                <Route path="/profile/*"
                                       element={<ContentContainer/>}/>

                                <Route path="/ContactPage"
                                       element={<LoginPage/>}/>

                                <Route path="/login"
                                       element={<LoginPage/>}/>

                                <Route path="/profile/:userId"
                                       element={<ContentContainer/>}/>
                            </Routes>

                        </Content>
                    </Layout>
                </Content>
            </Layout>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({initialized: state.app.initialized})

export default connect(mapStateToProps, {initializeApp})(App);