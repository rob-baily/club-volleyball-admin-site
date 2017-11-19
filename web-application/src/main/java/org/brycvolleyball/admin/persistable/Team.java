package org.brycvolleyball.admin.persistable;

import org.springframework.data.annotation.Id;

public class Team {
	@Id
	private String id;

	private String teamName;
	private String coach;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public String getCoach() {
		return coach;
	}

	public void setCoach(String coach) {
		this.coach = coach;
	}
}
