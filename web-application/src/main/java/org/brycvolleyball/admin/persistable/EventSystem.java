package org.brycvolleyball.admin.persistable;

import org.springframework.data.annotation.Id;

public class EventSystem {
	@Id
	private String id;

	private String name;
	private String siteURL;
	private String userName;
	private String password;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSiteURL() {
		return siteURL;
	}

	public void setSiteURL(String siteURL) {
		this.siteURL = siteURL;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
