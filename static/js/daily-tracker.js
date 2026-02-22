document.addEventListener('DOMContentLoaded', function () {
  var rows = document.querySelectorAll('.daily-meals-table tbody tr');

  rows.forEach(function (row) {
    var target = parseFloat(row.getAttribute('data-target'));
    var unit = row.getAttribute('data-unit');
    var input = row.querySelector('.consumed-input');
    var remainingCell = row.querySelector('.remaining-cell');

    input.addEventListener('input', function () {
      var consumed = parseFloat(this.value) || 0;
      var remaining = target - consumed;

      remainingCell.textContent = remaining + ' ' + unit;

      remainingCell.classList.remove('remaining-positive', 'remaining-zero', 'remaining-negative');
      if (remaining > 0) {
        remainingCell.classList.add('remaining-positive');
      } else if (remaining === 0) {
        remainingCell.classList.add('remaining-zero');
      } else {
        remainingCell.classList.add('remaining-negative');
      }
    });
  });

  var resetBtn = document.getElementById('reset-day');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      rows.forEach(function (row) {
        var target = parseFloat(row.getAttribute('data-target'));
        var unit = row.getAttribute('data-unit');
        var input = row.querySelector('.consumed-input');
        var remainingCell = row.querySelector('.remaining-cell');

        input.value = '';
        remainingCell.textContent = target + ' ' + unit;
        remainingCell.classList.remove('remaining-zero', 'remaining-negative');
        remainingCell.classList.add('remaining-positive');
      });
    });
  }
});
