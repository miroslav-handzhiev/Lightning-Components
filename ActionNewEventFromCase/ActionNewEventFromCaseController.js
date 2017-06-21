//Copyright SF Studios Ltd. Bulgaria
({
    init : function (component, event, helper) { 
    	helper.getObjectById(component,"c.getCaseById");       
	},    
    handleRTChange : function (component, event, helper) {   
        helper.createRecord(component);
	},
})