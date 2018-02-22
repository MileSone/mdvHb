/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * weekChartOne module
 */
define(['ojs/ojcore', 'knockout', 'viewModels/weekDrilling', 'ojs/ojchart', 'ojs/ojrouter', 'jet-composites/my-pie/loader', 'jet-composites/my-bar/loader', 'jet-composites/my-line/loader', 'jet-composites/my-combo/loader'
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

        self.drillingButtonAction = function () {
            dril.callMeInOtherContrller("weeklyChart");
            oj.Router.rootInstance.go('weekDrilling');
        };

        self.dataurlarr = ko.observableArray();
        self.dataurlarr.push({ dataurl: 'js/data/week/pie1.json', chartname: '质量问题反馈情况' });
        self.dataurlarr2 = ko.observableArray();
        self.dataurlarr2.push({ dataurl: 'js/data/week/line2.json', chartname: '千车抱怨率' });
        self.dataurlarr3 = ko.observableArray();
        self.dataurlarr3.push({ dataurl: 'js/data/week/combo3.json', chartname: '项目改进状态' });

        
    }

    return weekChartOneContentViewModel;
});
