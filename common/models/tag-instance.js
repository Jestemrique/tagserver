'use strict';

module.exports = function(Taginstance) {

    /**
     * Creates a tag instance for a case and, if the tag does not exist, creates a tag using the Tag model.
     * Action hook
     * POST /TAgInstances
     */
    Taginstance.observe('before save', (context, next) =>{
        //Create paret Tag in case it doesn't exist
        //console.log('Stop');
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
               //if (created){
                   //context.instance.parentTagID = instance.$id.id;
                //   context.instance.parentTagID = "hola caracola";
               //}
        });
        //console.log('Stop');
        next();
    }); 

    //End POST /TagInstances

    /**
     * REMOVE TAG FROM A CASE
     * Remote MEthod
     * DELETE /TagInstances/:tagName
     * NOTE: 
     *  _ This method remove a tag from a case (removes a tag instance) given the tag's name and also checks if there are cases with that same tag
     *  _ In case there are it does nothing,
     *  _ In case this is the las tag, it also removes the Tag in the Tag model.
     */


    //Check how many taginstances are left.
    /*
    var leftTagInstances = function(tagName){
        let whereTagNameFilter = {where:{"name": context.instance.name}};
        Taginstance.find(whereTagNamefilter, lefTagNAmes){
        if (Error){
            console.log("Error: " + error);
        }
        }
    };
    */ 
    Taginstance.removeTag = function(tagName, caseID, cb){
        
        //this.app.models.TagInstance.find({name: tagName}, {caseID: caseID}, (error, listinstances) => {
        //    //console.log("stop");
        //});
    console.log("Stop");
        
        this.app.models.TagInstance.destroyAll({and: [{name: tagName}, {caseID: caseID}]}, (err, info) => {
            console.log("Stop");
            cb(null, info);
        });
        //Check this code.
        //How to remve document from Tag when there are no TagInstances documents.
        //this.app.models.TagInstance.count({"name": tagName}, (error, count, next) => {
        //    console.log("Stop");
        //    next();
        //});
    }
    
    Taginstance.remoteMethod('removeTag', {
        http: {path: "/TagInstnstances/:tagName/:caseID", verb: 'delete'},
        accepts: [  
                    {arg:'tagName', type:'string', required: true},
                    {arg: 'caseID',  type: 'string', required: true}
                ],
        returns: {type: 'object', root: true}                 
                
    });
    
    //End removeTag()


    
};
