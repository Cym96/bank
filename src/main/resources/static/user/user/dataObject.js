$.extend({
    toObject : function (rows, map) {
        var retRows = [];
        for (var i = 0; i < rows.length; i++) {
            var cols = rows[i];
            retRows[i] = new Array();
            for (var k = 0; k < map.length; k++) {
                retRows[i][map[k]] = cols[k];
            }
        }
        return retRows;
    }
});