////Copyright SF Studios Ltd. Bulgaria
({
	handleClosePanel : function(component, event, helper) {
		helper.closePanel();
	},
    handleRecChange : function (component, event, helper) {  
        helper.getRecordTypeByName(component);   	
    },
    handleRTChange : function (component, event, helper) {   
        helper.createRecord(component);
        window.setTimeout(
                        $A.getCallback(function() {
                            helper.closePanel();
                        })
        ,50);
	},
})