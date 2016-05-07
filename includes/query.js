var querys = {

search_aiport:"SELECT * FROM iata_airport_codes WHERE airport LIKE '%qry%%' LIMIT 10",

new_user:"INSERT INTO transit_table VALUES(NULL,'%name%','%dest%','%source%','')",

update_channel:"UPDATE transit_table SET user_channel ='%channel%' WHERE user_id=%user_id%",
fetch_channel:"SELECT user_channel from transit_table WHERE user_id = %id%"


}



module.exports = querys;