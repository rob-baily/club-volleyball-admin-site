package org.brycvolleyball.admin.repositories;

import org.brycvolleyball.admin.persistable.Tournament;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TournamentRepository extends MongoRepository<Tournament,String> {

}
