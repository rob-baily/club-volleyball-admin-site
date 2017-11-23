package org.brycvolleyball.admin.persistable;

import java.util.Date;

import org.springframework.data.annotation.Id;

public class Tournament {

	@Id
	private String tournamentId;
	private String name;
	private String location;
	private Date startDate;
	private String eventSystem;

	public String getTournamentId() {
		return tournamentId;
	}

	public void setTournamentId(String tournamentId) {
		this.tournamentId = tournamentId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public String getEventSystem() {
		return eventSystem;
	}

	public void setEventSystem(String eventSystem) {
		this.eventSystem = eventSystem;
	}
}
