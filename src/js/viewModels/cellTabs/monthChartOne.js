/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * monthChartOne module
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojrouter'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function monthChartOneContentViewModel() {
        var self = this;
        self.firstName = ko.observable("Mon1");
        self.lastName = ko.observable("");
        self.fullName = ko.pureComputed(function () {
            return this.firstName() + " " + this.lastName();
        }, this);


//        self.drillingAction = function () {
//            dril.callMeInOtherContrller("monthChartOne");
//            oj.Router.rootInstance.go('weekDrilling');
//        };
    }

    return monthChartOneContentViewModel;
});
