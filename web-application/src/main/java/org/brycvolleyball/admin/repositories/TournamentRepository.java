package org.brycvolleyball.admin.repositories;

import java.util.List;

import org.brycvolleyball.admin.persistable.Tournament;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TournamentRepository extends MongoRepository<Tournament,String> {
	public List<Tournament> findAllByOrderByNameAsc();
}
