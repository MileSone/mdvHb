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
    'ojs/ojpopup', 'ojs/ojlistview', 'ojs/ojarraydataprovider', 'ojs/ojmenu', 'ojs/ojoption'
], function (oj, ko) {
    /**
     * The view model for the main content view template
     */
    function dailyChartContentViewModel() {
        var self = this;
        self.pageTitle = ko.observable("质量日报");
        self.dateValue = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date(2018, 02, 01)));
        self.selectValue = ko.observable("红旗H7-FL");
        var data = [{name: 'Settings', t1: '10.3.6', t2: 2, t3: 2}
        ];

        var boCheck = 1;
        self.dataTopJson = ko.observableArray([]);
        self.dataTopProvider = new oj.ArrayDataProvider(self.dataTopJson);

        self.dataBottomJson = ko.observableArray([]);
        self.dataBottomProvider = new oj.ArrayDataProvider(self.dataBottomJson);

        self.popDes = ko.observable("");
        self.pop_t1 = ko.observable("");
        self.pop_t2 = ko.observable("");
        self.pop_t3 = ko.observable("");

        self.initVC = function (jsonStr) {
            $.getJSON("js/data/day/" + jsonStr + ".json",
                    function (data)
                    {
                        switch (self.selectValue()) {
                            case "红旗H7-FL":
                                self.dataTopJson(data.H7.col1);
                                self.dataBottomJson(data.H7.col2);
                                break;
                            case "红旗H8-FL":
                                self.dataTopJson(data.H8.col1);
                                self.dataBottomJson(data.H8.col2);
                                break
                        }
                        boCheck = 0;
                    });
        }

        self.initVC("dayOne");

        self.showDrilling = function (data) {
            console.log(data,event);
            if (boCheck === 0) {
                self.pop_t1(data.t1);
                self.pop_t2(data.t2);
                self.pop_t3(data.t3);
                self.popDes(data.des);
                var popup = document.querySelector('#popup1');
                popup.open();
            }

        }

        self.topTitle = ko.pureComputed(function () {
            return  "根据更新时间：" + self.dateValue();
        }, this);


        self.dayTitleOne = ko.pureComputed(function () {
            return  "量产车型现生产质量指标（当日生产38辆" + self.selectValue() + ")";
        }, this);

        self.dayTitleTwo = ko.pureComputed(function () {
            return  "量产售后质量指标（" + self.selectValue() + ")";
        }, this);

        this.isSmall = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(
                oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY));
        this.isLargeOrUp = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(
                oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_UP));
        self.columns = ko.pureComputed(function () {
            return this.isSmall() ? 1 : 2;
        }, self);
        self.labelEdge = ko.pureComputed(function () {
            return this.isLargeOrUp() ? "start" : "top";
        }, self);

        self.carDidChangeHandler = function (data) {
            if (data.detail.previousValue !== data.detail.value) {
                self.initVC("dayOne");

                //reload all charts to value week data
            }
        };

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
