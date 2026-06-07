import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!user) {
            router.push("/");
        }
    }, [user, router]);
    if (!user) return null;
    return children;
}

export default ProtectedRoute