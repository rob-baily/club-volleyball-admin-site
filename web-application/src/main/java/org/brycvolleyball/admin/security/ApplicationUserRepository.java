package org.brycvolleyball.admin.security;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

/**
 * Created by Rob on 7/7/2015.
 * Manages database interaction for users used in security.
 */
public interface ApplicationUserRepository extends MongoRepository<ApplicationUser, String> {
    public ApplicationUser findOneByUsernameIgnoreCase(@Param("username") String username);
}
