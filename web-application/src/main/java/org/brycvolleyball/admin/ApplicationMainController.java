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
        return "V2xMain";
    }

    @RequestMapping("/testDriver")
    public String testDriver(Model model) {
        return "TestDriver";
    }

    @RequestMapping("/asnTesting")
    public String asnTesting(Model model) {
        return "ASNTesting";
    }

    @RequestMapping("/messageGeneration")
    public String messageGeneration(Model model) {
        return "MessageGeneration";
    }

    @RequestMapping("/availabilityAreaSetup")
    public String availabilityAreaSetup(Model model) {
        return "AvailabilityAreaSetup";
    }

    @RequestMapping("/mapMessage")
    public String mapMessage(Model model) {
        return "MAPMessage";
    }

    @RequestMapping("/plottingTool")
    public String plottingTool(Model model) {
        return "PlottingTool";
    }

    @RequestMapping("/login")
    public String login(Model model) {
        return "Login";
    }

    @RequestMapping("/parkingConfiguration")
    public String parkingConfiguration(Model model) { return "ParkingConfiguration"; }

    @RequestMapping("/kiosk/parking")
    public String parkingKiosk(Model model) { return "ParkingKiosk"; }
}
