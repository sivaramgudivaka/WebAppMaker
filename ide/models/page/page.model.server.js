var mongoose = require("mongoose");

module.exports = function(websiteModel) {

    var PageSchema = require("./page.schema.server")();
    var Page       = mongoose.model("Page", PageSchema);

    var Website = websiteModel.getMongooseModel();

    var api = {
        createPage          : createPage,
        findPagesForWebsite : findPagesForWebsite,
        findPage            : findPage,
        findPageById        : findPage,
        removePage          : removePage,
        updatePage          : updatePage,
        sortPage            : sortPage
        // findPagesFromWidgetId: findPagesFromWidgetId
    };
    return api;

    // function findPagesFromWidgetId(widgetId) {
    //     Widget
    //         .findById(widgetId)
    //         .populate("_page", "_website")
    //         .then(
    //             function(page) {
    //                 return page.populate("_website");
    //             }
    //         )
    // }

    function sortPage(websiteId, startIndex, endIndex) {
        return Website
            .findById(websiteId)
            .then(
                function(website) {
                    website.pages.splice(endIndex, 0, website.pages.splice(startIndex, 1)[0]);

                    // notify mongoose 'pages' field changed
                    website.markModified("pages");

                    website.save();
                }
            );
    }

    function updatePage(pageId, pageObj) {
        return Page.findById(pageId).update(pageObj);
    }

    function removePage(pageId) {
        return Page.findById(pageId).remove();
    }

    function findPage(pageId) {
        return Page.findById(pageId)
    }

    function findPagesForWebsite(websiteId) {
        return Page.find({_website: websiteId});
    }

    function createPage(websiteId, page) {
        page._website = websiteId;
        return Page.create(page);
    }
};
