import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../config/firebase_config';
import { clearAccessToken, setAccessToken } from '../../libs/lib-sync-wise-utils';
import { User as FirebaseUser } from '@firebase/auth';

interface UserWithAccessToken extends FirebaseUser {
    accessToken: string;
}

export const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | undefined | null>(undefined);

    useEffect(() => {
        auth.authStateReady().then(() => {
            setLoading(false);
        });

        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);

            if (user) {
                if (!user.emailVerified)
                    localStorage.setItem('emailNotVerified', 'true');
                setAccessToken((user as UserWithAccessToken).accessToken);
            } else {
                clearAccessToken();
            }
        });
        return () => unsubscribe();
    }, []);

    return { user, loading };
};
