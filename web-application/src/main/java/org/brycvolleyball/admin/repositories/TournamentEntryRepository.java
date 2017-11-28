package org.brycvolleyball.admin.repositories;

import org.brycvolleyball.admin.persistable.TournamentEntry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TournamentEntryRepository extends MongoRepository<TournamentEntry,String> {
	@Query("{ $and : [ " +
			"{ $or : [ { $or :  [ { $where: '\"?0\" == \" null \"' }, { $where: '\"?0\" == \"\"' } ] }, { status : '?0' } ] }" +
			", { $or : [ { $or :  [ { $where: '\"?1\" == \" null \"' }, { $where: '\"?1\" == \"\"' } ] }, { teamName : '?1' } ] }" +
			", { tournamentName : { $regex : '.*?2.*' , $options : 'i' } } " +
			", { $or : [ { $or :  [ { $where: '\"?3\" == \" null \"' }, { $where: '\"?3\" == \"\"' } ] }, { checkNumber : ?3 } ] }" +
			"] } ")
	public Page<TournamentEntry> findTournamentEntries(
			@Param("status") String status,
			@Param("teamName") String teamName,
			@Param("textFilter") String textFilter,
			@Param("checkNumber") Integer checkNumber,
			Pageable pageable);
}
