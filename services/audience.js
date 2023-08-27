const stores = require('../store/store');
const visitor = require('../config/visitor');

async function getAudience(req,res){
    let audienceList = await stores.getList()
    res.send(audienceList)
   
}
async function saveAudience(req,res){

	let id = req.body._id;
    let Query = {name:req.body.name,
        _id:id,
        domainUrl:req.body.domainUrl,
        rules:req.body.rules,
        personalizeConfig:req.body.personalizeConfig
    }
    
    let saveAudience = await stores.saveListAudience(id,Query);
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.send({status:200,data:[]})

}
async function personalisation(req,res){

    let id = req.query.id;
    let audienceList = await stores.getList();
    // let audienceList = [
    //     {
    //         "id": 1,
    //         "name": "Audience1",
    //         "employeeRange":5000,
    //         "experiences": [
    //             {
    //                 "name": "Header",
    //                 "value": "dark-header"
    //             },
    //             {
    //                 "name": "Category",
    //                 "value": "education"
    //             },
    //             {
    //                 "name": "cta-text",
    //                 "value": "Continue"
    //             }
    //         ]
    //     }
    // ]

    
    let visitorDetails = visitor.find(item => item.id ===id);
    
    let audienceRule ;
    audienceList.forEach(element => {
       let equalCondition = element.rules.find((list => list.condition == 'equals'));

       if(equalCondition){

            let rulematch =  element.rules.find((list => visitorDetails[list.configKey] ===list.value));
            
            if(rulematch){
                audienceRule = element
            }
       }
       let greaterThan = element.rules.find((list => list.condition == '>'));

       if(greaterThan){

        let rulematch =  element.rules.find((list => visitorDetails[list.configKey]>list.value));

        if(rulematch){
            audienceRule = element
        }
       }
    });
    
    
    if(audienceRule){
        if(audienceRule.personalizeConfig){
          
            let attributeValue = visitorDetails[audienceRule.personalizeConfig[0].attributeValue]|| audienceRule.personalizeConfig[0].attributeValue;
            let scriptFunction = `(function(ctx){
                (function(personalizeConfig){
                    let attributeId = ctx[0].attributeId;
                    var a=document.getElementById(attributeId);
                    a.textContent="`+attributeValue+`"
                    console.log(personalizeConfig)
                }(ctx))
            }(`+JSON.stringify(audienceRule.personalizeConfig)+`))`
            res.setHeader('Content-Type', 'text/javascript');
            res.send(scriptFunction)
        }
        //res.send({status:200,data:audienceRule})
    }
}



module.exports = {
    getAudience,
    saveAudience,
	personalisation
}
