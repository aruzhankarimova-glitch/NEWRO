/* Two short, transparent previews of the actual NEWRO career exercises. */
(function (global) {
  'use strict';
  var previews = {
    marketing: {
      question: 'Who would you target?',
      brief: 'Harbor tracks subscription renewals. Which audience fits?',
      choices: [
        { label: 'People managing free trials', fit: true, feedback: 'That fits: Harbor helps people keep track of upcoming renewals.' },
        { label: 'People analyzing stocks', fit: false, feedback: 'Harbor tracks subscriptions, not stocks. Try the other audience.' }
      ],
      action: 'Try the marketing assignment →'
    },
    pm: {
      question: 'What would you ship first?',
      brief: 'An iOS login crash blocks customers. Your team has limited time.',
      choices: [
        { label: 'Fix the login crash', fit: true, feedback: 'A strong first call: people need access before they can use other features.' },
        { label: 'Add a dark theme', fit: false, feedback: 'A theme can wait while customers cannot log in. Try the other option.' }
      ],
      action: 'Try the product assignment →'
    }
  };
  function shareUrl(value) {
    var url = new URL(value);
    url.search = '';
    url.hash = 'careers';
    return url.toString();
  }
  function mount(shell) {
    var quiz = shell.querySelector('.nm-quick-choices');
    var feedback = shell.querySelector('.nm-quick-feedback');
    var question = shell.querySelector('.cs-phone-title');
    var brief = shell.querySelector('.cs-phone-task');
    var next = shell.querySelector('.cs-phone-cta');
    var switches = shell.querySelectorAll('[data-preview-role]');
    if (!quiz || !feedback || !question || !brief || !next) return;
    var role = 'marketing';
    function chooseRole(value) {
      if (!previews[value]) return;
      role = value;
      var item = previews[role];
      question.textContent = item.question;
      brief.textContent = item.brief;
      switches.forEach(function (button) { button.setAttribute('aria-pressed', String(button.dataset.previewRole === role)); });
      quiz.querySelectorAll('[data-quick-choice]').forEach(function (button, index) {
        button.textContent = item.choices[index].label;
        button.dataset.quickChoice = String(index);
        button.setAttribute('aria-pressed', 'false');
        button.classList.remove('nm-selected');
      });
      feedback.hidden = true;
      feedback.textContent = '';
      next.textContent = item.action;
      next.setAttribute('aria-label', item.action.replace(' →', ''));
    }
    switches.forEach(function (button) { button.addEventListener('click', function () { chooseRole(button.dataset.previewRole); }); });
    quiz.addEventListener('click', function (event) {
      var button = event.target.closest('[data-quick-choice]');
      if (!button || !quiz.contains(button)) return;
      var choice = previews[role].choices[Number(button.dataset.quickChoice)];
      if (!choice) return;
      quiz.querySelectorAll('[data-quick-choice]').forEach(function (item) {
        item.setAttribute('aria-pressed', String(item === button));
        item.classList.toggle('nm-selected', item === button);
      });
      feedback.textContent = choice.feedback;
      feedback.dataset.result = choice.fit ? 'right' : 'try-again';
      feedback.hidden = false;
      if (global.NEWROMobile) global.NEWROMobile.pulse(choice.fit ? 'success' : 'choice');
    });
    next.onclick = function () { if (global.NEWRO) global.NEWRO.start(role); };
    chooseRole(role);
    var share = shell.querySelector('[data-share-challenge]');
    var status = shell.querySelector('[data-share-status]');
    var fallback = shell.querySelector('[data-share-fallback]');
    var input = shell.querySelector('[data-share-link]');
    if (!share || !status || !fallback || !input) return;
    share.addEventListener('click', async function () {
      var url = shareUrl(global.location.href);
      if (global.navigator.share) {
        try { await global.navigator.share({ title: 'Try a career with NEWRO', text: 'Would you rather try marketing or product? Pick a task on NEWRO.', url: url }); return; }
        catch (error) { if (error && error.name === 'AbortError') return; }
      }
      if (global.navigator.clipboard && global.navigator.clipboard.writeText) {
        try { await global.navigator.clipboard.writeText(url); status.textContent = 'Link copied. Send it to a friend.'; return; } catch (_) {}
      }
      input.value = url;
      fallback.hidden = false;
      input.focus();
      input.select();
      status.textContent = 'Copy the selected link and send it to a friend.';
    });
  }
  var api = { previews: previews, shareUrl: shareUrl, mount: mount };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (global) global.NEWROChallenge = api;
})(typeof window === 'undefined' ? globalThis : window);
