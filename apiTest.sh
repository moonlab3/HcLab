name=$1
c=1
while [ 1 ]
do
secs=$SECONDS
curl -X POST http://127.0.0.1:3000/hscan -d '{"id": "'"$name""$secs"'", "pass":'"$secs"'}' -H "Content-Type: application/json"
echo ""
sleep .1
secs=$SECONDS
curl -X GET http://127.0.0.1:3000/hscan -d '{"id":"'"$name""$secs"'", "pass":'"$secs"'}' -H "Content-Type: application/json"
echo ""
sleep .1
secs=$SECONDS
curl -X PUT http://127.0.0.1:3000/hscan -d '{"id":"'"$name""$secs"'", "pass":'"$secs"'}' -H "Content-Type: application/json"
echo ""
sleep .1
secs=$SECONDS
curl -X DELETE http://127.0.0.1:3000/hscan -d '{"id":"'"$name""$secs"'", "pass":'"$secs"'}' -H "Content-Type: application/json"
echo ""
sleep .1
done

