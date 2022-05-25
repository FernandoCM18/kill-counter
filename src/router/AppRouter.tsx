import { Routes, Route } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { KillCounterRouter } from './KillCounterRouter';
import { AuthRouter } from './AuthRouter';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={
          <PublicRoute>
            <AuthRouter />
          </PublicRoute>
        } 
      />
      <Route path="/*" element={
          <PrivateRoute>
            <KillCounterRouter />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
}
