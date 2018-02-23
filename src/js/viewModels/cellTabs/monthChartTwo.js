/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * monthChartTwo module
 */
define(['ojs/ojcore', 'knockout', 'jet-composites/my-combo/loader'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function monthChartTwoContentViewModel() {
        var self = this;

        self.dataurlarr3 = ko.observableArray();
        self.refreshReport = function (weekStr, carType, dateStr) {
            var path = weekStr + "/" + carType + "/";
            self.dataurlarr3.removeAll()
            self.dataurlarr3.push({ dataurl: 'js/data/month/' + path + 'combo3.json', chartname: '整车Audit评审等级' });
            //self.titleOne("新红旗" + carType + "-FL自" + dateStr + "上市")
        }
        self.refreshReport('month1', 'H7', '');
    }

    return new monthChartTwoContentViewModel;
});
