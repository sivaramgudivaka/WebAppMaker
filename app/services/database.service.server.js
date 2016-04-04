module.exports = function(app, db) {
    
    // listen for incoming insert database commands
    app.post("/api/database/:pageName", insert);

    function insert(req, res) {
        
        // data document is in body
        var fields = req.body;
        
        // use page name as name of collection
        var pageName = req.params.pageName;
        pageName = pageName.replace(/ /g, '_');
        var collection = db.collection(pageName);
        
        // insert document into collection
        collection.insert(
            fields,
            function (err, doc) {
                if(!err) {
                    res.json(doc);
                } else {
                    res.status(400).send(err);
                }
            }
        );
    }
};
