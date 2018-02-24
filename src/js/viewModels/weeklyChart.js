/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * weeklyChart module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController', 'viewModels/cellTabs/weekChartOne', 'viewModels/cellTabs/weekChartTwo', 'ojs/ojdatetimepicker',
    'ojs/ojselectcombobox', 'ojs/ojtimezonedata', 'ojs/ojlabel', 'ojs/ojnavigationlist',
    'ojs/ojconveyorbelt',
    'ojs/ojradioset'],
    function (oj, ko, $, app, weekChartOne, weekChartTwo) {
        /**
         * The view model for the main content view template
         */
        function weeklyChartContentViewModel() {
            var self = this;
            self.selectValue = ko.observable("H7");

            self.initWeek = ko.observable("week1");

            carType = self.selectValue();
            self.carDidChangeHandler = function (data) {
                if (data.detail.previousValue != data.detail.value) {
                    self.refreshAll();
                    //carType = self.selectValue();
                    //reload all charts to value week data
                }
            };
            self.pageTitle = ko.observable("质量周报");
            self.dateValue = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date(2018, 01, 28)));
            weekTime = self.dateValue();
            // Below are a subset of the ViewModel methods invoked by the ojModule binding
            // Please reference the ojModule jsDoc for additional available methods.
            self.currentModule = ko.observable("weekChartOne");
            self.datePicker = {
                weekDisplay: 'number'
            };

            self.topTitle = ko.pureComputed(function () {
                return self.dateValue().substring(0, 4) + "年红旗质量" + self.dateValue().substring(5) + "周报（每周二发放）";
            }, this);
            function convertDateFromString(dateString) {
                if (dateString) {
                    var date = new Date(dateString.replace(/-/, "/"))

                    return date;
                }
            }
            function getYearWeek(datestr) {
                var date = new Date();
                if(datestr!=''&&datestr!=undefined){
                    datestr = datestr.substring(0,10)
                    console.log(datestr)
                    date = convertDateFromString(datestr)
                }
                var date2 = new Date(date.getFullYear(), 0, 1);
                var day1 = date.getDay();
                if (day1 == 0) day1 = 7;
                var day2 = date2.getDay();
                if (day2 == 0) day2 = 7;
                d = Math.round((date.getTime() - date2.getTime() + (day2 - day1) * (24 * 60 * 60 * 1000)) / 86400000);
                return Math.ceil(d / 7) + 1;
            }
            self.dateDidChangeHandler = function (data) {
                if (data.detail.previousValue !== data.detail.value) {
                    console.log(data.detail.previousValue)
                    console.log(data.detail.value)
                    if (getYearWeek(data.detail.previousValue) !== getYearWeek(data.detail.value)) {
                        if (self.initWeek() == 'week1') {
                            self.initWeek('week2')
                        } else {
                            self.initWeek('week1')
                        }
                    }
                    self.refreshAll();
                    //reload all charts to value week data
                }
            };


            self.calculWeekNumber = function () {
                self.dateValue().substring(5, 10);
            }

            self.listItems = [
                {
                    id: "week1",
                    label: "市场信息",
                    disabled: false
                },
                {
                    id: "week2",
                    label: "整改单情况",
                    disabled: false
                },
                {
                    id: "week3",
                    label: "总成及自制作",
                    disabled: true
                },
                {
                    id: "week4",
                    label: "整车信息",
                    disabled: true
                },
                {
                    id: "week5",
                    label: "项目质量状态",
                    disabled: true
                },
                {
                    id: "week6",
                    label: "重大问题改进",
                    disabled: true
                }
            ];
            this.selectedItem = ko.observable('week1');

            self.navListOptionChangeHandler = function (event, data) {
                //                    console.log(event.detail.key);
                var newPage = "";
                switch (event.detail.key) {
                    case "week1":
                        newPage = "weekChartOne";
                        break;
                    case "week2":
                        newPage = "weekChartTwo";
                        break;
                    case "week3":
                        break;
                    case "week4":
                        break;
                    case "week5":
                        break;
                    case "week6":
                        break;
                    default:
                        newPage = "weekChartOne";
                        break;
                }
                self.currentModule(newPage);
                return true;
            };

            self.modulePath = ko.pureComputed(
                function () {
                    return { name: 'cellTabs/' + self.currentModule() };
                }
            );

            self.refreshWeekData = function (numOfWeek) {
                var jsonStr = "weekOne";
                switch (numOfWeek) {
                    case 1:
                        jsonStr = "weekOne";
                        break;
                    case 2:
                        jsonStr = "weekTwo";
                        break;
                    default:
                        break;
                }

                // Implement if needed
                //                    $.getJSON("js/data/week/" + jsonStr + ".json",
                //                            function (data)
                //                            {
                //                                console.log(data);
                //                                //   $('.changableSelect1').ojSelect("refresh");
                //                            });
            }

            self.refreshAll = function () {
                weekChartOne.refreshReport(self.initWeek(), self.selectValue(), self.dateValue().toString());
                weekChartTwo.refreshReport(self.initWeek(), self.selectValue(), self.dateValue().toString());
            }



            self.handleActivated = function (info) {
                // Implement if needed
            };

            /**
             * Optional ViewModel method invoked after the View is inserted into the
             * document DOM.  The application can put logic that requires the DOM being
             * attached here.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
             */
            self.handleAttached = function (info) {
                self.refreshWeekData();
            };


            /**
             * Optional ViewModel method invoked after the bindings are applied on this View. 
             * If the current View is retrieved from cache, the bindings will not be re-applied
             * and this callback will not be invoked.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             */
            self.handleBindingsApplied = function (info) {
                // Implement if needed
            };

            /*
             * Optional ViewModel method invoked after the View is removed from the
             * document DOM.
             * @param {Object} info - An object with the following key-value pairs:
             * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
             * @param {Function} info.valueAccessor - The binding's value accessor.
             * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
             */
            self.handleDetached = function (info) {
                // Implement if needed
            };
        }

        /*
         * Returns a constructor for the ViewModel so that the ViewModel is constructed
         * each time the view is displayed.  Return an instance of the ViewModel if
         * only one instance of the ViewModel is needed.
         */
        return new weeklyChartContentViewModel;
    });
