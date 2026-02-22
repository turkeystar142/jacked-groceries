document.addEventListener('DOMContentLoaded', function () {
  var STORAGE_KEY = 'jg-shopping-checked';
  var checkboxes = document.querySelectorAll('.shopping-checkbox');

  function saveState() {
    var checked = [];
    checkboxes.forEach(function (cb, i) {
      if (cb.checked) checked.push(i);
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }

  function loadState() {
    var data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;
    try {
      var checked = JSON.parse(data);
      checked.forEach(function (i) {
        if (checkboxes[i]) {
          checkboxes[i].checked = true;
          checkboxes[i].closest('tr').classList.add('checked');
        }
      });
    } catch (e) {}
  }

  checkboxes.forEach(function (cb) {
    cb.addEventListener('change', function () {
      var row = this.closest('tr');
      if (this.checked) {
        row.classList.add('checked');
      } else {
        row.classList.remove('checked');
      }
      saveState();
    });
  });

  var resetBtn = document.getElementById('reset-checkboxes');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      checkboxes.forEach(function (cb) {
        cb.checked = false;
        cb.closest('tr').classList.remove('checked');
      });
      localStorage.removeItem(STORAGE_KEY);
    });
  }

  loadState();
});
