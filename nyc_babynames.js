//Built to consume data from cityofnewyork at https://data.cityofnewyork.us/resource/25th-nujf.json

(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "BIRTH_YEAR",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "GENDER",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "ETHNICITY",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "NAME",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "COUNT",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "RANK",
            dataType: tableau.dataTypeEnum.int
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
        var apiCall = "https://data.cityofnewyork.us/api/views/25th-nujf/rows.json"
        $.getJSON(apiCall, function(resp) {
            //capture the .data array as feat
            var feat = resp.data,
                tableData = [];
                
            //Iterate over the JSON object and push to table
            //Omit headers for 0-7 for key data elements
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "BIRTH_YEAR": feat[i][8],
                    "GENDER": feat[i][9],
                    "ETHNICITY": feat[i][10],
                    "NAME": feat[i][11],
                    "COUNT": feat[i][12],
                    "RANK": feat[i][13],
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
