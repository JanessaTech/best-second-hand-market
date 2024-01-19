
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

function App() {

  return (
    <ThemeProvider theme={CheapTheme}>
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                  <Route index element={<HomeContent/>} />
                  <Route path='nft' element={<NFTContent/>} />
                  <Route path="*" element={<NoPage/>}/>
                </Route>
                <Route path="/nfters" element={<NFTer/>}/>
                <Route path="/profile/setting" element={<Setting/>}/>
                <Route path="*" element={<NoPage/>}/>
            </Routes>
        </Router>
    </ThemeProvider>
    
  );
}

export default App;
