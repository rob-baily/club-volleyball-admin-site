package org.brycvolleyball.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Rob on 2/26/2015.
 */

@Controller
public class ApplicationMainController {

    public ApplicationMainController(@Autowired ApplicationMainModelSetupService modelSetupService) {
        this.modelSetupService = modelSetupService;
    }

    private ApplicationMainModelSetupService modelSetupService;

    @RequestMapping("/")
    public String index(Model model) {
        modelSetupService.setupModel(model);
        return "ApplicationMain";
    }

    @RequestMapping("/login")
    public String login(Model model) {
        return "Login";
    }
}
