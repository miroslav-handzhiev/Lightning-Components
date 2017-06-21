//Copyright SF Studios Ltd. Bulgaria
({
	getRTMap : function(cmp) {
        var self = this;
        var objectAPIName = cmp.get("v.objectAPIName");
		var action = cmp.get("c.getRecordTypeMapByApi");
        action.setParams({
            "api": objectAPIName
        });
        action.setCallback(self, function(response)
		{
			if ( cmp.isValid() && response.getState() === 'SUCCESS' )
			{
                var record = response.getReturnValue();
                self.createPicklistOptions(cmp,record);
			}
			else
			{
                self.showToast('Error!', response.getError()[0].message);
                self.closePanel();
			}
		});
        $A.enqueueAction(action);
	},
    createPicklistOptions : function(cmp,map) {        
		var options = [];
        //options.push({ label: "Please select a Recordtype", value: "" });
        Object.keys(map).forEach(key => {
            options.push({ label: key, value: map[key] });
        });
 		cmp.set("v.value",options[0].value);
        cmp.set("v.rtNameIdMap",options); 
	},
 	setNewValues : function(cmp,event) {    
		cmp.set("v.label", event.target.label);    
		cmp.set("v.value", event.target.value);
	},   
 	setObjectRecordTypeId : function(cmp) {    
		cmp.set('v.selectedRTId', cmp.get("v.value"));    
	}, 
        
})