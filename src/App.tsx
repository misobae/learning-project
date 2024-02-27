import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './routes/Home';
import Tv from './routes/Tv';
import Search from './routes/Search';
import Header from './components/Header';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={< Home />}>
          <Route path="movie/:category/:id" element={< Home />} />
        </Route>
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
