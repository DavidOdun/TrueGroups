import requests

# createQuestionRequest = requests.post('http://localhost:5000/api/v1/questions/add', data=
# {
#     "question_string": "How are you?"
# })

getAllQuestionsRequest = requests.get('http://localhost:5000/api/v1/questions/all')
#
# removeQuestionRequest = requests.post('http://localhost:5000/api/v1/questions/remove/question_id')

print(getAllQuestionsRequest.text)

