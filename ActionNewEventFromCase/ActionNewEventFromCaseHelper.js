//Copyright SF Studios Ltd. Bulgaria
({	

	//create record with prepopulated values
	createRecord : function (cmp) {             
        var rec = cmp.get("v.rec");
        var rtId = cmp.get("v.recordTypeId");
        
        var locationString =  '';
        
        var createRecordEvent = $A.get("e.force:createRecord");        
        createRecordEvent.setParams({
            "entityApiName": "Event",
            'defaultFieldValues': {
			'WhatId': rec.Id,
			//'WhoId': rec.Id,
			'Location': locationString
			},
            "recordTypeId":rtId
        });
        createRecordEvent.fire();
	}, 	
})