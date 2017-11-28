package org.brycvolleyball.admin.repositories;

import java.util.List;

import org.brycvolleyball.admin.persistable.Tournament;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

public interface TournamentRepository extends MongoRepository<Tournament,String> {
	public List<Tournament> findAllByOrderByNameAsc();
	public Page<Tournament> findAllByNameContainsIgnoreCaseOrderByNameAsc(@Param("name") String name, Pageable pageable);
}
