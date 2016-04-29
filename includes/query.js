var querys = {

search_aiport:"SELECT * FROM iata_airport_codes WHERE airport LIKE '%%query%%' LIMIT 5",

new_user:"INSERT INTO transit_table VALUES(NULL,'%name%','%dest%','%source%','')",

update_channel:"UPDATE transit_table SET user_channel ='%channel%' WHERE user_id=%user_id%"


}