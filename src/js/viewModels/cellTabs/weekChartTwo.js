/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * weekChartTwo module
 */
define(['ojs/ojcore', 'knockout', 'jet-composites/my-sunburst/loader'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function weekChartTwoContentViewModel() {
        var self = this;

        self.dataurlarr = ko.observableArray();
        self.dataurlarr.push({ dataurl: 'js/data/week/bar22.json', chartname: '质量问题整改通知单发放情况' });
        self.dataurlarr2 = ko.observableArray();
        self.dataurlarr2.push({ dataurl: 'js/data/week/bar23.json', chartname: '责任单位分布情况' });



    }

    return weekChartTwoContentViewModel;
});
