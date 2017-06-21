//Copyright SF Studios Ltd. Bulgaria
({
	// Display the total in a "toast" status message 
    showToast : function(title,message){
         var resultsToast = $A.get("e.force:showToast");
        resultsToast.setParams({
            "title": title,
            "message": message
        });
        resultsToast.fire();
    },       
	// Close the action panel
    closePanel : function(){
        var dismissActionPanel = $A.get("e.force:closeQuickAction");
        dismissActionPanel.fire();
        
    }, 
    //Get object by recordId from the Page and the name of the apex method in format "c.mehtodName"
    //saves the resulting record to page attribute "rec"
    getObjectById : function(cmp,apexMethodName) {
        var self = this;
        var recId = cmp.get("v.recordId"); 
		var action = cmp.get(apexMethodName);
        action.setParams({
            "recId": recId
        });
        action.setCallback(self, function(response)
		{
			if ( cmp.isValid() && response.getState() === 'SUCCESS' )
			{
                var record = response.getReturnValue();  
                cmp.set("v.rec",record);
			}
			else
			{
                self.showToast('Error!', response.getError()[0].message);
                self.closePanel();
			}
		});
        $A.enqueueAction(action);
	},   
    //gets the current User details and saves to page attribute "user"
    getUser : function(cmp) {
        var self = this;
		var action = cmp.get("c.getCurrentUser");
        action.setCallback(self, function(response)
		{
			if ( cmp.isValid() && response.getState() === 'SUCCESS' )
			{
                var user = response.getReturnValue();
                cmp.set("v.user", user);
			}
			else
			{
                self.showToast('Error!', response.getError()[0].message);
                self.closePanel();
			}
		});
        $A.enqueueAction(action);
	},  
    //gets the Record type id. It requires prepopulated page attributes "objectAPIName" and "recordTypeName"
    //if recordTypeName is invalid it returns "Master"
    getRecordTypeByName : function(cmp) {
        var self = this;
		var action = cmp.get("c.getRecordTypeIdByNameAndApi");
		var rtName = cmp.get("v.recordTypeName");
		var objectAPIName = cmp.get("v.objectAPIName");        
        var result;
        
        action.setParams({
            "name": rtName,
            "api": objectAPIName
        });
        action.setCallback(self, function(response)
		{
			if ( cmp.isValid() && response.getState() === 'SUCCESS' )
			{
                result = response.getReturnValue();
                console.log('getRecordTypeByName result:' + result);
                cmp.set("v.recordTypeId", result);   
			}
			else
			{
                self.showToast('Error!', response.getError()[0].message);
                self.closePanel();
			}
		});
        
        if(action !== undefined && rtName !== undefined){
            $A.enqueueAction(action);
        }
                     
        return result;
	},
    createRecord : function(cmp) {},
})