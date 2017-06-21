//Copyright SF Studios Ltd. Bulgaria
({
	init : function(component, event, helper) {
		helper.getRTMap(component);
	},
    handleChangeValue: function(component, event, helper){
        helper.setNewValues(component,event);
    },
    handleSelectValue: function(component, event, helper){
        helper.setObjectRecordTypeId(component);
    },
})