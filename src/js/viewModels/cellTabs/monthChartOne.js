/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * monthChartOne module
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojrouter','jquery', 'ojs/ojknockout','ojs/ojselectcombobox','ojs/ojchart'
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
        
        self.selectValue = ko.observable("红旗H7-FL");
        self.monthTitleOne=ko.pureComputed(function () {
            return  "市场质量信息";
        }, this);
        self.carDidChangeHandler = function (data) {
            if (data.detail.previousValue !== data.detail.value) {

                //reload all charts to value week data
            }
        };
       
 /* chart data */
        var lineSeries = [{name : "Series 1", items : [74, 62, 70, 76, 66]},
                          {name : "Series 2", items : [50, 38, 46, 54, 42]},
                          {name : "Series 3", items : [34, 22, 30, 32, 26]},
                          {name : "Series 4", items : [18,  6, 14, 22, 10]},
                          {name : "Series 5", items : [3,  2,  3,  3,  2]}];
    
        var lineGroups = ["Jan", "Feb", "Mar", "Apr", "May"];
   
        
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
