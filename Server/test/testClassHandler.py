import requests

createClassRequest = requests.get('http://localhost:5000/api/v1/classes/create', data={})

joinClassRequest = requests.post('http://localhost:5000/api/v1/classes/join', data={})
getUserEnrolledClassesRequest = requests.post('http://localhost:5000/api/v1/classes/join', data={})
getClassDetailsRequest = requests.post('http://localhost:5000/api/v1/classes/join', data={})
createGroupsRequest = requests.post('http://localhost:5000/api/v1/classes/join', data={})
getAllClassesGroupsRequest = requests.post('http://localhost:5000/api/v1/classes/join', data={})
getStudentsClassGroupRequest = requests.post('http://localhost:5000/api/v1/classes/join', data={})
deleteClassRequest = requests.post('http://localhost:5000/api/v1/classes/join', data={})


print(createClassRequest.text)
print(joinClassRequest.text)
print(getClassDetailsRequest.text)
print(createGroupsRequest.text)
print(getAllClassesGroupsRequest.text)
print(getStudentsClassGroupRequest.text)
print(deleteClassRequest.text)

