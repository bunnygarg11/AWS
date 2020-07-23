# AWS COGNITO APP

INSTRUCTIONS--->

1) INTIALIZE YOUR .env WITH THE VARIABLES MENTIONED IN  THE CONFIG FILE

2) FLOW OF THE APP -->
SIGNUP-->VERIFY USER --> LOGIN --> LIST NGINX LOG---> FILTER

3) FOR FILTERING THE NGINX LOGS , PASS THE VALUE IN THE KEY FIELD OF PAYLOAD

request payload for signing up the user-->
method--> POST
{
     "username": "badbunn",
    "password": "",
    "email":"mohitgarg08030@gmail.com"
}

request payload for verifying  the user-->
method-->POST
{
     "username": "badbunn",
    "token": ""
    
}

request payload for signin in-->
method--> POST
{
     "username": "badbunn",
    "password": ""
    
}

request payload for filtering --->
method--> POST
header--> "x-auth-token":ACCESS TOKEN
{
    "key":"IP ADDRESS/API NAME/DATE/REQUEST METHOD"
}

request for fetch nginx list
method--> GET 
header--> "x-auth-token":ACCESS TOKEN


NOTE :--->
 PASS ACCESS TOKEN RECIEVED IN THE RESPONSE OF LOGIN API IN THE HEADER OF THE NGINX_LIST API AND FILTER API


