import { Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import NotFoundContent from './pages/NotFoundContent';


export default function App(){
  return (
    <div className="app">
      {/* <Topbar /> */}
      <div className='main-wrapper'>
      <Sidebar />
      <div className="content">
        <main className="main">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/portfolio" element={<Portfolio/>}/>
            <Route path="/not-found" element={<NotFoundContent />} />
            <Route path="/experimental" element={<NotFoundContent />} />
            <Route path="/giftsubscription" element={<NotFoundContent />} />
            <Route path="/account" element={<NotFoundContent />} />
            <Route path="/referfriend" element={<NotFoundContent />} />
            <Route path="/slackarchives" element={<NotFoundContent />} />
          </Routes>
        </main>
      </div>
      </div>
      
    </div>
  );
}
