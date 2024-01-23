
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import NoPage from './components/NoPage';
import { ThemeProvider } from "@mui/material";
import CheapTheme from './common/GlobalTheme';
import NFTer from './components/nfters/NFTer';
import Setting from './components/profile/Setting';
import MainLayout from './components/MainLayout';
import HomeContent from './components/home/HomeContent';
import NFTContent from './components/nfts/NFTContent';
import MyNFTList from './components/profile/MyNFTList';
import Orders from './components/profile/Orders';
import Favorites from './components/profile/Favorites';
import Mint from './components/profile/Mint';
import Balance from './components/profile/Balance';
import Notification from './components/profile/Notification';

function App() {

  return (
    <ThemeProvider theme={CheapTheme}>
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                  <Route index element={<HomeContent/>} />
                  <Route path='nft' element={<NFTContent/>} />
                  <Route path="profile/nfts" element={<MyNFTList/>}/>
                  <Route path="profile/setting" element={<Setting/>}/>
                  <Route path="profile/orders" element={<Orders/>}/>
                  <Route path="profile/favorites" element={<Favorites/>}/>
                  <Route path="profile/mint" element={<Mint/>}/>
                  <Route path="profile/notifications" element={<Notification/>}/>
                  <Route path="profile/balance" element={<Balance/>}/>
                  <Route path="/nfters" element={<NFTer/>}/>
                  <Route path="*" element={<NoPage/>}/>
                </Route>
                <Route path="*" element={<NoPage/>}/>
            </Routes>
        </Router>
    </ThemeProvider>
    
  );
}

export default App;
