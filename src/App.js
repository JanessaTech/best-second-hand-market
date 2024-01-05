
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Home from './components/home/Home';
import NoPage from './components/NoPage';

function App() {

  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="nft" element={<Home/>}/>
            <Route path="*" element={<NoPage/>}/>
        </Routes>
    </Router>
  );
}

export default App;
