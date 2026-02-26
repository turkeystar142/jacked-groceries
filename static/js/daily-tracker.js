document.addEventListener('DOMContentLoaded', function () {
  var STORAGE_KEY = 'jg-daily-consumed';
  var CUSTOM_STORAGE_KEY = 'jg-daily-custom-rows';
  var rows = document.querySelectorAll('.daily-meals-table tbody tr:not(.custom-row)');
  var customRows = document.querySelectorAll('.daily-meals-table tbody tr.custom-row');
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

  function saveCustomState() {
    var data = [];
    customRows.forEach(function (row) {
      data.push({
        food: row.querySelector('.custom-food').value,
        prep: row.querySelector('.custom-prep').value,
        target: parseFloat(row.querySelector('.custom-target').value) || 0,
        unit: row.querySelector('.custom-unit').value || 'g',
        protein: parseFloat(row.querySelector('.custom-protein').value) || 0,
        cal: parseFloat(row.querySelector('.custom-cal').value) || 0,
        consumed: parseFloat(row.querySelector('.consumed-input').value) || 0
      });
    });
    localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(data));
  }

  function syncCustomRowAttributes(row) {
    var target = parseFloat(row.querySelector('.custom-target').value) || 0;
    var unit = row.querySelector('.custom-unit').value || 'g';
    var protein = parseFloat(row.querySelector('.custom-protein').value) || 0;
    var cal = parseFloat(row.querySelector('.custom-cal').value) || 0;

    row.setAttribute('data-target', target);
    row.setAttribute('data-unit', unit);
    row.setAttribute('data-protein', protein);
    row.setAttribute('data-cal', cal);

    row.querySelector('.unit-label').textContent = unit;
  }

  function updateRemaining(row) {
    var target = parseFloat(row.getAttribute('data-target'));
    var unit = row.getAttribute('data-unit');
    var input = row.querySelector('.consumed-input');
    var remainingCell = row.querySelector('.remaining-cell');
    var consumed = parseFloat(input.value) || 0;

    if (target > 0) {
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
    } else {
      remainingCell.textContent = '\u2014';
      remainingCell.classList.remove('remaining-positive', 'remaining-negative');
      remainingCell.classList.add('remaining-zero');
    }
  }

  function updateTotals() {
    var totalProtein = 0;
    var totalCal = 0;

    var allRows = document.querySelectorAll('.daily-meals-table tbody tr');
    allRows.forEach(function (row) {
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

  function loadCustomState() {
    var data = localStorage.getItem(CUSTOM_STORAGE_KEY);
    if (!data) return;
    try {
      var items = JSON.parse(data);
      items.forEach(function (item, i) {
        var row = customRows[i];
        if (!row) return;
        row.querySelector('.custom-food').value = item.food || '';
        row.querySelector('.custom-prep').value = item.prep || '';
        row.querySelector('.custom-target').value = item.target || '';
        row.querySelector('.custom-unit').value = item.unit || 'g';
        row.querySelector('.custom-protein').value = item.protein || '';
        row.querySelector('.custom-cal').value = item.cal || '';
        row.querySelector('.consumed-input').value = item.consumed || '';
        syncCustomRowAttributes(row);
        updateRemaining(row);
      });
    } catch (e) {}
  }

  // Standard row event listeners
  rows.forEach(function (row) {
    var input = row.querySelector('.consumed-input');
    input.addEventListener('input', function () {
      updateRemaining(row);
      updateTotals();
      saveState();
    });
  });

  // Custom row event listeners
  customRows.forEach(function (row) {
    var inputs = row.querySelectorAll('.custom-input');
    inputs.forEach(function (input) {
      input.addEventListener('input', function () {
        syncCustomRowAttributes(row);
        updateRemaining(row);
        updateTotals();
        saveCustomState();
      });
    });

    var consumedInput = row.querySelector('.consumed-input');
    consumedInput.addEventListener('input', function () {
      updateRemaining(row);
      updateTotals();
      saveCustomState();
    });
  });

  // Reset button
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

      // Reset only consumed on custom rows, preserve item definitions
      customRows.forEach(function (row) {
        row.querySelector('.consumed-input').value = '';
        updateRemaining(row);
      });
      saveCustomState();

      updateTotals();
    });
  }

  loadState();
  loadCustomState();
  updateTotals();
});
