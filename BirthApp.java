package com.havelsan.birthday.app;

import com.havelsan.birthday.service.BirthService;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;
@ApplicationPath("")
public class BirthApp extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        final Set<Class<?>> classes = new HashSet<>();
        // requestUserRegistration root resource
        classes.add(BirthAuthAuthenticator.class);
        classes.add(BirthAuthProvider.class);
        classes.add(BirthService.class);
        return classes;
    }
}
