package org.brycvolleyball.admin.persistable;

import java.util.Date;

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
	String ageGroup;
	String comments;
	double entryFee;
	Integer priority;
	StatusType status;
	boolean hotelRequired;
	String hotelConfirmationNumber;
	Integer checkNumber;
	Date checkDate;

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

	public String getAgeGroup() {
		return ageGroup;
	}

	public void setAgeGroup(String ageGroup) {
		this.ageGroup = ageGroup;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
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

	public boolean isHotelRequired() {
		return hotelRequired;
	}

	public void setHotelRequired(boolean hotelRequired) {
		this.hotelRequired = hotelRequired;
	}

	public String getHotelConfirmationNumber() {
		return hotelConfirmationNumber;
	}

	public void setHotelConfirmationNumber(String hotelConfirmationNumber) {
		this.hotelConfirmationNumber = hotelConfirmationNumber;
	}

	public Integer getCheckNumber() {
		return checkNumber;
	}

	public void setCheckNumber(Integer checkNumber) {
		this.checkNumber = checkNumber;
	}

	public Date getCheckDate() {
		return checkDate;
	}

	public void setCheckDate(Date checkDate) {
		this.checkDate = checkDate;
	}
}
