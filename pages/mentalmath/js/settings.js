const SETTINGSFORM = $("#settings-form");
const MATHGAME = $("#math-window");

function validateSettingsForm(event)
{
    event.preventDefault();

    let addition = $("#checkbox-add").prop("checked");
    let subtraction = $("#checkbox-sub").prop("checked");
    let multiplication = $("#checkbox-mul").prop("checked");
    let division = $("#checkbox-div").prop("checked");
    let square = $("#checkbox-square").prop("checked");
    let sqroot = $("#checkbox-sqrt").prop("checked");
    let power = false; //unused for now
    let numRangeLow = parseInt($("#settings-range-low").val());
    let numRangeHigh = parseInt($("#settings-range-high").val());
    let numProblems = parseInt($("#num-problems").val());

    if (!addition && !subtraction && !multiplication && !division && !square && !sqroot)
    {
        $("#checkboxes").addClass("form-div-invalid");
        let formErrorMessage = $("#checkboxes > .form-error");
        formErrorMessage.show();
        return;
    }else
    {
        $("#checkboxes").removeClass("form-div-invalid");
        $("#checkboxes > .form-error").hide();
    }
    
    //Set low range as high range if mismatched
    if (numRangeLow > numRangeHigh)
    {
        const temp = numRangeHigh;
        numRangeHigh = numRangeLow;
        numRangeLow = temp;
    }


    settingsObject = {
        "addition": addition,
        "subtraction": subtraction,
        "multiplication": multiplication,
        "division": division,
        "square": square,
        "power": power,
        "square-root": sqroot,
        "num-range-low": numRangeLow,
        "num-range-high": numRangeHigh,
        "num-problems": numProblems
    }

    $("#settings").hide();
    $("#game").show();
    initialize();

}

SETTINGSFORM.submit(function(event){validateSettingsForm(event)});