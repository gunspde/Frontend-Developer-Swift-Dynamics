import './App.css';
import Navbar from './component/Navbar';
import { Routes, Route } from 'react-router-dom'
import HomeContainer from './module/home/HomeContainer';
import clientRoute from './config/clientRoute';
import LayoutAndShapeScreen from './module/layoutAndShape/LayoutAndShapeScreen';
import TableListContainer from './module/formAndTable/TableListContainer';
import { useEffect } from 'react';
import ConnectApiContainer from './module/connectAPI/ConnectApiContainer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={clientRoute.home} element={<HomeContainer/> } />
        <Route path={clientRoute.layoutStyle} element={<LayoutAndShapeScreen/> } />
        <Route path={clientRoute.formTable} element={<TableListContainer/> } />
        <Route path={clientRoute.connectApi} element={<ConnectApiContainer/> } />
      </Routes >
    </>
  );
}

export default App;
