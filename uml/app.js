var data = require("./uml.mock.json");
var mongojs = require("mongojs");
var db = mongojs('uml');

module.exports = function (app) {

    app.get("/uml/", start);

    app.get   ("/uml/:entity",            listController);
    app.get   ("/uml/:entity/new",        createController);
    app.get   ("/uml/:entity/:id/edit",   editController);

    app.post  ("/uml/:entity",            createAction);
    app.post  ("/uml/:entity/:id/update", updateAction);
    app.get   ("/uml/:entity/:id/delete", removeAction);

    function updateAction(req, res) {

        var entityName = req.params.entity;
        var id         = req.params.id;

        var collection = db.collection(entityName);
        collection.updateAction(
            {"_id": mongojs.ObjectId(id)},
            {$set: req.body},
            function(err, doc){
                res.redirect("/uml/"+entityName);
            }
        );
    }

    function editController(req, res) {

        var entityName = req.params.entity;
        var id = req.params.id;

        var entityObj  = data[entityName];

        var collection = db.collection(entityName);
        collection.findOne(
            {"_id": mongojs.ObjectId(id)},
            function(err, doc){

                var context = {
                    entity: entityObj,
                    doc: doc
                };

                res.render("uml/edit", context);
            }
        );
    }

    function removeAction(req, res) {

        var entityName = req.params.entity;
        var id = req.params.id;

        var collection = db.collection(entityName);
        collection.remove(
            {"_id": mongojs.ObjectId(id)},
            function(err, doc){
                res.redirect("/uml/"+entityName);
            }
        );
    }

    function createAction(req, res) {

        var entityName = req.params.entity;

        var collection = db.collection(entityName);
        collection.insert(
            req.body,
            function(err, doc){
                res.redirect("/uml/"+entityName);
            }
        );
    }

    function  createController(req, res) {

        var entityName = req.params.entity;
        var entityObj  = data[entityName];

        var context = {
            entity: entityObj
        };

        res.render("uml/new", context);
    }

    function start(req, res) {
        var entityName = data.start;
        res.redirect("/uml/"+entityName);
    }

    function listController(req, res) {
        
        var entityName = req.params.entity;
        var entityObj  = data[entityName];

        var collection = db.collection(entityName);

        collection.find(function(err, docs){

            var context = {
                entity: entityObj,
                docs: docs
            };

            res.render("uml/list", context);
        });
    }
}