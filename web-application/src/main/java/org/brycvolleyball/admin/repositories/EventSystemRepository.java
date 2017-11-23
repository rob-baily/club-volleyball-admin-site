package org.brycvolleyball.admin.repositories;

import java.util.List;

import org.brycvolleyball.admin.persistable.EventSystem;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EventSystemRepository extends MongoRepository<EventSystem,String> {
	public List<EventSystem> findAllByOrderByNameAsc();
}
