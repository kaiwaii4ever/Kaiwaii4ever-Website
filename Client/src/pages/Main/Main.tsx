import { Box, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import Appbar from '../../components/Main/AppBar';
import Footer from '../../components/Main/Footer';
import Main from './MainPages/Welcome';
import GetToKnowMe from './MainPages/GetToKnowMe';
import YATBProject from './MainPages/YATBProject';
import FAQ from './MainPages/FAQ';

export default function Blog() {
  return (
    <>
      <CssBaseline />
      <Appbar />
      <Box>
        <Box>
          <Routes>
            <Route index element={<Main />} />
            <Route path="/about" element={<GetToKnowMe />} />
            <Route path="/yatb" element={<YATBProject />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
