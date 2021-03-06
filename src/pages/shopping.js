import { useContext } from "react";
import { Layout } from 'antd';
import NavBar from "../components/NavBar";
import AppHeader from '../components/Header';
import AppFooter from '../components/Footer';
import CartContainer from '../components/carcontent';
import { StoreContext } from "../store"

const { Header, Content, Footer } = Layout;

function ShoppingCart() {
    const { state: { page: { title } } } = useContext(StoreContext);
    return (
        <Layout className="container main-layout">
            <Layout className="bg-gray">
                <NavBar />
            </Layout>
            <Layout className="bg-gray flex-8-1">
                <Header className="layout-header">
                    <AppHeader title={title} />
                </Header>
                <Content className="layout-content">
                    <CartContainer />
                </Content>
                <Footer className="layout-footer">
                    <AppFooter />
                </Footer>
            </Layout>
        </Layout>
    );
}

export default ShoppingCart;