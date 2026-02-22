document.addEventListener('DOMContentLoaded', function () {
  var STORAGE_KEY = 'jg-daily-consumed';
  var rows = document.querySelectorAll('.daily-meals-table tbody tr');
  var totalProteinEl = document.getElementById('total-protein');
  var totalCalEl = document.getElementById('total-cal');
  var TOTAL_PROTEIN_TARGET = 185;
  var TOTAL_CAL_TARGET = 1601;

  function saveState() {
    var consumed = {};
    rows.forEach(function (row, i) {
      var val = row.querySelector('.consumed-input').value;
      if (val !== '') consumed[i] = parseFloat(val);
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consumed));
  }

  function updateRemaining(row) {
    var target = parseFloat(row.getAttribute('data-target'));
    var unit = row.getAttribute('data-unit');
    var input = row.querySelector('.consumed-input');
    var remainingCell = row.querySelector('.remaining-cell');
    var consumed = parseFloat(input.value) || 0;
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
  }

  function updateTotals() {
    var totalProtein = 0;
    var totalCal = 0;

    rows.forEach(function (row) {
      var target = parseFloat(row.getAttribute('data-target'));
      var protein = parseFloat(row.getAttribute('data-protein'));
      var cal = parseFloat(row.getAttribute('data-cal'));
      var consumed = parseFloat(row.querySelector('.consumed-input').value) || 0;

      if (consumed > 0 && target > 0) {
        var ratio = consumed / target;
        totalProtein += ratio * protein;
        totalCal += ratio * cal;
      }
    });

    totalProtein = Math.round(totalProtein);
    totalCal = Math.round(totalCal);

    totalProteinEl.innerHTML = '<strong>' + totalProtein + ' / ' + TOTAL_PROTEIN_TARGET + ' g</strong>';
    totalCalEl.innerHTML = '<strong>' + totalCal + ' / ' + TOTAL_CAL_TARGET + ' kcal</strong>';
  }

  function loadState() {
    var data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;
    try {
      var consumed = JSON.parse(data);
      Object.keys(consumed).forEach(function (i) {
        var row = rows[parseInt(i)];
        if (row) {
          row.querySelector('.consumed-input').value = consumed[i];
          updateRemaining(row);
        }
      });
    } catch (e) {}
  }

  rows.forEach(function (row) {
    var input = row.querySelector('.consumed-input');
    input.addEventListener('input', function () {
      updateRemaining(row);
      updateTotals();
      saveState();
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
      localStorage.removeItem(STORAGE_KEY);
      updateTotals();
    });
  }

  loadState();
  updateTotals();
});
