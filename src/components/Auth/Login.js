import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useAuthenticator, View } from '@aws-amplify/ui-react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
export function Login() {
  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || '/';
  useEffect(() => {
    if (route === 'authenticated') {
      navigate(from, { replace: true });
    }
  }, [route, navigate, from]);
  return ( 
    //TODO: socialProviders={['facebook', 'google']} to pass into Authenticator when integrated
    <View className="auth-wrapper context-container">
      <Authenticator  loginMechanisms={['email']} socialProviders={[]}></Authenticator>
    </View>
  );
}