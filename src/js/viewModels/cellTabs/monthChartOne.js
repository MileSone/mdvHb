/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * monthChartOne module
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojrouter','jquery', 'ojs/ojknockout','ojs/ojselectcombobox','ojs/ojchart', 'ojs/ojtoolbar',
         'jet-composites/demo-chart-orientation-control/loader' ], function (oj, ko) {
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
        
        self.selectValue = ko.observable("红旗H7-FL");
        self.monthTitleOne=ko.pureComputed(function () {
            return  "市场质量信息";
        }, this);
        self.carDidChangeHandler = function (data) {
            if (data.detail.previousValue !== data.detail.value) {

                //reload all charts to value week data
            }
        };
        self.orientationValue = ko.observable('vertical');
 /* chart data */
        var lineSeries = [{name : "千车抱怨率(AAK)", items : [136.92, 147.97, 123.31, 124.28, 137.85]},
                          {name : "千车抱怨率(STD)", items : [53.63, 70.95, 54.84, 58.45, 64.79]}
                          ];
    
        var lineGroups = ["第47周", "第48周", "第49周", "第50周", "第51周"];
   
        
       // this.lineSeriesValue = ko.observableArray(lineSeries);
        //this.lineGroupsValue = ko.observableArray(lineGroups);
        this.lineSeriesValue = lineSeries;
        this.lineGroupsValue = lineGroups;

//        self.drillingAction = function () {
//            dril.callMeInOtherContrller("monthChartOne");
//            oj.Router.rootInstance.go('weekDrilling');
//        };
    }

    return monthChartOneContentViewModel;
});
