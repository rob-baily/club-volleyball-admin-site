package org.brycvolleyball.admin.persistable;

import org.springframework.data.annotation.Id;

public class TournamentEntry {

	public enum StatusType {
		Submitted,
		Registered,
		Paid,
		Accepted,
		Withdrawn,
		Cancelled
	}

	@Id
	String tournamentEntryId;
	String teamName;
	String tournamentName;
	double entryFee;
	Integer priority;
	StatusType status;

	public String getTournamentEntryId() {
		return tournamentEntryId;
	}

	public void setTournamentEntryId(String tournamentEntryId) {
		this.tournamentEntryId = tournamentEntryId;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public String getTournamentName() {
		return tournamentName;
	}

	public void setTournamentName(String tournamentName) {
		this.tournamentName = tournamentName;
	}

	public StatusType getStatus() {
		return status;
	}

	public void setStatus(StatusType status) {
		this.status = status;
	}

	public double getEntryFee() {
		return entryFee;
	}

	public void setEntryFee(double entryFee) {
		this.entryFee = entryFee;
	}

	public Integer getPriority() {
		return priority;
	}

	public void setPriority(Integer priority) {
		this.priority = priority;
	}
}
