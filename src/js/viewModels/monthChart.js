/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * dailyChart module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'appController','viewModels/cellTabs/monthChartOne','viewModels/cellTabs/monthChartTwo', 'ojs/ojdatetimepicker',
    'ojs/ojselectcombobox', 'ojs/ojtimezonedata', 'ojs/ojlabel', 'ojs/ojnavigationlist',
    'ojs/ojconveyorbelt',
    'ojs/ojradioset'],
        function (oj, ko, $, app,monthChartOne,monthChartTwo) {
            /**
             * The view model for the main content view template
             */
            function monthChartContentViewModel() {
                var self = this;
                self.initMonth = ko.observable("month1");
                self.selectValue = ko.observable("H7");
                carType = self.selectValue();
                self.carDidChangeHandler = function (data) {
                    if (data.detail.previousValue !== data.detail.value) {
                        self.refreshAll();
                        console.log(self.selectValue());
                        //carType = self.selectValue();
                        //reload all charts to value week data
                    }
                };
                self.dateDidChangeHandler = function (data) {
                    if (data.detail.previousValue !== data.detail.value) {
                        if(data.detail.previousValue.substring(0,7)!= data.detail.value.substring(0,7)){
                            if(self.initMonth()=='month1'){
                                self.initMonth('month2')
                            }else{
                                self.initMonth('month1')
                            }
                        }
                        self.refreshAll();
                        //reload all charts to value week data
                    }
                };
                self.datePicker = {
                    weekDisplay: 'number'
                };
    
                self.pageTitle = ko.observable("质量月报");
                self.dateValue = ko.observable(oj.IntlConverterUtils.dateToLocalIso(new Date(2018, 01, 28)));
                // Below are a subset of the ViewModel methods invoked by the ojModule binding
                // Please reference the ojModule jsDoc for additional available methods.
                self.selectedTab = ko.observable("1");
                self.tabSelect = ko.observable("1");
                self.currentModule = ko.observable("monthChartOne");
                
                self.topTitle =  ko.pureComputed(function () {
                    return self.dateValue().substring(0, 7) + "月份红旗质量月报" ;
                }, this);

                self.listItems = [
                    {
                        id: "mon1",
                        label: "市场质量状态",
                        disabled: false
                    },
                    {
                        id: "mon2",
                        label: "整车质量状态",
                        disabled: false
                    },
                    {
                        id: "mon3",
                        label: "项目质量状态",
                        disabled: true
                    },
                    {
                        id: "mon4",
                        label: "过程质量状态",
                        disabled: true
                    },
                    {
                        id: "mon5",
                        label: "整改单情况",
                        disabled: true
                    },
                    {
                        id: "mon6",
                        label: "下一步重点工作",
                        disabled: true
                    }
                ];
                this.selectedItem = ko.observable('mon1');

                self.navListOptionChangeHandler = function (event, data) {
                    console.log(event.detail.key);
                    var newPage = "";
                    switch (event.detail.key) {
                        case "mon1":
                            newPage = "monthChartOne";
                            break;
                        case "mon2":
                            newPage = "monthChartTwo";
                            break;
                        case "mon3":              
                            break;
                        case "mon4":
                            break;
                        case "mon5":
                            break;
                        case "mon6":
                            break;
                        default:
                            newPage = "monthChartOne";
                            break;
                    }
                    self.currentModule(newPage);
                    return true;
                };

                self.refreshAll=function(){
                    monthChartOne.refreshReport(self.initMonth(),self.selectValue(),self.dateValue())
                    monthChartTwo.refreshReport(self.initMonth(),self.selectValue(),self.dateValue())
                }

                self.modulePath = ko.pureComputed(
                        function ()
                        {
                            return {name: 'cellTabs/' + self.currentModule()};
                        }
                );
                /**
                 * Optional ViewModel method invoked when this ViewModel is about to be
                 * used for the View transition.  The application can put data fetch logic
                 * here that can return a Promise which will delay the handleAttached function
                 * call below until the Promise is resolved.
                 * @param {Object} info - An object with the following key-value pairs:
                 * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
                 * @param {Function} info.valueAccessor - The binding's value accessor.
                 * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
                 * the promise is resolved
                 */
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
                    // Implement if needed
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
            return monthChartContentViewModel;
        });
