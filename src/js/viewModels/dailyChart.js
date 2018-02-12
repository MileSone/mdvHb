/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * dailyChart module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojselectcombobox', 'appController', 'ojs/ojdatetimepicker',
    'ojs/ojselectcombobox', 'ojs/ojtimezonedata', 'ojs/ojlabel', 'ojs/ojbutton',
    'ojs/ojpopup'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function dailyChartContentViewModel() {
        var self = this;
        self.pageTitle = ko.observable("质量日报");
        self.dateValue = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date(2018, 02, 01)));
        self.selectValue = ko.observable("红旗H7-FL");

        self.showDrilling = function () {

            var popup = document.querySelector('#popup1');
            popup.open();

        }

        self.topTitle = ko.pureComputed(function () {
            return  "根据更新时间：" + self.dateValue();
        }, this);
        
        
        self.dayTitleOne = ko.pureComputed(function () {
            return  "量产车型现生产质量指标（当日生产38辆" + self.selectValue() + ")";
        }, this);
        
        self.startAnimationListener = function (data, event)
        {
            var ui = event.detail;
            if (!$(event.target).is("#popup1"))
                return;

            if ("open" === ui.action)
            {
                event.preventDefault();
                var options = {"direction": "top"};
                oj.AnimationUtils.slideIn(ui.element, options).then(ui.endCallback);
            } else if ("close" === ui.action)
            {
                event.preventDefault();
                ui.endCallback();
            }
        }
    }

    return dailyChartContentViewModel;
});
