# AWS COGNITO APP

INSTRUCTIONS--->

1) INTIALIZE YOUR .env WITH THE VARIABLES MENTIONED IN  THE CONFIG FILE

2) FOR FILTERING THE NGINX LOGS , PASS THE VALUE IN THE KEY FIELD OF PAYLOAD

request payload for signing up the user-->
{
     "username": "badbunn",
    "password": "",
    "email":"mohitgarg08030@gmail.com"
}

request payload for verifying  the user-->
{
     "username": "badbunn",
    "token": ""
    
}

request payload for signin in-->
{
     "username": "badbunn",
    "password": ""
    
}

request payload for filtering --->
{
    "key":"IP ADDRESS/API NAME/DATE/REQUEST METHOD"
}
