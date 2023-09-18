export const questions = [
    {
        "id": 1,
        "content": "What is your name?",
        "type": "free",
        "answerSet":"",
        "nextQuestion": 2
    },
    {
        "id": 2,
        "content": "Do you play sport?",
        "type": "multi",
        "answerSet":['yes', 'no'],
        "nextQuestion": {
            "yes": 3,
            "no": 4
        }
    },
    {
        "id": 3,
        "content": "Which sport do you play?",
        "type": "free",
        "answerSet":"",
        "nextQuestion": 4
    },
    {
        "id": 4,
        "content": "Do you like movies?",
        "type": "multi",
        "answerSet":['yes', 'no'],
        "nextQuestion": {
           "yes": 5,
           "no": -1
        }
    },
    {
        "id": 5,
        "content": "What is your favorite movie?",
        "type": "free",
        "answerSet":"",
        "nextQuestion": -1
    }
]