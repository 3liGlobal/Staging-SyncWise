import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.ts';
import FullscreenLoader from '../loaders/FullScreenLoader.tsx';
export default function ProtectedLayout() {
    const { user, loading } = useAuth();

    if (loading) {
        return <FullscreenLoader />;
    }

    if (!user) {
        return <Navigate to={`/login`} />;
    }

    // if (!user.emailVerified) {
    //     return <Navigate to={`/register/verify?firebase_user_id=${user.uid}`} />;
    // }

    return <Outlet />;
}
