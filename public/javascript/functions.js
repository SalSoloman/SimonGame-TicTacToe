svar SimonSteps = [];
var UserSteps = [];
var CurrentStep = 0;
var CurrentUserStep = 0;

$(document).ready(function() {
  $("#SegDisplay").sevenSeg({ value: CurrentStep,
                           colorBackground: "White",
                          digits: 2,
                          decimalPoint: false,
                          colorOff: "WhiteSmoke",
                          colorOn: "Black"});
  StartReset();
});

$("#butnReset").click(function() {
  clearAllTimeOut();
  //make sure all ligths are off
  for (btnIndx = 1; btnIndx < 5; btnIndx++)
  {
    btnOff(btnIndx);
  }
  StartReset();
});

function StartReset(){
  SimonSteps.length = 0;
  UserSteps.length = 0;
  CurrentStep = 0;
  CurrentUserStep = 0;
  for (StepIndx = 0; StepIndx < 20; StepIndx++)
    {
      var NumToPush = Math.floor((Math.random() * 4) + 1);
      SimonSteps.push(NumToPush);
    }
  console.log(SimonSteps);
  OneMoreStep();
}

function btnOn(BtnIndx){
  $("#btn" + BtnIndx).addClass("quarter-light");
  var audio = $("#audio"+BtnIndx)[0];
  audio.play();
}
function btnOff (BtnIndx){
  $("#btn" + BtnIndx).removeClass("quarter-light");
}

function startSimon(){
  $("[id^=btn]").off('click', btnClick);
  $("[id^=btn]").removeClass("quarter-hover");
}
function endSimon(){
  $("[id^=btn]").on('click', btnClick);
  $("[id^=btn]").addClass("quarter-hover");
}
function ShowSimonSay(){
  startSimon();
  setTimeout(endSimon, ((1000 * (CurrentStep - 1)) + 1500))
  for (StepIndx = 0; StepIndx < CurrentStep; StepIndx++)
    {
      var TimeIn = ((1000 * (StepIndx)) + 700);
      var TimeOut = ((1000 * (StepIndx)) + 1500);
      var btnLight = "#btn" + SimonSteps[StepIndx];
      setTimeout (btnOn.bind(null, SimonSteps[StepIndx]),TimeIn);
      setTimeout (btnOff.bind(null, SimonSteps[StepIndx]),TimeOut);
    }
}
function OneMoreStep(){
  startSimon();
  setTimeout(endSimon, ((1000 * (CurrentStep)) + 1200))
  $("#SegDisplay").sevenSeg({ value: CurrentStep + 1});
  for (StepIndx = 0; StepIndx < CurrentStep + 1; StepIndx++)
    {
      var TimeIn = ((1000 * (StepIndx)) + 400);
      var TimeOut = ((1000 * (StepIndx)) + 1200);
      var btnLight = "#btn" + SimonSteps[StepIndx];
      setTimeout (btnOn.bind(null, SimonSteps[StepIndx]),TimeIn);
      setTimeout (btnOff.bind(null, SimonSteps[StepIndx]),TimeOut);
    }
  CurrentStep++;
}

function UserFailed(){
  var checkedValue = $('#chkGameMode').prop("checked");
  //false is normal, true is strict
  if (checkedValue == false){
    CurrentUserStep = 0;
    ShowSimonSay();
    UserMsg("Let's try this one more time");
  }else{
    UserMsg("Failed! strict mode, we will start over");
    StartReset();
  }
}

function UserWon(){
  UserMsg("you have proven to have a datacenter memeory, how about one more time!");
  StartReset();
}

function btnClick() {
  var btnClickedID = this.id;
  UserSteps[CurrentUserStep]= parseInt(btnClickedID.substring(btnClickedID.length - 1, btnClickedID.length));

  //visual indicator user clicked
  setTimeout (btnOn.bind(null, UserSteps[CurrentUserStep]),100);
  setTimeout (btnOff.bind(null, UserSteps[CurrentUserStep]),600);
  //

  var CurrentSemonStep = CurrentStep - 1;

  if(UserSteps[CurrentUserStep] != SimonSteps[CurrentUserStep]){
    console.log("User Failed!");
    UserFailed();
    return;
  }
  //Check
  if((CurrentUserStep == CurrentSemonStep) && CurrentStep == 20){
    console.log("Won!");
    UserWon();
    return;
  }else if ((CurrentUserStep == CurrentSemonStep) && CurrentSemonStep < 20){
    console.log("Next!");
    CurrentUserStep = 0;
    setTimeout(OneMoreStep, 1000);
    return;
  }
  CurrentUserStep++;
}

function clearAllTimeOut(){
  var id = window.setTimeout(function() {}, 0);
  while (id--) {
    window.clearTimeout(id); // will do nothing if no timeout with id is present
  }
}

function UserMsg(msgContent){
  $("#divUserMsg").text(msgContent);
  $("#divUserMsg").removeClass("fade out");
  $("#divUserMsg").addClass("fade in");
  $("#divUserMsg").show();
  setTimeout(function() {
    $("#divUserMsg").removeClass("fade in");
    $("#divUserMsg").addClass("fade out");
  }, 1500);
}
