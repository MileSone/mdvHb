/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * monthChartTwo module
 */
define(['ojs/ojcore', 'knockout'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function monthChartTwoContentViewModel() {
        var self = this;
        self.firstName = ko.observable("Mon2");
        self.lastName = ko.observable("Earth");
        self.fullName = ko.pureComputed(function () {
            return this.firstName() + " " + this.lastName();
        }, this);
        self.monthTitleOne = ko.pureComputed(function () {
            return  "生产质量状态";
        }, this);
        
        
        //var hiddenCategories = [categories[0]];
        //self.hiddenCategoriesValue = ko.observableArray(hiddenCategories);
        // Chart Data
        var timeSeries = [{name:'实际值', items: [6.8, 6.2, 7, 5.8]},
         {name : "目标", items : [3.0, 3.0, 3.0, 3.0], type: "line"}];
        var timeGroups = ['第47周', '第48周', '第49周', '第50周'];
        self.timeSeriesValue = ko.observableArray(timeSeries);
        self.timeGroupsValue = ko.observableArray(timeGroups);
    }

    return monthChartTwoContentViewModel;
});
