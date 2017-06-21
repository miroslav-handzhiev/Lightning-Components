// @description: Controller class for Quick Action Lightning Components
//				containing simple SObject opperations
// @author: Miroslav Handzhiev
// @copyright: SF Studios Ltd.

public with sharing class SObjectService 
{
	//Used from a component called on account page
	@AuraEnabled
	public static Account getAccountById(Id recId)
	{
		return [Select Id, Name, BillingCity, BillingCountry, BillingCountryCode,
                BillingPostalCode, BillingState, BillingStateCode, BillingStreet,
                Industry
		From Account Where Id = :recId Limit 1];
	}
    
    //Used from a component called on case page
	@AuraEnabled
	public static Case getCaseById(Id recId)
	{
		return [Select Id, Asset_Location__c
		From Case Where Id = :recId Limit 1];
	}
    
    //Used from a component called on Opportunity page
	@AuraEnabled
	public static Opportunity getOpportunityById(Id recId)
	{
		return [Select Id, AccountId, Account.Name, Account.BillingCountryCode, Account.BillingState, Account.BillingCity                
		From Opportunity Where Id = :recId Limit 1];
	}
  
    //Used from a component called on Asset page
	@AuraEnabled
	public static Quote getQuoteById(Id recId)
	{
		return [Select Id, Name, Account.Name, OpportunityId        
		From Quote Where Id = :recId Limit 1];
	} 
    
    //Used to get the running user data to a component
    @AuraEnabled
    public static User getCurrentUser() 
    {
        return [SELECT Id, FirstName, LastName 
                FROM User WHERE Id = :UserInfo.getUserId() LIMIT 1];
  	}
    
    //Used to get the running user data to a component
    @AuraEnabled
    public static Id getRecordTypeIdByNameAndApi(String name, String api)
    {
        Map<String,Id> mapofCaseRecordTypeNameandId = new Map<String,Id>();
        mapofCaseRecordTypeNameandId = getRecordTypeMapByApi(api);        
        Id result =  mapofCaseRecordTypeNameandId.get(name);
        if(result == null)
        {
            result = mapofCaseRecordTypeNameandId.get('Master');
        }
        return result;        
    }
    
    //Used to get the running user data to a component
    @AuraEnabled
    public static Map<String,Id> getRecordTypeMapByApi(String api)
    {
    	String objectAPIName = api ; //any object api
        Schema.DescribeSObjectResult sobjectResult = Schema.getGlobalDescribe().get(objectAPIName).getDescribe();
        List<Schema.RecordTypeInfo> recordTypeInfo = sobjectResult.getRecordTypeInfos();
        Map<String,Id> mapofCaseRecordTypeNameandId = new Map<String,Id>();
        for(Schema.RecordTypeInfo info : recordTypeInfo)
        {
        	mapofCaseRecordTypeNameandId.put(info.getName(),info.getRecordTypeId());
        }        
        return mapofCaseRecordTypeNameandId;        
    }
}