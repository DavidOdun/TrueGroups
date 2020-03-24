import requests

createRequest = requests.put('http://localhost:5000/api/v1/users/create', data=
{"title": "Mr.", "first_name": "Professor", "last_name": "One", "preferred_first_name": "Tester", "user_name": "testProfessor1",
 "email": "testProfessorOne@account.com", "password": "password", "user_type": "student", "institution": "University of Notre Dame"
 })

# authenticateRequest = requests.post('http://localhost:5000/api/v1/users/authenticate', data=
# {"email": "test@account.com", "password": "newPassword"})

# updateBasicRequest = requests.post('http://localhost:5000/api/v1/users/update/basic/testAccount', data=
# {
#     "password": "newPassword",
# })

#
# updateSurveyRequest = requests.post('http://localhost:5000/api/v1/users/update/survey/testAccount', data=
# {
#     "question_id": "1",
#     "response": "5"
# })
#
getUserRequest = requests.get('http://localhost:5000/api/v1/users/get/testAccount')

print(createRequest.text)
