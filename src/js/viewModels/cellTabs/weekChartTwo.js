/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * weekChartTwo module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'jet-composites/my-sunburst/loader', 'ojs/ojsunburst', 'ojs/ojbutton', 'ojs/ojpopup', 'ojs/ojlistview', 'ojs/ojarraydataprovider'
], function (oj, ko, $) {
    /**
     * The view model for the main content view template
     */
    function weekChartTwoContentViewModel() {
        var self = this;
        self.dataurlarr = ko.observableArray();
        self.dataurlarr2 = ko.observableArray();
        var mainlegend = "共：63份   本周完成：9份  累计完成：21份";
        self.sunDes = ko.observable("共：63份   本周完成：9份  累计完成：21份");
        var handler = new oj.ColorAttributeGroupHandler();
        self.jsonData = {};
        self.nodeValues = ko.observableArray();
        self.desList = ko.observableArray([]);


        self.refreshReport = function (weekStr, carType, dateStr) {
            var path = weekStr + "/" + carType + "/";
            self.dataurlarr.removeAll()
            self.dataurlarr2.removeAll()
            self.dataurlarr.push({dataurl: 'js/data/week/' + path + 'bar22.json', chartname: '质量问题整改通知单发放情况'});
            self.dataurlarr2.push({dataurl: 'js/data/week/' + path + 'bar23.json', chartname: '责任单位分布情况'});

            $.getJSON('js/data/week/' + path + 'sun.json',
                    function (data)
                    {
                        mainlegend = "共：" + data.total + "份   本周完成：" + data.weekDone + "份  累计完成：" + data.done + "份";
                        self.sunDes(mainlegend);

                        var dataArray = createNode("总计", data.total, 0);
                        var reg_NE = createNode(data.N.NNAME, data.N.count, 2);
                        var reg_MW = createNode(data.W.WNAME, data.N.count, 1);
                        var div_NE = createNode(data.N.NDNAME, data.N.ND, 2);
                        var div_MA = createNode(data.N.NUNAME, data.N.NU, 4);
                        var div_EN = createNode(data.W.WDNAME, data.W.WD, 1);
                        var div_WN = createNode(data.W.WUNAME, data.W.WU, 3);
                        addChildNodes(dataArray, [reg_NE, reg_MW]);
                        addChildNodes(reg_NE, [div_NE, div_MA]);
                        addChildNodes(reg_MW, [div_EN, div_WN]);
                        self.nodeValues([dataArray]);
                        self.jsonData = data;
                        console.log(data);
                    });
        }

        self.refreshReport('week1', 'H7', '');

        function createNode(label, population, meanIncome) {
            return {label: label,
                id: label,
                value: population,
                color: getColor(meanIncome),
                shortDesc: "&lt;b&gt;" + label +
                        "&lt;/b&gt;&lt;br/&gt;数量: " +
                        population};
        }


        self.listener = function (event) {

            var legend;
            var checkString = event.detail.id.substring(0, 1);
            if (checkString == "完" || checkString == "未") {
                legend = event.detail.id + "份 点击查看详细表单信息";
                self.sunDes(legend);
                var cellArray = self.jsonData.cells;
                var checkPot = true;
                for (var i = 0; i < cellArray.length; i++) {
                    if (cellArray[i].name === event.detail.id) {
                        console.log(cellArray[i].list);
                        self.desList.removeAll();
                        if (cellArray[i].list.length !== 0) {
                            self.desList(cellArray[i].list);
                            console.log("in here");
                        }

                        checkPot = false;
                    }
                }
//                if (checkPot === true) {
//                  
//                }

//                $( "#weeklistview" ).ojListView( "refresh" );
                var popup = document.querySelector('#popupWeek');
                popup.open();
            } else if (checkString == "总") {
                self.sunDes(mainlegend);
            } else {
                legend = event.detail.id.substring(0, 2) + "共 " + event.detail.data.value + " 份 点击“完成”或“未完成”查看详细表单信息";
                self.sunDes(legend);
            }
        }

        self.startAnimationListener = function (data, event)
        {
            var ui = event.detail;
            if (!$(event.target).is("#popupWeek"))
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


        function getColor(meanIncome) {
            if (meanIncome == 0) {
                return handler.getValue('1stQuartile');
            } else if (meanIncome == 1) {
                return handler.getValue('2ndQuartile');
            } else if (meanIncome == 2) {
                return handler.getValue('3rdQuartile');
            } else if (meanIncome == 3) {
                return handler.getValue('4thQuartile');
            } else {
                return handler.getValue('5thQuartile');
            }

        }




        function addChildNodes(parent, childNodes) {
            parent.nodes = [];
            for (var i = 0; i < childNodes.length; i++) {
                parent.nodes.push(childNodes[i]);
            }
        }

//        var data = [
//            {
//                id: 0,
//                k1: "2018年1月12日 15:23",
//                k2: "通知级",
//                k3: "质保部",
//                k4: "2天内提供质量整改方案",
//                k5: "红旗H7-FL",
//                k6: "车辆启动后显示“废气监测系统故障”",
//                k7: "已完成",
//                content : "test"
//            }
//        ];
        self.dataProvider = new oj.ArrayDataProvider(self.desList,
                {keys: self.desList().map(function (value) {
                        return value.id;
                    })});
        this.content = ko.observable("");

        self.gotoList = function (event, ui) {
            document.getElementById("weeklistview").currentItem = null;
            self.slide();
        };

        self.gotoContent = function (event) {
            if (event.detail.value !== null)
            {
                console.log(event);
                var row = self.desList()[event.detail.value];
                self.content(row.content);
                self.slide();
            }
        };


        this.slide = function () {
            $("#drillList1").toggleClass("demo-page1-hide");
            $("#drillList2").toggleClass("demo-page2-hide");
        }

    }

    return new weekChartTwoContentViewModel;
});
