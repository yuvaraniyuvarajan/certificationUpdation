import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ViewCertificate } from './skillbasedcertificationscreens/viewCertificate';
import { AddCertificate } from './skillbasedcertificationscreens/addCertificate';
import { Provider } from 'react-redux';
import { store } from './redux/store';
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AddCertificate />} />
          <Route path='/SkillBasedcertification/List' element={<ViewCertificate />} />

        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
