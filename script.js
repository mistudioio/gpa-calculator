
$(document).ready(function() {

        var HCurrent = $('#HCurrent').val();
        var GPACurrent = $('#GPACurrent').val();

        $('#currentTotal').val(HCurrent * GPACurrent);

        $("input[name='hours']").on('input', function () {
            $(this).val($(this).val().replace(/[^0-9]/g, ''));
        });

        $("input[name='gpa']").on('input', function () {    
    		var value = $(this).val();

    		if ((value !== '') && (value.indexOf('.') === -1)) {        
        	   $(this).val(Math.max(Math.min(value, 4), 0));
            }

            if (isNaN(value)) {
                alert("Please, add a numeric value");
                var value = $(this).val(0);
            }
        });

});

        function calculate(element) {
            var mainRow = document.getElementById(element);
            var pHours = mainRow.querySelectorAll("[name=hours]")[0].value;            
            var pGPA = mainRow.querySelectorAll("[name=gpa]")[0].value;
            var totalQP = mainRow.querySelectorAll("[name=total]")[0];
           
            if (!(pGPA > 4)) {
                var pQualityPoints = pHours * pGPA;
                totalQP.value = pQualityPoints;
            }	
	
            //calculate All Projected Life Hours
            var resultLH = document.getElementById("resultLH");        
            var hoursAll = document.querySelectorAll("[name=hours]");
	        var sumLH = 0;

            for (i = 0; i < hoursAll.length; ++i) {
            	var testProjectedHours = parseInt(hoursAll[i].value);
              	
                if(isNaN(testProjectedHours)) {
              		testProjectedHours = 0;                              
                }
				sumLH += testProjectedHours;
            }
 		    resultLH.textContent = sumLH;

            //calculate All Projected Quality Points
            var resultQP = document.getElementById("resultQP");
            var qpAll = document.querySelectorAll("[name=total]");
            var sumQP = 0;
            for (i = 0; i < qpAll.length; ++i) {
              sumQP += parseInt(qpAll[i].value);
            }           
            resultQP.textContent = sumQP;

            //calculate Projected Life GPA
            var resultLG = document.getElementById("resultLG");
            var projectedGPA = sumQP / sumLH;
            
            if (!isNaN(projectedGPA)) {
                resultLG.textContent = projectedGPA.toFixed(2);
            }
            if (sumLH == HCurrent.value) {
                resultLG.textContent = $('#GPACurrent').val();
            }
                                   
        };

