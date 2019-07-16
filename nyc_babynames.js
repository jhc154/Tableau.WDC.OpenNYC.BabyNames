//Built to consume data from cityofnewyork at https://data.cityofnewyork.us/resource/25th-nujf.json

(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "BIRTH_YEAR",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "COUNT",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "ETHNICITY",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "GENDER",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "NAME",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "RANK",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "NYC_BABYNAME_STATS",
            alias: "Baby Name Stats in New York",
            columns: cols
        };
        schemaCallback([tableSchema]);
    };


    myConnector.getData = function(table, doneCallback) {
        //JSON link based on search result from data.gov
        var apiCall = "https://data.cityofnewyork.us/resource/25th-nujf.json"
        $.getJSON(apiCall, function(resp) {

            var feat = resp,
                tableData = [];
                
            //Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "BIRTH_YEAR": feat[i].brth_yr,
                    "COUNT": feat[i].cnt,
                    "ETHNICITY": feat[i].ethcty,
                    "GENDER": feat[i].gndr,
                    "NAME": feat[i].nm,
                    "RANK": feat[i].rnk,
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };


    tableau.registerConnector(myConnector);
    $(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "NYC Baby Name Stats";
        tableau.submit();
    });
});

})();
