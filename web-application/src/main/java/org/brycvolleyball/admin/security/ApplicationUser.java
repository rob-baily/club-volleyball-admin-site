package org.brycvolleyball.admin.security;

import java.io.Serializable;

import org.springframework.data.annotation.Id;

/**
 * Created by Rob on 7/7/2015.
 * The application's representation of a user.
 */
public class ApplicationUser implements Serializable {
    @Id
    private String internalId;
    private String password;
    private String username;
    private boolean enabled;
    private boolean adminUser;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public boolean isAdminUser() {
        return adminUser;
    }

    public void setAdminUser(boolean adminUser) {
        this.adminUser = adminUser;
    }
}
