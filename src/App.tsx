import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import FilmsPage from './components/FilmsPage';
import FilmDetails from './components/FilmDetails';
import ActorDetails from './components/ActorDetails';
import CustomersPage from './components/CustomersPage';
import CustomerDetails from './components/CustomerDetails';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Layout>
                  <LandingPage />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/films" 
            element={
              <ProtectedRoute>
                <Layout>
                  <FilmsPage />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/film/:filmId" 
            element={
              <ProtectedRoute>
                <Layout>
                  <FilmDetails />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/actor/:actorId" 
            element={
              <ProtectedRoute>
                <Layout>
                  <ActorDetails />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/customers" 
            element={
              <ProtectedRoute>
                <Layout>
                  <CustomersPage />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/customer/:customerId" 
            element={
              <ProtectedRoute>
                <Layout>
                  <CustomerDetails />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route path="/dashboard" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;