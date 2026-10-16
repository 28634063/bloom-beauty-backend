import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider } from '@/lib/AuthContext';
import { BookingPolicyProvider } from './lib/BookingPolicyContext';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Services from './pages/Services';
import NailCourse from './pages/NailCourse';
import NailDrillMasterclass from './pages/NailDrillMasterclass';
import NailArtMasterclass from './pages/NailArtMasterclass';
import Book from './pages/Book';
import BookingConfirmed from './pages/BookingConfirmed';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Terms from './pages/Terms';

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <BookingPolicyProvider>
            <ScrollToTop />
            <Routes>
              <Route element={<Layout />}>
                <Route path="/"                         element={<Home />} />
                <Route path="/services"                 element={<Services />} />
                <Route path="/nail-course"              element={<NailCourse />} />
                <Route path="/nail-drill-masterclass"   element={<NailDrillMasterclass />} />
                <Route path="/nail-art-masterclass"     element={<NailArtMasterclass />} />
                <Route path="/book"                     element={<Book />} />
                <Route path="/booking-confirmed"        element={<BookingConfirmed />} />
                <Route path="/gallery"                  element={<Gallery />} />
                <Route path="/contact"                  element={<Contact />} />
                <Route path="/admin"                    element={<Admin />} />
                <Route path="/login"                    element={<Login />} />
                <Route path="/terms"                    element={<Terms />} />
                <Route path="*"                         element={<PageNotFound />} />
              </Route>
            </Routes>
          </BookingPolicyProvider>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;