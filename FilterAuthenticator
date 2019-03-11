package com.havelsan.auth.app;

import com.havelsan.auth.service.AuthService;
import com.havelsan.filter.Authenticator;
import com.havelsan.model.Session;

public class FilterAuthenticator implements Authenticator {
    @Override
    public Session checkToken(String token) {
        Session session = AuthService.checkToken(token);
        if (session == null) {
            return null;
        }
        return session;
    }
}
