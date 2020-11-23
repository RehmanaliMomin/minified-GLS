var url = 'https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=__5szm2kaj&refresh=true&env=dev&type=startPanel&vars%5Btype%5D=startPanel&sid=none&_=1582203987867';

var responseObject;
var __5szm2kaj;
var steps;
var element;
var content;
var placement;
var pos;
var currentStep;
var stepIndex = 0;
var tooltipWidth = 286;
var tooltipHeight = 57;

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

function checkVariable() {
    if (window.jQuery) {
        var sc = document.createElement("script");
        sc.src = url;
        document.body.appendChild(sc);
    }
    else {
        window.setTimeout("checkVariable();", 100);
    }
}
checkVariable();


var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://guidedlearning.oracle.com/player/latest/static/css/stTip.css';
document.head.appendChild(link);


function makeElement(content, l, t) {
    var top = document.createElement('div');
    top.id = 'tooltip' + currentStep.id;
    top.classList.add("sttip");
    top.style.position = "fixed";
    top.style.top = t;
    top.style.left = l;
    var htmlString = '<div class="tooltip in">';
    htmlString += '<div class="tooltip-arrow"></div>';
    htmlString += '<div class="tooltip-arrow second-arrow"></div>';
    htmlString += '<div  style="color:white; padding: 12px;" class="popover-inner">';
    htmlString += content;
    htmlString += '<br>';
    htmlString += '<button  onClick="goNext()" id="btnNext" style="color: black; cursor: pointer; width: 80px;   height: 30px;   float: right;text-align: center;    background-color: white;border-radius: 4px;">Next</button>';
    htmlString += '</div>';
    htmlString += '</div>';
    top.innerHTML = htmlString;
    return top;
}



function goNext() {
    let height = 0;
    let width = 0;
    element.parentNode.removeChild(document.getElementById('tooltip' + currentStep.id));
    $(element).css('border','');
    //stepIndex++;
    // if (stepIndex >= steps.length - 1) return;
    if (parseInt(stepIndex) < 0) return;
    currentStep = steps.find(e => e.id == stepIndex);
    // element = document.getElementById(currentId);
    element = jQuery(currentStep.action.selector)[jQuery(currentStep.action.selector).length - 1];

    $(element).css('border','1px black solid');

    content = currentStep.action.contents['#content'];
    placement = currentStep.action.placement;

    if (stepIndex == 3) {
        placement = 'bottom';
    }

    pos = jQuery(element).offset();
    height = jQuery(element).height();
    width = jQuery(element).width();
    console.log(pos);
    console.log(currentStep.id + ' test ' + width);

    let pt = parseInt(jQuery(element).css('padding-top'));
    let pb = parseInt(jQuery(element).css('padding-bottom'));
    let pl = parseInt(jQuery(element).css('padding-left'));
    let pr = parseInt(jQuery(element).css('padding-right'));
    console.log(pt, pb, pl, pr);
    t = pos.top + pt - pb;
    l = pos.left + pl + pr;

    if (placement === 'top') t = t - tooltipHeight;
    if (placement === 'right') l = l + width;
    if (placement === 'bottom') t = t + height;
    if (placement === 'left') l = l - tooltipWidth;

   
    //t = pos.top;
    //l = pos.left;

    console.log(t, l);

    element.parentNode.appendChild(makeElement(content, l + 'px', t + 'px'));

    if (currentStep.followers.length > 0) stepIndex = currentStep.followers[0].next;
    else stepIndex = -1;

}


__5szm2kaj = function (data) {
    let l = 0;
    let t = 0;
    responseObject = data;
    steps = responseObject.data.structure.steps;
    currentStep = steps[stepIndex];
    element = jQuery(currentStep.action.selector)[0];
    content = currentStep.action.contents['#content'];
    placement = currentStep.action.placement;
    $(element).css('border','1px black solid');

    pos = jQuery(element).offset();
    height = jQuery(element).height();
    width = jQuery(element).width();

    let pt = parseInt(jQuery(element).css('padding-top'));
    let pb = parseInt(jQuery(element).css('padding-bottom'));
    let pl = parseInt(jQuery(element).css('padding-left'));
    let pr = parseInt(jQuery(element).css('padding-right'));

    console.log(pos);
    console.log(pt, pb, pl, pr);

    t = pos.top + pt - pb;
    l = pos.left + pl + pr;

    if (placement === 'top') t = t - tooltipHeight;
    if (placement === 'right') l = l + width;
    if (placement === 'bottom') t = t + height;
    if (placement === 'left') l = l - tooltipWidth;
}