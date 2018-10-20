package org.brycvolleyball.admin.persistable;

import java.util.Date;

import org.springframework.data.annotation.Id;

public class TournamentEntry {

	public enum StatusType {
		Submitted,
		Registered,
		Paid,
		Waitlist,
		Accepted,
		Withdrawn,
		Cancelled,
		Denied
	}

	@Id
	private String tournamentEntryId;
	private String teamName;
	private String tournamentName;
	private String location;
	private Date startDate;
	private String eventSystem;
	private String ageGroup;
	private String comments;
	private double entryFee;
	private Integer priority;
	private StatusType status;
	private boolean hotelRequired;
	private String hotelConfirmationNumber;
	private Integer checkNumber;
	private Date checkDate;

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
