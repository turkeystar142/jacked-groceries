document.addEventListener('DOMContentLoaded', function () {
  var checkboxes = document.querySelectorAll('.shopping-checkbox');

  checkboxes.forEach(function (cb) {
    cb.addEventListener('change', function () {
      var row = this.closest('tr');
      if (this.checked) {
        row.classList.add('checked');
      } else {
        row.classList.remove('checked');
      }
    });
  });

  var resetBtn = document.getElementById('reset-checkboxes');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      checkboxes.forEach(function (cb) {
        cb.checked = false;
        cb.closest('tr').classList.remove('checked');
      });
    });
  }
});
