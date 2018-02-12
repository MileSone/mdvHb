/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * weekChartOne module
 */
define(['ojs/ojcore', 'knockout','viewModels/weekDrilling', 'ojs/ojrouter'
], function (oj, ko, dril) {
    /**
     * The view model for the main content view template
     */
    function weekChartOneContentViewModel() {
        var self = this;

        self.selectValue = ko.observable("红旗H7-FL");
        self.titleOne = ko.pureComputed(function () {
            return "新" + self.selectValue() + "自" + weekTime + "上市";
        }, this);

        self.carDidChangeHandler = function (data) {
            if (data.detail.previousValue !== data.detail.value) {
                
                //reload all charts to value week data
            }
        };
        
        self.drillingButtonAction = function(){
            dril.callMeInOtherContrller("weeklyChart");
            oj.Router.rootInstance.go('weekDrilling');
        };
    }

    return weekChartOneContentViewModel;
});
