
API documentation

----------------------------------------------------------------------------------------------

add a topic

curl --location 'https://persona-iysw.onrender.com/topics' \
--header 'Content-Type: application/json' \
--data '{
    "name":"bollywood"
}'

----------------------------------------------------------------------------------------------

get topics

curl --location 'https://persona-iysw.onrender.com/topics'

----------------------------------------------------------------------------------------------

add a subscriber

curl --location 'https://persona-iysw.onrender.com/subscribers' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"rohithudandra@gmail.com"
}'

----------------------------------------------------------------------------------------------

get all subscribers

curl --location 'https://persona-iysw.onrender.com/subscribers'

----------------------------------------------------------------------------------------------

subscribe a user to a topic

subscribers/{subscriberId}/subscribe/{topicId}
curl --location --request POST 'https://persona-iysw.onrender.com/subscribers/2/subscribe/3'

----------------------------------------------------------------------------------------------

get the server time

curl --location 'https://persona-iysw.onrender.com/time'

get the time before posting a content and set the time a minute later to recieve the mails immediately

----------------------------------------------------------------------------------------------

add a content

curl --location 'https://persona-iysw.onrender.com/contents' \
--header 'Content-Type: application/json' \
--data '{
    "time":"2024-05-04T17:16:00.000Z",
    "text":"you are an engineer hahaha",
    "topic":"1"
}'

----------------------------------------------------------------------------------------------