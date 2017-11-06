package org.brycvolleyball.admin;

import org.brycvolleyball.admin.web.UserSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

/**
 * Created by Rob on 1/6/2017.
 * Used to inject core items into the model.
 */
@Service
public class ApplicationMainModelSetupService {

	public ApplicationMainModelSetupService(@Autowired UserSettings userSettings) {
		this.userSettings = userSettings;
	}

	private UserSettings userSettings;

	void setupModel(Model model) {
		model.addAttribute("userSettings", userSettings);
	}
}
