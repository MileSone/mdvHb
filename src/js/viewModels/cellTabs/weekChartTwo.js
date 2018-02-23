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
        self.dataurlarr2 = ko.observableArray();
        

        self.refreshReport = function(weekStr,carType,dateStr){
            var path=weekStr+"/"+carType+"/";
            self.dataurlarr.removeAll()
            self.dataurlarr2.removeAll()
            self.dataurlarr.push({ dataurl: 'js/data/week/'+path+'bar22.json', chartname: '质量问题整改通知单发放情况' });
            self.dataurlarr2.push({ dataurl: 'js/data/week/'+path+'bar23.json', chartname: '责任单位分布情况' });
            //self.titleOne("新红旗"+carType+"-FL自"+dateStr+"上市")
        }
        self.refreshReport('week1','H7','');
    }

    return new weekChartTwoContentViewModel;
});
