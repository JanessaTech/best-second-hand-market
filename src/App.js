
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Home from './components/home/Home';
import NoPage from './components/NoPage';
import { ThemeProvider } from "@mui/material";
import CheapTheme from './common/GlobalTheme';
import NFT from './components/nfts/NFT';
import NFTer from './components/nfters/NFTer';

function App() {

  return (
    <ThemeProvider theme={CheapTheme}>
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="nft" element={<NFT/>}/>
                <Route path="nfters" element={<NFTer/>}/>
                <Route path="*" element={<NoPage/>}/>
            </Routes>
        </Router>
    </ThemeProvider>
    
  );
}

export default App;
