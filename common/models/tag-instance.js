'use strict';

module.exports = function(Taginstance) {

    /**
     * Creates a tag instance for a case and, if the tag does not exist, creates a tag using the Tag model.
     * Action hook
     * POST /TAgInstances
     */
    Taginstance.observe('before save', (context, next) =>{
        //Create paret Tag in case it doesn't exist
        let Tag = context.Model.app.models.Tag;
        let tagName = context.instance.name;
        let tagObject = {
            name: context.instance.name
        }
        let where_filter = {where: {"name": context.instance.name}};
        
        Tag.findOrCreate(where_filter, tagObject, (error, instance, created) =>{
               if (error){
                   console.log(error);
               }
        });

        next();
    });//End POST /TagInstances

    /**
     * REMOVE TAG FROM A CASE
     * Remote MEthod
     * DELETE /TagInstances/:tagName
     * NOTE: 
     *  _ This method remove a tag from a case (removes a tag instance) given the tag's name and also checks if there are cases with that same tag
     *  _ In case there are it does nothing,
     *  _ In case this is the las tag, it also removes the Tag in the Tag model.
     */
    Taginstance.removeTag = function(tagName, caseID, cb){
        this.app.models.TagInstance.destroyAll({and: [{name: tagName}, {caseID: caseID}]}, (err, info) => {
            console.log("Stop");
            cb(null, info);
        });
    }
    
    Taginstance.remoteMethod('removeTag', {
        http: {path: "/:tagName/:caseID", verb: 'delete'},
        accepts: [  
                    {arg:'tagName', type:'string', required: true},
                    {arg: 'caseID',  type: 'string', required: true}
                ],
        returns: {type: 'object', root: true}                 
                
    });//End removeTag()

    /**
     * Get the tags for a specific case.
     * Remote method.
     * GET /Taginstancese/:caseID/tags
     */

     Taginstance.getCaseTags = function(caseID, cb){
         //console.log("stop");
         let where_filter = { where: {caseID: caseID} } ;
         
         this.find(where_filter, (error, models) =>{
            console.log("Stop");
            cb(null, models);
         });
     }

     Taginstance.remoteMethod('getCaseTags', {
        http: {path: "/:caseID/tags", verb: 'get'},
        accepts: [
                    {arg:'caseID', type: 'string', required: true}
                ],
        returns: {type: 'object', root: true}
     });

    
};
