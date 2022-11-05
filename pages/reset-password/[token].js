import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import ResetPassword from '../../components/ResetPassword/ResetPassword';

function ResetPasswordPage() {
    const router = useRouter();
    const [token, setToken] = useState(router.query.token);

    useEffect(() => {
        setToken(router.query.token);
    }, [token]);

    return <ResetPassword token={token} />;
}

export default ResetPasswordPage;
