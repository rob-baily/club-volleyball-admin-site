package org.brycvolleyball.admin.repositories;

import org.brycvolleyball.admin.persistable.Team;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TeamRepository extends MongoRepository<Team,String> {

}
