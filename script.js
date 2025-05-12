$(document).ready(function () {
    const $HCurrent = $('#HCurrent');
    const $GPACurrent = $('#GPACurrent');
    const $currentTotal = $('#currentTotal');

    const updateCurrentTotal = () => {
        const hours = parseFloat($HCurrent.val()) || 0;
        const gpa = parseFloat($GPACurrent.val()) || 0;
        $currentTotal.val((hours * gpa).toFixed(2));
    };

    updateCurrentTotal();

    // Only allow digits for hours
    $("input[name='hours']").on('input', function () {
        this.value = this.value.replace(/\D/g, '');
    });

    // Allow GPA between 0 and 4, with decimals
    $("input[name='gpa']").on('input', function () {
        let value = this.value;

        // Disallow non-numeric input
        if (isNaN(value)) {
            alert("Please enter a valid number.");
            this.value = '';
            return;
        }

        let gpa = parseFloat(value);
        if (!isNaN(gpa)) {
            gpa = Math.min(Math.max(gpa, 0), 4);
            this.value = gpa;
        }
    });
});

function calculate(elementId) {
    const mainRow = document.getElementById(elementId);

    const hoursInput = mainRow.querySelector("[name='hours']");
    const gpaInput = mainRow.querySelector("[name='gpa']");
    const totalInput = mainRow.querySelector("[name='total']");

    const hours = parseFloat(hoursInput.value) || 0;
    const gpa = parseFloat(gpaInput.value) || 0;

    // Prevent GPA over 4
    if (gpa <= 4) {
        const qualityPoints = hours * gpa;
        totalInput.value = qualityPoints.toFixed(2);
    }

    // Calculate projected total hours
    const hoursAll = document.querySelectorAll("[name='hours']");
    let sumLH = 0;
    hoursAll.forEach(h => {
        const val = parseFloat(h.value);
        sumLH += isNaN(val) ? 0 : val;
    });
    document.getElementById("resultLH").textContent = sumLH;

    // Calculate total quality points
    const qpAll = document.querySelectorAll("[name='total']");
    let sumQP = 0;
    qpAll.forEach(qp => {
        const val = parseFloat(qp.value);
        sumQP += isNaN(val) ? 0 : val;
    });
    document.getElementById("resultQP").textContent = sumQP.toFixed(2);

    // Calculate projected GPA
    const resultLG = document.getElementById("resultLG");
    const projectedGPA = sumQP / sumLH;

    const currentHours = parseFloat(document.getElementById('HCurrent').value) || 0;
    const currentGPA = parseFloat(document.getElementById('GPACurrent').value) || 0;

    if (!isNaN(projectedGPA) && sumLH !== currentHours) {
        resultLG.textContent = projectedGPA.toFixed(2);
    } else {
        resultLG.textContent = currentGPA.toFixed(2);
    }
}
