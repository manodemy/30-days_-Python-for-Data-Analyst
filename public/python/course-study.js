/* Study interactions shared by lessons adopting course design v1. */
'use strict';
document.addEventListener('submit', event => {
  const form = event.target.closest('.course-check');
  if (!form) return;
  event.preventDefault();
  const day = window.COURSE_CONTENT && window.COURSE_CONTENT['pyDay' + String(window.COURSE_DAY).padStart(2, '0')];
  const check = day && day.conceptChecks.find(q => String(q.id) === form.dataset.checkId);
  const answer = form.querySelector('input:checked');
  const feedback = form.querySelector('.course-feedback');
  if (!check || !feedback) return;
  if (!answer) {
    feedback.textContent = 'Select an answer.';
    return;
  }
  const correct = Number(answer.value) === check.answer;
  feedback.dataset.result = correct ? 'correct' : 'incorrect';
  feedback.replaceChildren();
  const verdict = document.createElement('strong');
  verdict.textContent = correct ? 'Correct. ' : 'Not quite. ';
  feedback.append(verdict);
  // Explanations are trusted course-author HTML, never learner input.
  const explanation = document.createElement('span');
  explanation.innerHTML = check.explanation;
  feedback.append(explanation);
});
document.addEventListener('change', event => {
  const form = event.target.closest('.course-check');
  if (!form) return;
  const feedback = form.querySelector('.course-feedback');
  feedback.textContent = '';
  delete feedback.dataset.result;
});
