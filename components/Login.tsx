import { SocialUser } from '@/app/types';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import { Button, Text, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function Login({ onLogin }: { onLogin?: (socialUser: SocialUser) => void }) {
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: Constants.expoConfig?.extra?.GOOGLE_CLIENT_ID,
        scopes: ['profile', 'email'],
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${authentication?.accessToken}` },
            })
                .then(res => res.json())
                .then(socialUser => {
                    if (onLogin) onLogin(socialUser);
                })
        }
    }, [response]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button
                title="Login with Google"
                disabled={!request}
                onPress={() => promptAsync()}
            />
            {response?.type === 'error' && <Text>Login Failed</Text>}
        </View>
    );
}