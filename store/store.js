const dbconnection = require('../commonUtils/dbConnections');

async function getList() {
	const db = await dbconnection.websightsConnection();
	return await db.collection("audience").find({}).toArray();
}
async function saveListAudience(id, query) {
	const db = await dbconnection.websightsConnection();
	return await db.collection("audience").updateOne(
		{
			_id: id
		},
        {
            $set:{
                ...query
            }
        },
        {
            upsert:true
        }
	);
}
module.exports = {
    getList,
    saveListAudience
}