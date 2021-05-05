let title = 'Sample Quiz'
let description = 'Sample quiz description';

function createQuiz(questions, answers, correctIndex) {
  const quiz_template = DriveApp.getFileById('1yDuqYc-h6Rf2pscTaFHtEQ5iixDwK7qhM8jFe9vIqSw');
  const quiz = quiz_template.makeCopy(title);
  const id = quiz.getId();

  let form = FormApp.openById(id);

  form.setTitle(title)
    .setConfirmationMessage('Thanks for responding!');

  if (description) form.setDescription(description);

  let i = 0;
  questions.forEach(q => {
    addQuestion(form, 'mc', q, answers[i], correctIndex[i])
    i++;
  })

  Logger.log('Published URL: ' + form.getPublishedUrl());
  Logger.log('Editor URL: ' + form.getEditUrl());

  return (JSON.stringify({ published: form.getPublishedUrl(), edit: form.getEditUrl() }));
}

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {

}

function addQuestion(form, questionType, question, answers, correctAnswers) {
  let correctAnswer = [].concat(correctAnswers);
  // Logger.log(correctAnswer);
  let item = questionType === 'mc' ? form.addMultipleChoiceItem() : form.addCheckboxItem();
  item.setTitle(question);
  let i = 0;
  let choices = [];
  answers.forEach(ans => {
    correctAnswer.includes(i) ? choices.push(item.createChoice(ans, true)) : choices.push(item.createChoice(ans));
    i++;
  })
  Logger.log(choices);
  item.setChoices(choices);
  item.setPoints(1);
}
