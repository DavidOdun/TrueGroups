import requests

testRequest = requests.get('http://localhost:5000/api/hello', data={})

createRequest = requests.put('http://localhost:5000/api/v1/users/create', data=
{"title": "Mr.", "first_name": "Test", "last_name": "Account", "preferred_first_name": "Tester", "user_name": "test",
 "email": "test@account.com", "raw_password": "password", "user_type": "student", "institution": "University of Notre Dame"
 })

authenticateRequest = requests.post('http://localhost:5000/api/v1/users/authenticate', data=
{"email": "test@account.com", "password": "password"})

updateBasicRequest = requests.post('http://localhost:5000/api/v1/users/update/basic/test', data=
{
    "first_name": "Test",
})


updateSurveyRequest = requests.post('http://localhost:5000/api/v1/users/update/survey/test', data=
{
    "question_id": "",
    "response": ""
})

getUserRequest = requests.get('http://localhost:5000/api/v1/users/get/test')


print(getUserRequest.text)
