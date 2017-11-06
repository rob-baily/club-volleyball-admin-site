package org.brycvolleyball.admin.web;

import java.io.Serializable;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;

/**
 * Created by Rob on 4/23/2015.
 * Contains global user settings information that is stored in the session.
 * This is scoped as a session but is used in singleton controllers so we use
 * ScopedProxyMode.TARGET_CLASS for it to work properly.
 */
@Component
@Scope(value = "session", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class UserSettings implements Serializable {
    private static final long serialVersionUID = 3463628049490733393L;

    public UserSettings() {
    }
}
