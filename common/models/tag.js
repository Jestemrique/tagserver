'use strict';

module.exports = function(Tag) {

    /**
    * Get a list of cases associated with the tag 'tagName'
    * GET /:tagName/cases
    */
    Tag.getTagCases = function (tagName, cb) {
    
        let tagInstance = this.app.models.TagInstance;
        var filter = {where: {'name': tagName}};
        
        tagInstance.find(filter, (error, listInstances) => {
            var listCases = [];
            listInstances.forEach( Instance => { 
                listCases.push(Instance.caseID);
            });
            cb(null, listCases);
        });
    }

    Tag.remoteMethod('getTagCases', {
        http: {path: '/:tagName/cases', verb: 'get' },
        accepts: {arg: 'tagName', type: 'string', required: true},
        returns: { type: 'object', root: true}
        }
    );

    //End getTagCases();

    
};
