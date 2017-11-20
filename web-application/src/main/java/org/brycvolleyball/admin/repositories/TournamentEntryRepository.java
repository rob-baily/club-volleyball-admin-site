package org.brycvolleyball.admin.repositories;

import org.brycvolleyball.admin.persistable.TournamentEntry;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TournamentEntryRepository extends MongoRepository<TournamentEntry,String> {

}
