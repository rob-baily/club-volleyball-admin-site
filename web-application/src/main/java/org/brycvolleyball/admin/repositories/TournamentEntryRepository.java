package org.brycvolleyball.admin.repositories;

import org.brycvolleyball.admin.persistable.TournamentEntry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TournamentEntryRepository extends MongoRepository<TournamentEntry,String> {
	@Query("{ $or : [ { $or :  [ { $where: '\"?0\" == \" null \"' }, { $where: '\"?0\" == \"\"' } ] }, { status : '?0' } ] }")
	public Page<TournamentEntry> findTournamentEntries(@Param("status") String status, Pageable pageable);
}
