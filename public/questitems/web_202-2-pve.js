//




















////////////////////////////////////////////////////////////////////
//                            _ooOoo_                             //
//                           o8888888o                            //
//                           88" . "88                            //
//                           (| ^_^ |)                            //
//                           O\  =  /O                            //
//                        ____/`---'\____                         //
//                      .'  \\|     |//  `.                       //
//                     /  \\|||  :  |||//  \                      //
//                    /  _||||| -:- |||||-  \                     //
//                    |   | \\\  -  /// |   |                     //
//                    | \_|  ''\---/''  |   |                     //
//                    \  .-\__  `-`  ___/-. /                     //
//                  ___`. .'  /--.--\  `. . ___                   //
//                ."" '<  `.___\_<|>_/___.'  >'"".                //
//              | | :  `- \`.;`\ _ /`;.`/ - ` : | |               //
//              \  \ `-.   \_ __\ /__ _/   .-` /  /               //
//        ========`-.____`-.___\_____/___.-`____.-'========       //
//                             `=---='                            //
//        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^      //
//        佛祖保佑             永无BUG              永不修改      //
////////////////////////////////////////////////////////////////////




















//
function updateButtonStatus() {
    let buttonStatus = localStorage.getItem('buttonStatus');

    if (!buttonStatus) {
        buttonStatus = {};
    } else {
        try {
            buttonStatus = JSON.parse(buttonStatus);
        } catch (error) {
            console.error('解析 buttonStatus 失败:', error);
            buttonStatus = {};
        }
    }
	
    // 检查 117 是否为 true
    if (buttonStatus['117'] === true) {
        buttonStatus['101'] = true;
        buttonStatus['47'] = true;
        buttonStatus['164'] = true;
        buttonStatus['306'] = true;
        buttonStatus['1'] = true;
        buttonStatus['66'] = true;
        buttonStatus['250'] = true;
        buttonStatus['278'] = true;
        buttonStatus['48'] = true;
        buttonStatus['3'] = true;
        buttonStatus['2'] = true;
        buttonStatus['381'] = true;
        buttonStatus['436'] = true;
        buttonStatus['437'] = true;
        buttonStatus['132'] = true;
        buttonStatus['134'] = true;
        buttonStatus['69'] = true;
        buttonStatus['70'] = true;
        buttonStatus['4'] = true;
        buttonStatus['5'] = true;
        buttonStatus['259'] = true;
        buttonStatus['260'] = true;
        buttonStatus['262'] = true;
        buttonStatus['263'] = true;
        buttonStatus['133'] = true;
        buttonStatus['145'] = true;
        buttonStatus['146'] = true;
        buttonStatus['195'] = true;
        buttonStatus['196'] = true;
        buttonStatus['198'] = true;
        buttonStatus['199'] = true;
        buttonStatus['71'] = true;
        buttonStatus['72'] = true;
        buttonStatus['135'] = true;
        buttonStatus['6'] = true;
        buttonStatus['9'] = true;
        buttonStatus['10'] = true;
        buttonStatus['17'] = true;
        buttonStatus['382'] = true;
        buttonStatus['383'] = true;
        buttonStatus['384'] = true;
        buttonStatus['402'] = true;
        buttonStatus['88'] = true;
        buttonStatus['73'] = true;
        buttonStatus['136'] = true;
        buttonStatus['137'] = true;
        buttonStatus['138'] = true;
        buttonStatus['139'] = true;
        buttonStatus['140'] = true;
        buttonStatus['35'] = true;
        buttonStatus['93'] = true;
        buttonStatus['159'] = true;
        buttonStatus['391'] = true;
        buttonStatus['392'] = true;
        buttonStatus['399'] = true;
        buttonStatus['397'] = true;
        buttonStatus['252'] = true;
        buttonStatus['253'] = true;
        buttonStatus['257'] = true;
        buttonStatus['258'] = true;
        buttonStatus['77'] = true;
        buttonStatus['157'] = true;
        buttonStatus['7'] = true;
        buttonStatus['8'] = true;
        buttonStatus['96'] = true;
        buttonStatus['74'] = true;
        buttonStatus['272'] = true;
        buttonStatus['261'] = true;
        buttonStatus['254'] = true;
        buttonStatus['316'] = true;
        buttonStatus['314'] = true;
        buttonStatus['174'] = true;
        buttonStatus['175'] = true;
        buttonStatus['315'] = true;
        buttonStatus['108'] = true;
        buttonStatus['256'] = true;
        buttonStatus['255'] = true;
        buttonStatus['393'] = true;
        buttonStatus['394'] = true;
        buttonStatus['395'] = true;
        buttonStatus['406'] = true;
        buttonStatus['398'] = true;
        buttonStatus['420'] = true;
        buttonStatus['327'] = true;
        buttonStatus['329'] = true;
        buttonStatus['328'] = true;
        buttonStatus['341'] = true;
        buttonStatus['342'] = true;
        buttonStatus['343'] = true;
        buttonStatus['156'] = true;
        buttonStatus['225'] = true;
        buttonStatus['226'] = true;
        buttonStatus['11'] = true;
        buttonStatus['12'] = true;
        buttonStatus['13'] = true;
        buttonStatus['92'] = true;
        buttonStatus['56'] = true;
        buttonStatus['432'] = true;
        buttonStatus['400'] = true;
        buttonStatus['33'] = true;
        buttonStatus['34'] = true;
        buttonStatus['141'] = true;
        buttonStatus['142'] = true;
        buttonStatus['161'] = true;
        buttonStatus['162'] = true;
        buttonStatus['265'] = true;
        buttonStatus['271'] = true;
        buttonStatus['417'] = true;
        buttonStatus['424'] = true;
        buttonStatus['425'] = true;
        buttonStatus['426'] = true;
        buttonStatus['427'] = true;
        buttonStatus['428'] = true;
        buttonStatus['429'] = true;
        buttonStatus['430'] = true;
        buttonStatus['739'] = true;
        buttonStatus['401'] = true;
        buttonStatus['403'] = true;
        buttonStatus['434'] = true;
        buttonStatus['79'] = true;
        buttonStatus['80'] = true;
        buttonStatus['81'] = true;
        buttonStatus['82'] = true;
        buttonStatus['83'] = true;
        buttonStatus['106'] = true;
        buttonStatus['97'] = true;
        buttonStatus['98'] = true;
        buttonStatus['18'] = true;
        buttonStatus['19'] = true;
        buttonStatus['20'] = true;
        buttonStatus['21'] = true;
        buttonStatus['22'] = true;
        buttonStatus['23'] = true;
        buttonStatus['40'] = true;
        buttonStatus['41'] = true;
        buttonStatus['43'] = true;
        buttonStatus['27'] = true;
        buttonStatus['32'] = true;
        buttonStatus['251'] = true;
        buttonStatus['202'] = true;
        buttonStatus['203'] = true;
        buttonStatus['204'] = true;
        buttonStatus['205'] = true;
        buttonStatus['206'] = true;
        buttonStatus['207'] = true;
        buttonStatus['208'] = true;
        buttonStatus['235'] = true;
        buttonStatus['238'] = true;
        buttonStatus['107'] = true;
        buttonStatus['435'] = true;
        buttonStatus['200'] = true;
        buttonStatus['201'] = true;
        buttonStatus['228'] = true;
        buttonStatus['227'] = true;
        buttonStatus['229'] = true;
        buttonStatus['86'] = true;
        buttonStatus['85'] = true;
        buttonStatus['158'] = true;
        buttonStatus['89'] = true;
        buttonStatus['90'] = true;
        buttonStatus['91'] = true;
        buttonStatus['415'] = true;
        buttonStatus['268'] = true;
        buttonStatus['147'] = true;
        buttonStatus['148'] = true;
        buttonStatus['154'] = true;
        buttonStatus['155'] = true;
        buttonStatus['215'] = true;
        buttonStatus['216'] = true;
        buttonStatus['217'] = true;
        buttonStatus['218'] = true;
        buttonStatus['219'] = true;
        buttonStatus['220'] = true;
        buttonStatus['210'] = true;
        buttonStatus['211'] = true;
        buttonStatus['212'] = true;
        buttonStatus['213'] = true;
        buttonStatus['333'] = true;
        buttonStatus['345'] = true;
        buttonStatus['346'] = true;
        buttonStatus['336'] = true;
        buttonStatus['337'] = true;
        buttonStatus['340'] = true;
        buttonStatus['352'] = true;
        buttonStatus['334'] = true;
        buttonStatus['335'] = true;
        buttonStatus['344'] = true;
        buttonStatus['348'] = true;
        buttonStatus['353'] = true;
        buttonStatus['355'] = true;
        buttonStatus['349'] = true;
        buttonStatus['354'] = true;
        buttonStatus['347'] = true;
        buttonStatus['338'] = true;
        buttonStatus['339'] = true;
        buttonStatus['356'] = true;
        buttonStatus['350'] = true;
        buttonStatus['404'] = true;
        buttonStatus['407'] = true;
        buttonStatus['408'] = true;
        buttonStatus['405'] = true;
        buttonStatus['421'] = true;
        buttonStatus['412'] = true;
        buttonStatus['410'] = true;
        buttonStatus['413'] = true;
        buttonStatus['414'] = true;
        buttonStatus['409'] = true;
        buttonStatus['422'] = true;
        buttonStatus['411'] = true;
        buttonStatus['223'] = true;
        buttonStatus['224'] = true;
        buttonStatus['237'] = true;
        buttonStatus['29'] = true;
        buttonStatus['279'] = true;
        buttonStatus['280'] = true;
        buttonStatus['281'] = true;
        buttonStatus['282'] = true;
        buttonStatus['283'] = true;
        buttonStatus['284'] = true;
        buttonStatus['285'] = true;
        buttonStatus['286'] = true;
        buttonStatus['287'] = true;
        buttonStatus['288'] = true;
        buttonStatus['289'] = true;
        buttonStatus['290'] = true;
        buttonStatus['291'] = true;
        buttonStatus['292'] = true;
        buttonStatus['293'] = true;
        buttonStatus['294'] = true;
        buttonStatus['295'] = true;
        buttonStatus['296'] = true;
        buttonStatus['297'] = true;
        buttonStatus['298'] = true;
        buttonStatus['299'] = true;
        buttonStatus['273'] = true;
        buttonStatus['87'] = true;
        buttonStatus['264'] = true;
        buttonStatus['222'] = true;
        buttonStatus['38'] = true;
        buttonStatus['267'] = true;
        buttonStatus['266'] = true;
        buttonStatus['95'] = true;
        buttonStatus['117'] = true;
        buttonStatus['30'] = true;
        buttonStatus['31'] = true;
        buttonStatus['50'] = true;
        buttonStatus['57'] = true;
        buttonStatus['197'] = true;
        buttonStatus['59'] = true;
        buttonStatus['439'] = true;
        buttonStatus['373'] = true;
        buttonStatus['178'] = true;
        buttonStatus['110'] = true;
        buttonStatus['318'] = true;
        buttonStatus['111'] = true;
        buttonStatus['440'] = true;
        buttonStatus['112'] = true;
        buttonStatus['60'] = true;
}
    // 检查 472 是否为 true
    if (buttonStatus['472'] === true) {
        buttonStatus['457'] = true;
}
    // 检查 457 是否为 true
    if (buttonStatus['457'] === true) {
        buttonStatus['469'] = true;
        buttonStatus['470'] = true;
        buttonStatus['124'] = true;
}
    // 检查 456 是否为 true
    if (buttonStatus['456'] === true) {
        buttonStatus['321'] = true;
        buttonStatus['322'] = true;
        buttonStatus['323'] = true;
        buttonStatus['378'] = true;
        buttonStatus['485'] = true;
        buttonStatus['379'] = true;
        buttonStatus['324'] = true;
        buttonStatus['113'] = true;
        buttonStatus['325'] = true;
        buttonStatus['326'] = true;
        buttonStatus['241'] = true;
        buttonStatus['114'] = true;
        buttonStatus['186'] = true;
        buttonStatus['380'] = true;
}
    // 检查 380 是否为 true
    if (buttonStatus['380'] === true) {
        buttonStatus['325'] = true;
}
    // 检查 186 是否为 true
    if (buttonStatus['186'] === true) {
        buttonStatus['325'] = true;
}
    // 检查 114 是否为 true
    if (buttonStatus['114'] === true) {
        buttonStatus['325'] = true;
}
    // 检查 241 是否为 true
    if (buttonStatus['241'] === true) {
        buttonStatus['325'] = true;
}
    // 检查 326 是否为 true
    if (buttonStatus['326'] === true) {
        buttonStatus['325'] = true;
}
    // 检查 325 是否为 true
    if (buttonStatus['325'] === true) {
        buttonStatus['324'] = true;
        buttonStatus['113'] = true;
}
    // 检查 113 是否为 true
    if (buttonStatus['113'] === true) {
        buttonStatus['324'] = true;
}
    // 检查 324 是否为 true
    if (buttonStatus['324'] === true) {
        buttonStatus['323'] = true;
}
    // 检查 379 是否为 true
    if (buttonStatus['379'] === true) {
        buttonStatus['378'] = true;
}
    // 检查 485 是否为 true
    if (buttonStatus['485'] === true) {
        buttonStatus['323'] = true;
}
    // 检查 378 是否为 true
    if (buttonStatus['378'] === true) {
        buttonStatus['323'] = true;
}
    // 检查 323 是否为 true
    if (buttonStatus['323'] === true) {
        buttonStatus['322'] = true;
}
    // 检查 322 是否为 true
    if (buttonStatus['322'] === true) {
        buttonStatus['321'] = true;
}
    // 检查 321 是否为 true
    if (buttonStatus['321'] === true) {
        buttonStatus['306'] = true;
}
    // 检查 182 是否为 true
    if (buttonStatus['182'] === true) {
        buttonStatus['483'] = true;
        buttonStatus['484'] = true;
        buttonStatus['185'] = true;
}
    // 检查 484 是否为 true
    if (buttonStatus['484'] === true) {
        buttonStatus['483'] = true;
        buttonStatus['182'] = true;
}
    // 检查 455 是否为 true
    if (buttonStatus['455'] === true) {
        buttonStatus['474'] = true;
}
    // 检查 454 是否为 true
    if (buttonStatus['454'] === true) {
        buttonStatus['475'] = true;
}
    // 检查 185 是否为 true
    if (buttonStatus['185'] === true) {
        buttonStatus['184'] = true;
}
    // 检查 184 是否为 true
    if (buttonStatus['184'] === true) {
        buttonStatus['183'] = true;
}
    // 检查 183 是否为 true
    if (buttonStatus['183'] === true) {
        buttonStatus['181'] = true;
}
    // 检查 483 是否为 true
    if (buttonStatus['483'] === true) {
        buttonStatus['482'] = true;
        buttonStatus['185'] = true;
}
    // 检查 482 是否为 true
    if (buttonStatus['482'] === true) {
        buttonStatus['481'] = true;
}
    // 检查 181 是否为 true
    if (buttonStatus['181'] === true) {
        buttonStatus['180'] = true;
}
    // 检查 64 是否为 true
    if (buttonStatus['64'] === true) {
        buttonStatus['63'] = true;
        buttonStatus['377'] = true;
}
    // 检查 63 是否为 true
    if (buttonStatus['63'] === true) {
        buttonStatus['62'] = true;
        buttonStatus['480'] = true;
}
    // 检查 481 是否为 true
    if (buttonStatus['481'] === true) {
        buttonStatus['377'] = true;
        buttonStatus['64'] = true;
}
    // 检查 377 是否为 true
    if (buttonStatus['377'] === true) {
        buttonStatus['480'] = true;
        buttonStatus['64'] = true;
}
    // 检查 480 是否为 true
    if (buttonStatus['480'] === true) {
        buttonStatus['376'] = true;
        buttonStatus['63'] = true;
}
    // 检查 62 是否为 true
    if (buttonStatus['62'] === true) {
        buttonStatus['479'] = true;
        buttonStatus['376'] = true;
}
    // 检查 376 是否为 true
    if (buttonStatus['376'] === true) {
        buttonStatus['479'] = true;
        buttonStatus['62'] = true;
}
    // 检查 180 是否为 true
    if (buttonStatus['180'] === true) {
        buttonStatus['477'] = true;
}
    // 检查 479 是否为 true
    if (buttonStatus['479'] === true) {
        buttonStatus['477'] = true;
}
    // 检查 478 是否为 true
    if (buttonStatus['478'] === true) {
        buttonStatus['475'] = true;
        buttonStatus['476'] = true;
}
    // 检查 477 是否为 true
    if (buttonStatus['477'] === true) {
        buttonStatus['478'] = true;
        buttonStatus['476'] = true;
}
    // 检查 476 是否为 true
    if (buttonStatus['476'] === true) {
        buttonStatus['474'] = true;
        buttonStatus['478'] = true;
}
    // 检查 475 是否为 true
    if (buttonStatus['475'] === true) {
        buttonStatus['61'] = true;
        buttonStatus['474'] = true;
}
    // 检查 474 是否为 true
    if (buttonStatus['474'] === true) {
        buttonStatus['61'] = true;
        buttonStatus['475'] = true;
}
    // 检查 320 是否为 true
    if (buttonStatus['320'] === true) {
        buttonStatus['306'] = true;
}
    // 检查 61 是否为 true
    if (buttonStatus['61'] === true) {
        buttonStatus['320'] = true;
}
    // 检查 177 是否为 true
    if (buttonStatus['177'] === true) {
        buttonStatus['176'] = true;
}
    // 检查 176 是否为 true
    if (buttonStatus['176'] === true) {
        buttonStatus['155'] = true;
}
    // 检查 240 是否为 true
    if (buttonStatus['240'] === true) {
        buttonStatus['199'] = true;
}
    // 检查 372 是否为 true
    if (buttonStatus['372'] === true) {
        buttonStatus['346'] = true;
}
    // 检查 438 是否为 true
    if (buttonStatus['438'] === true) {
        buttonStatus['395'] = true;
}
    // 检查 58 是否为 true
    if (buttonStatus['58'] === true) {
        buttonStatus['12'] = true;
}
    // 检查 239 是否为 true
    if (buttonStatus['239'] === true) {
        buttonStatus['230'] = true;
}
    // 检查 109 是否为 true
    if (buttonStatus['109'] === true) {
        buttonStatus['102'] = true;
}
    // 检查 317 是否为 true
    if (buttonStatus['317'] === true) {
        buttonStatus['315'] = true;
}
    // 检查 105 是否为 true
    if (buttonStatus['105'] === true) {
        buttonStatus['104'] = true;
}
    // 检查 104 是否为 true
    if (buttonStatus['104'] === true) {
        buttonStatus['173'] = true;
}
    // 检查 173 是否为 true
    if (buttonStatus['173'] === true) {
        buttonStatus['172'] = true;
}
    // 检查 172 是否为 true
    if (buttonStatus['172'] === true) {
        buttonStatus['433'] = true;
}
    // 检查 433 是否为 true
    if (buttonStatus['433'] === true) {
        buttonStatus['384'] = true;
}
    // 检查 130 是否为 true
    if (buttonStatus['130'] === true) {
        buttonStatus['129'] = true;
}
    // 检查 129 是否为 true
    if (buttonStatus['129'] === true) {
        buttonStatus['128'] = true;
}
    // 检查 371 是否为 true
    if (buttonStatus['371'] === true) {
        buttonStatus['370'] = true;
}
    // 检查 370 是否为 true
    if (buttonStatus['370'] === true) {
        buttonStatus['369'] = true;
}
    // 检查 369 是否为 true
    if (buttonStatus['369'] === true) {
        buttonStatus['368'] = true;
}
    // 检查 368 是否为 true
    if (buttonStatus['368'] === true) {
        buttonStatus['367'] = true;
}
    // 检查 367 是否为 true
    if (buttonStatus['367'] === true) {
        buttonStatus['432'] = true;
}
    // 检查 128 是否为 true
    if (buttonStatus['128'] === true) {
        buttonStatus['127'] = true;
}
    // 检查 127 是否为 true
    if (buttonStatus['127'] === true) {
        buttonStatus['125'] = true;
}
    // 检查 126 是否为 true
    if (buttonStatus['126'] === true) {
        buttonStatus['125'] = true;
}
    // 检查 366 是否为 true
    if (buttonStatus['366'] === true) {
        buttonStatus['171'] = true;
}
    // 检查 171 是否为 true
    if (buttonStatus['171'] === true) {
        buttonStatus['313'] = true;
}
    // 检查 313 是否为 true
    if (buttonStatus['313'] === true) {
        buttonStatus['170'] = true;
}
    // 检查 170 是否为 true
    if (buttonStatus['170'] === true) {
        buttonStatus['55'] = true;
}
    // 检查 55 是否为 true
    if (buttonStatus['55'] === true) {
        buttonStatus['169'] = true;
}
    // 检查 169 是否为 true
    if (buttonStatus['169'] === true) {
        buttonStatus['54'] = true;
}
    // 检查 54 是否为 true
    if (buttonStatus['54'] === true) {
        buttonStatus['312'] = true;
}
    // 检查 312 是否为 true
    if (buttonStatus['312'] === true) {
        buttonStatus['103'] = true;
}
    // 检查 103 是否为 true
    if (buttonStatus['103'] === true) {
        buttonStatus['51'] = true;
}
    // 检查 53 是否为 true
    if (buttonStatus['53'] === true) {
        buttonStatus['52'] = true;
}
    // 检查 51 是否为 true
    if (buttonStatus['51'] === true) {
        buttonStatus['47'] = true;
}
    // 检查 470 是否为 true
    if (buttonStatus['470'] === true) {
        buttonStatus['469'] = true;
        buttonStatus['124'] = true;
        buttonStatus['457'] = true;
        buttonStatus['472'] = true;
}
    // 检查 124 是否为 true
    if (buttonStatus['124'] === true) {
        buttonStatus['469'] = true;
        buttonStatus['470'] = true;
        buttonStatus['457'] = true;
        buttonStatus['472'] = true;
}
    // 检查 469 是否为 true
    if (buttonStatus['469'] === true) {
        buttonStatus['468'] = true;
}
    // 检查 468 是否为 true
    if (buttonStatus['468'] === true) {
        buttonStatus['5452'] = true;
        buttonStatus['461'] = true;
}
    // 检查 467 是否为 true
    if (buttonStatus['467'] === true) {
        buttonStatus['466'] = true;
}
    // 检查 466 是否为 true
    if (buttonStatus['466'] === true) {
        buttonStatus['465'] = true;
}
    // 检查 465 是否为 true
    if (buttonStatus['465'] === true) {
        buttonStatus['464'] = true;
}
    // 检查 464 是否为 true
    if (buttonStatus['464'] === true) {
        buttonStatus['463'] = true;
}
    // 检查 463 是否为 true
    if (buttonStatus['463'] === true) {
        buttonStatus['5451'] = true;
}
    // 检查 5451 是否为 true
    if (buttonStatus['5451'] === true) {
        buttonStatus['5450'] = true;
}
    // 检查 5450 是否为 true
    if (buttonStatus['5450'] === true) {
        buttonStatus['459'] = true;
}
    // 检查 5453 是否为 true
    if (buttonStatus['5453'] === true) {
        buttonStatus['5451'] = true;
		buttonStatus['5449'] = true;
		buttonStatus['5452'] = true;
}
    // 检查 5452 是否为 true
    if (buttonStatus['5452'] === true) {
        buttonStatus['5449'] = true;
}
    // 检查 5449 是否为 true
    if (buttonStatus['5449'] === true) {
        buttonStatus['467'] = true;
}
    // 检查 462 是否为 true
    if (buttonStatus['462'] === true) {
        buttonStatus['461'] = true;
}
    // 检查 461 是否为 true
    if (buttonStatus['461'] === true) {
        buttonStatus['460'] = true;
}
    // 检查 460 是否为 true
    if (buttonStatus['460'] === true) {
        buttonStatus['4476'] = true;
}
    // 检查 4476 是否为 true
    if (buttonStatus['4476'] === true) {
        buttonStatus['459'] = true;
}
    // 检查 459 是否为 true
    if (buttonStatus['459'] === true) {
        buttonStatus['458'] = true;
}
    // 检查 458 是否为 true
    if (buttonStatus['458'] === true) {
        buttonStatus['168'] = true;
}
    // 检查 471 是否为 true
    if (buttonStatus['471'] === true) {
        buttonStatus['168'] = true;
}
    // 检查 168 是否为 true
    if (buttonStatus['168'] === true) {
        buttonStatus['164'] = true;
}
    // 检查 365 是否为 true
    if (buttonStatus['365'] === true) {
        buttonStatus['331'] = true;
}
    // 检查 364 是否为 true
    if (buttonStatus['364'] === true) {
        buttonStatus['342'] = true;
}
    // 检查 419 是否为 true
    if (buttonStatus['419'] === true) {
        buttonStatus['407'] = true;
        buttonStatus['409'] = true;
        buttonStatus['415'] = true;
        buttonStatus['412'] = true;
        buttonStatus['413'] = true;
        buttonStatus['410'] = true;
}
    // 检查 233 是否为 true
    if (buttonStatus['233'] === true) {
        buttonStatus['236'] = true;
}
    // 检查 39 是否为 true
    if (buttonStatus['39'] === true) {
        buttonStatus['23'] = true;
}
    // 检查 118 是否为 true
    if (buttonStatus['118'] === true) {
        buttonStatus['23'] = true;
}
    // 检查 452 是否为 true
    if (buttonStatus['452'] === true) {
        buttonStatus['451'] = true;
}
    // 检查 451 是否为 true
    if (buttonStatus['451'] === true) {
        buttonStatus['450'] = true;
}
    // 检查 450 是否为 true
    if (buttonStatus['450'] === true) {
        buttonStatus['619'] = true;
}
    // 检查 619 是否为 true
    if (buttonStatus['619'] === true) {
        buttonStatus['449'] = true;
}
    // 检查 449 是否为 true
    if (buttonStatus['449'] === true) {
        buttonStatus['448'] = true;
}
    // 检查 448 是否为 true
    if (buttonStatus['448'] === true) {
        buttonStatus['447'] = true;
}
    // 检查 447 是否为 true
    if (buttonStatus['447'] === true) {
        buttonStatus['446'] = true;
}
    // 检查 446 是否为 true
    if (buttonStatus['446'] === true) {
        buttonStatus['445'] = true;
}
    // 检查 445 是否为 true
    if (buttonStatus['445'] === true) {
        buttonStatus['444'] = true;
}
    // 检查 444 是否为 true
    if (buttonStatus['444'] === true) {
        buttonStatus['249'] = true;
}
    // 检查 163 是否为 true
    if (buttonStatus['163'] === true) {
        buttonStatus['162'] = true;
	buttonStatus['249'] = true;
}
    // 检查 249 是否为 true
    if (buttonStatus['249'] === true) {
        buttonStatus['248'] = true;
}
    // 检查 248 是否为 true
    if (buttonStatus['248'] === true) {
        buttonStatus['247'] = true;
}
    // 检查 247 是否为 true
    if (buttonStatus['247'] === true) {
        buttonStatus['246'] = true;
}
    // 检查 246 是否为 true
    if (buttonStatus['246'] === true) {
        buttonStatus['245'] = true;
}
    // 检查 245 是否为 true
    if (buttonStatus['245'] === true) {
        buttonStatus['244'] = true;
}
    // 检查 244 是否为 true
    if (buttonStatus['244'] === true) {
        buttonStatus['243'] = true;
}
    // 检查 243 是否为 true
    if (buttonStatus['243'] === true) {
        buttonStatus['242'] = true;
}
    // 检查 242 是否为 true
    //if (buttonStatus['242'] === true) {
    //    buttonStatus['150'] = true;
    //    buttonStatus['274'] = true;
    //}
    // 检查 160 是否为 true
    if (buttonStatus['160'] === true) {
        buttonStatus['158'] = true;
}
    // 检查 270 是否为 true
    if (buttonStatus['270'] === true) {
        buttonStatus['269'] = true;
}
    // 检查 269 是否为 true
    if (buttonStatus['269'] === true) {
        buttonStatus['268'] = true;
}
    // 检查 418 是否为 true
    if (buttonStatus['418'] === true) {
        buttonStatus['91'] = true;
        buttonStatus['415'] = true;
}
    // 检查 95 是否为 true
    if (buttonStatus['95'] === true) {
        buttonStatus['85'] = true;
}
    // 检查 236 是否为 true
    if (buttonStatus['236'] === true) {
        buttonStatus['403'] = true;
}
    // 检查 232 是否为 true
    if (buttonStatus['232'] === true) {
        buttonStatus['222'] = true;
}
    // 检查 390 是否为 true
    if (buttonStatus['390'] === true) {
        buttonStatus['387'] = true;
        buttonStatus['389'] = true;
}
    // 检查 276 是否为 true
    if (buttonStatus['276'] === true) {
        buttonStatus['274'] = true;
}
    // 检查 359 是否为 true
    if (buttonStatus['359'] === true) {
        buttonStatus['361'] = true;
}
    // 检查 309 是否为 true
    if (buttonStatus['309'] === true) {
        buttonStatus['308'] = true;
}
    // 检查 308 是否为 true
    if (buttonStatus['308'] === true) {
        buttonStatus['275'] = true;
}
    // 检查 275 是否为 true
    if (buttonStatus['275'] === true) {
        buttonStatus['274'] = true;
	buttonStatus['271'] = true;
}
    // 检查 361 是否为 true
    if (buttonStatus['361'] === true) {
        buttonStatus['352'] = true;
}
    // 检查 266 是否为 true
    if (buttonStatus['266'] === true) {
        buttonStatus['263'] = true;
}
    // 检查 267 是否为 true
    if (buttonStatus['267'] === true) {
        buttonStatus['263'] = true;
}
    // 检查 151 是否为 true
    if (buttonStatus['151'] === true) {
        buttonStatus['150'] = true;
}
    // 检查 150 是否为 true
    if (buttonStatus['150'] === true) {
        buttonStatus['149'] = true;
}
    // 检查 149 是否为 true
    if (buttonStatus['149'] === true) {
        buttonStatus['148'] = true;
}
    // 检查 38 是否为 true
    if (buttonStatus['38'] === true) {
        buttonStatus['23'] = true;
}
    // 检查 37 是否为 true
    if (buttonStatus['37'] === true) {
        buttonStatus['23'] = true;
}
    // 检查 78 是否为 true
    if (buttonStatus['78'] === true) {
        buttonStatus['157'] = true;
        buttonStatus['77'] = true;
}
    // 检查 84 是否为 true
    if (buttonStatus['84'] === true) {
        buttonStatus['81'] = true;
}
    // 检查 222 是否为 true
    if (buttonStatus['222'] === true) {
        buttonStatus['220'] = true;
}
    // 检查 221 是否为 true
    if (buttonStatus['221'] === true) {
        buttonStatus['218'] = true;
}
    // 检查 264 是否为 true
    if (buttonStatus['264'] === true) {
        buttonStatus['220'] = true;
}
    // 检查 214 是否为 true
    if (buttonStatus['214'] === true) {
        buttonStatus['213'] = true;
}
    // 检查 209 是否为 true
    if (buttonStatus['209'] === true) {
        buttonStatus['208'] = true;
}
    // 检查 26 是否为 true
    if (buttonStatus['26'] === true) {
        buttonStatus['208'] = true;
}
    // 检查 231 是否为 true
    if (buttonStatus['231'] === true) {
        buttonStatus['219'] = true;
        buttonStatus['230'] = true;
}
    // 检查 25 是否为 true
    if (buttonStatus['25'] === true) {
        buttonStatus['23'] = true;
        buttonStatus['24'] = true;
}
    // 检查 24 是否为 true
    if (buttonStatus['24'] === true) {
        buttonStatus['21'] = true;
}
    // 检查 87 是否为 true
    if (buttonStatus['87'] === true) {
        buttonStatus['83'] = true;
        buttonStatus['86'] = true;
}
    // 检查 388 是否为 true
    if (buttonStatus['388'] === true) {
        buttonStatus['387'] = true;
}
    // 检查 387 是否为 true
    if (buttonStatus['387'] === true) {
        buttonStatus['386'] = true;
}
    // 检查 386 是否为 true
    if (buttonStatus['386'] === true) {
        buttonStatus['274'] = true;
}
    // 检查 274 是否为 true
    if (buttonStatus['274'] === true) {
        buttonStatus['273'] = true;
}
    // 检查 273 是否为 true
    if (buttonStatus['273'] === true) {
        buttonStatus['260'] = true;
}
    // 检查 416 是否为 true
    if (buttonStatus['416'] === true) {
        buttonStatus['410'] = true;
}
    // 检查 302 是否为 true
    if (buttonStatus['302'] === true) {
        buttonStatus['301'] = true;
}
    // 检查 301 是否为 true
    if (buttonStatus['301'] === true) {
        buttonStatus['300'] = true;
}
    // 检查 300 是否为 true
    if (buttonStatus['300'] === true) {
        buttonStatus['299'] = true;
}
    // 检查 299 是否为 true
    if (buttonStatus['299'] === true) {
        buttonStatus['298'] = true;
}
    // 检查 298 是否为 true
    if (buttonStatus['298'] === true) {
        buttonStatus['297'] = true;
}
    // 检查 297 是否为 true
    if (buttonStatus['297'] === true) {
        buttonStatus['296'] = true;
}
    // 检查 296 是否为 true
    if (buttonStatus['296'] === true) {
        buttonStatus['295'] = true;
}
    // 检查 295 是否为 true
    if (buttonStatus['295'] === true) {
        buttonStatus['294'] = true;
}
    // 检查 294 是否为 true
    if (buttonStatus['294'] === true) {
        buttonStatus['293'] = true;
}
    // 检查 293 是否为 true
    if (buttonStatus['293'] === true) {
        buttonStatus['292'] = true;
}
    // 检查 292 是否为 true
    if (buttonStatus['292'] === true) {
        buttonStatus['291'] = true;
}
    // 检查 291 是否为 true
    if (buttonStatus['291'] === true) {
        buttonStatus['290'] = true;
}
    // 检查 290 是否为 true
    if (buttonStatus['290'] === true) {
        buttonStatus['289'] = true;
}
    // 检查 289 是否为 true
    if (buttonStatus['289'] === true) {
        buttonStatus['288'] = true;
}
    // 检查 288 是否为 true
    if (buttonStatus['288'] === true) {
        buttonStatus['287'] = true;
}
    // 检查 287 是否为 true
    if (buttonStatus['287'] === true) {
        buttonStatus['286'] = true;
}
    // 检查 286 是否为 true
    if (buttonStatus['286'] === true) {
        buttonStatus['285'] = true;
}
    // 检查 285 是否为 true
    if (buttonStatus['285'] === true) {
        buttonStatus['284'] = true;
}
    // 检查 319 是否为 true
    if (buttonStatus['319'] === true) {
        buttonStatus['284'] = true;
}
    // 检查 284 是否为 true
    if (buttonStatus['284'] === true) {
        buttonStatus['283'] = true;
}
    // 检查 283 是否为 true
    if (buttonStatus['283'] === true) {
        buttonStatus['282'] = true;
}
    // 检查 282 是否为 true
    if (buttonStatus['282'] === true) {
        buttonStatus['281'] = true;
}
    // 检查 281 是否为 true
    if (buttonStatus['281'] === true) {
        buttonStatus['279'] = true;
        buttonStatus['280'] = true;
}
    // 检查 280 是否为 true
    if (buttonStatus['280'] === true) {
        buttonStatus['278'] = true;
}
    // 检查 279 是否为 true
    if (buttonStatus['279'] === true) {
        buttonStatus['278'] = true;
}
    // 检查 60 是否为 true
    if (buttonStatus['60'] === true) {
        buttonStatus['57'] = true;
}
    // 检查 57 是否为 true
    if (buttonStatus['57'] === true) {
        buttonStatus['50'] = true;
}
    // 检查 50 是否为 true
    if (buttonStatus['50'] === true) {
        buttonStatus['31'] = true;
}
    // 检查 31 是否为 true
    if (buttonStatus['31'] === true) {
        buttonStatus['30'] = true;
}
    // 检查 30 是否为 true
    if (buttonStatus['30'] === true) {
        buttonStatus['29'] = true;
}
    // 检查 237 是否为 true
    if (buttonStatus['237'] === true) {
        buttonStatus['213'] = true;
}
    // 检查 224 是否为 true
    if (buttonStatus['224'] === true) {
        buttonStatus['223'] = true;
        buttonStatus['91'] = true;
        buttonStatus['415'] = true;
}
    // 检查 223 是否为 true
    if (buttonStatus['223'] === true) {
        buttonStatus['27'] = true;
        buttonStatus['146'] = true;
}
    // 检查 234 是否为 true
    if (buttonStatus['234'] === true) {
        buttonStatus['204'] = true;
}
    // 检查 42 是否为 true
    if (buttonStatus['42'] === true) {
        buttonStatus['21'] = true;
}
    // 检查 385 是否为 true
    if (buttonStatus['385'] === true) {
        buttonStatus['384'] = true;
}
    // 检查 411 是否为 true
    if (buttonStatus['411'] === true) {
        buttonStatus['410'] = true;
}
    // 检查 422 是否为 true
    if (buttonStatus['422'] === true) {
        buttonStatus['409'] = true;
        buttonStatus['407'] = true;
        buttonStatus['410'] = true;
}
    // 检查 409 是否为 true
    if (buttonStatus['409'] === true) {
        buttonStatus['340'] = true;
        buttonStatus['403'] = true;
}
    // 检查 431 是否为 true
    if (buttonStatus['431'] === true) {
        buttonStatus['389'] = true;
}
    // 检查 414 是否为 true
    if (buttonStatus['414'] === true) {
        buttonStatus['401'] = true;
        buttonStatus['413'] = true;
}
    // 检查 413 是否为 true
    if (buttonStatus['413'] === true) {
        buttonStatus['417'] = true;
}
    // 检查 410 是否为 true
    if (buttonStatus['410'] === true) {
        buttonStatus['401'] = true;
        buttonStatus['77'] = true;
        buttonStatus['157'] = true;
}
    // 检查 412 是否为 true
    if (buttonStatus['412'] === true) {
        buttonStatus['254'] = true;
        buttonStatus['403'] = true;
}
    // 检查 389 是否为 true
    if (buttonStatus['389'] === true) {
        buttonStatus['403'] = true;
}
    // 检查 421 是否为 true
    if (buttonStatus['421'] === true) {
        buttonStatus['403'] = true;
}
    // 检查 405 是否为 true
    if (buttonStatus['405'] === true) {
        buttonStatus['403'] = true;
}
    // 检查 408 是否为 true
    if (buttonStatus['408'] === true) {
        buttonStatus['401'] = true;
}
    // 检查 407 是否为 true
    if (buttonStatus['407'] === true) {
        buttonStatus['401'] = true;
}
    // 检查 404 是否为 true
    if (buttonStatus['404'] === true) {
        buttonStatus['403'] = true;
}
    // 检查 363 是否为 true
    if (buttonStatus['363'] === true) {
        buttonStatus['331'] = true;
}
    // 检查 332 是否为 true
    if (buttonStatus['332'] === true) {
        buttonStatus['343'] = true;
	buttonStatus['331'] = true;
}
    // 检查 331 是否为 true
    if (buttonStatus['331'] === true) {
        buttonStatus['330'] = true;
}
    // 检查 358 是否为 true
    if (buttonStatus['358'] === true) {
        buttonStatus['357'] = true;
}
    // 检查 357 是否为 true
    if (buttonStatus['357'] === true) {
        buttonStatus['355'] = true;
}
    // 检查 350 是否为 true
    if (buttonStatus['350'] === true) {
        buttonStatus['349'] = true;
}
    // 检查 356 是否为 true
    if (buttonStatus['356'] === true) {
        buttonStatus['355'] = true;
	buttonStatus['333'] = true;
}
    // 检查 339 是否为 true
    if (buttonStatus['339'] === true) {
        buttonStatus['338'] = true;
}
    // 检查 338 是否为 true
    if (buttonStatus['338'] === true) {
        buttonStatus['337'] = true;
}
    // 检查 347 是否为 true
    if (buttonStatus['347'] === true) {
        buttonStatus['354'] = true;
	buttonStatus['346'] = true;
}
    // 检查 354 是否为 true
    if (buttonStatus['354'] === true) {
        buttonStatus['333'] = true;
	buttonStatus['353'] = true;
}
    // 检查 349 是否为 true
    if (buttonStatus['349'] === true) {
        buttonStatus['348'] = true;
}
    // 检查 355 是否为 true
    if (buttonStatus['355'] === true) {
        buttonStatus['353'] = true;
}
    // 检查 353 是否为 true
    if (buttonStatus['353'] === true) {
        buttonStatus['348'] = true;
}
    // 检查 348 是否为 true
    if (buttonStatus['348'] === true) {
        buttonStatus['344'] = true;
}
    // 检查 344 是否为 true
    if (buttonStatus['344'] === true) {
        buttonStatus['342'] = true;
}
    // 检查 335 是否为 true
    if (buttonStatus['335'] === true) {
        buttonStatus['334'] = true;
}
    // 检查 334 是否为 true
    if (buttonStatus['334'] === true) {
        buttonStatus['333'] = true;
}
    // 检查 352 是否为 true
    if (buttonStatus['352'] === true) {
        buttonStatus['349'] = true;
	buttonStatus['340'] = true;
}
    // 检查 340 是否为 true
    if (buttonStatus['340'] === true) {
        buttonStatus['337'] = true;
}
    // 检查 337 是否为 true
    if (buttonStatus['337'] === true) {
        buttonStatus['336'] = true;
	buttonStatus['342'] = true;
}
    // 检查 336 是否为 true
    if (buttonStatus['336'] === true) {
        buttonStatus['333'] = true;
}
    // 检查 346 是否为 true
    if (buttonStatus['346'] === true) {
        buttonStatus['345'] = true;
}
    // 检查 345 是否为 true
    if (buttonStatus['345'] === true) {
        buttonStatus['344'] = true;
	buttonStatus['333'] = true;
}
    // 检查 333 是否为 true
    if (buttonStatus['333'] === true) {
        buttonStatus['329'] = true;
        buttonStatus['328'] = true;
}
    // 检查 213 是否为 true
    if (buttonStatus['213'] === true) {
        buttonStatus['212'] = true;
}
    // 检查 212 是否为 true
    if (buttonStatus['212'] === true) {
        buttonStatus['211'] = true;
}
    // 检查 211 是否为 true
    if (buttonStatus['211'] === true) {
        buttonStatus['210'] = true;
}
    // 检查 210 是否为 true
    if (buttonStatus['210'] === true) {
        buttonStatus['208'] = true;
}
    // 检查 220 是否为 true
    if (buttonStatus['220'] === true) {
        buttonStatus['219'] = true;
}
    // 检查 219 是否为 true
    if (buttonStatus['219'] === true) {
        buttonStatus['218'] = true;
}
    // 检查 218 是否为 true
    if (buttonStatus['218'] === true) {
        buttonStatus['217'] = true;
}
    // 检查 217 是否为 true
    if (buttonStatus['217'] === true) {
        buttonStatus['216'] = true;
}
    // 检查 216 是否为 true
    if (buttonStatus['216'] === true) {
        buttonStatus['215'] = true;
}
    // 检查 215 是否为 true
    if (buttonStatus['215'] === true) {
        buttonStatus['208'] = true;
}
    // 检查 155 是否为 true
    if (buttonStatus['155'] === true) {
        buttonStatus['148'] = true;
}
    // 检查 154 是否为 true
    if (buttonStatus['154'] === true) {
        buttonStatus['146'] = true;
}
    // 检查 153 是否为 true
    if (buttonStatus['153'] === true) {
        buttonStatus['148'] = true;
}
    // 检查 165 是否为 true
    if (buttonStatus['165'] === true) {
        buttonStatus['148'] = true;
}
    // 检查 179 是否为 true
    if (buttonStatus['179'] === true) {
        buttonStatus['152'] = true;
        buttonStatus['411'] = true;
}
    // 检查 152 是否为 true
    if (buttonStatus['152'] === true) {
        buttonStatus['153'] = true;
}
    // 检查 178 是否为 true
    if (buttonStatus['178'] === true) {
        buttonStatus['148'] = true;
}
    // 检查 148 是否为 true
    if (buttonStatus['148'] === true) {
        buttonStatus['147'] = true;
}
    // 检查 147 是否为 true
    if (buttonStatus['147'] === true) {
        buttonStatus['154'] = true;
}
    // 检查 268 是否为 true
    if (buttonStatus['268'] === true) {
        buttonStatus['89'] = true;
        buttonStatus['27'] = true;
}
    // 检查 415 是否为 true
    if (buttonStatus['415'] === true) {
        buttonStatus['158'] = true;
        buttonStatus['90'] = true;
        buttonStatus['268'] = true;
        buttonStatus['91'] = true;
}
    // 检查 91 是否为 true
    if (buttonStatus['91'] === true) {
        buttonStatus['90'] = true;
        buttonStatus['158'] = true;
        buttonStatus['268'] = true;
        buttonStatus['415'] = true;
}
    // 检查 90 是否为 true
    if (buttonStatus['90'] === true) {
        buttonStatus['89'] = true;
}
    // 检查 89 是否为 true
    if (buttonStatus['89'] === true) {
        buttonStatus['88'] = true;
}
    // 检查 158 是否为 true
    if (buttonStatus['158'] === true) {
        buttonStatus['27'] = true;
}
    // 检查 85 是否为 true
    if (buttonStatus['85'] === true) {
        buttonStatus['82'] = true;
}
    // 检查 86 是否为 true
    if (buttonStatus['86'] === true) {
        buttonStatus['82'] = true;
}
    // 检查 230 是否为 true
    if (buttonStatus['230'] === true) {
        buttonStatus['199'] = true;
}
    // 检查 229 是否为 true
    if (buttonStatus['229'] === true) {
        buttonStatus['199'] = true;
}
    // 检查 227 是否为 true
    if (buttonStatus['227'] === true) {
        buttonStatus['228'] = true;
}
    // 检查 228 是否为 true
    if (buttonStatus['228'] === true) {
        buttonStatus['199'] = true;
        buttonStatus['146'] = true;
}
    // 检查 201 是否为 true
    if (buttonStatus['201'] === true) {
        buttonStatus['200'] = true;
}
    // 检查 200 是否为 true
    if (buttonStatus['200'] === true) {
        buttonStatus['146'] = true;
        buttonStatus['199'] = true;
}
    // 检查 435 是否为 true
    if (buttonStatus['435'] === true) {
        buttonStatus['238'] = true;
        buttonStatus['107'] = true;
}
    // 检查 107 是否为 true
    if (buttonStatus['107'] === true) {
        buttonStatus['238'] = true;
        buttonStatus['235'] = true;
}
    // 检查 238 是否为 true
    if (buttonStatus['238'] === true) {
        buttonStatus['235'] = true;
        buttonStatus['107'] = true;
}
    // 检查 235 是否为 true
    if (buttonStatus['235'] === true) {
        buttonStatus['202'] = true;
}
    // 检查 208 是否为 true
    if (buttonStatus['208'] === true) {
        buttonStatus['207'] = true;
}
    // 检查 207 是否为 true
    if (buttonStatus['207'] === true) {
        buttonStatus['206'] = true;
}
    // 检查 206 是否为 true
    if (buttonStatus['206'] === true) {
        buttonStatus['205'] = true;
}
    // 检查 205 是否为 true
    if (buttonStatus['205'] === true) {
        buttonStatus['204'] = true;
}
    // 检查 204 是否为 true
    if (buttonStatus['204'] === true) {
        buttonStatus['203'] = true;
}
    // 检查 203 是否为 true
    if (buttonStatus['203'] === true) {
        buttonStatus['202'] = true;
}
    // 检查 202 是否为 true
    if (buttonStatus['202'] === true) {
        buttonStatus['146'] = true;
        buttonStatus['199'] = true;
}
    // 检查 251 是否为 true
    if (buttonStatus['251'] === true) {
        buttonStatus['280'] = true;
        buttonStatus['252'] = true;
}
    // 检查 32 是否为 true
    if (buttonStatus['32'] === true) {
        buttonStatus['17'] = true;
}
    // 检查 27 是否为 true
    if (buttonStatus['27'] === true) {
        buttonStatus['17'] = true;
}
    // 检查 46 是否为 true
    if (buttonStatus['46'] === true) {
        buttonStatus['45'] = true;
}
    // 检查 45 是否为 true
    if (buttonStatus['45'] === true) {
        buttonStatus['44'] = true;
}
    // 检查 44 是否为 true
    if (buttonStatus['44'] === true) {
        buttonStatus['23'] = true;
}
    // 检查 43 是否为 true
    if (buttonStatus['43'] === true) {
        buttonStatus['40'] = true;
}
    // 检查 41 是否为 true
    if (buttonStatus['41'] === true) {
        buttonStatus['40'] = true;
}
    // 检查 40 是否为 true
    if (buttonStatus['40'] === true) {
        buttonStatus['19'] = true;
}
    // 检查 23 是否为 true
    if (buttonStatus['23'] === true) {
        buttonStatus['22'] = true;
}
    // 检查 22 是否为 true
    if (buttonStatus['22'] === true) {
        buttonStatus['21'] = true;
}
    // 检查 21 是否为 true
    if (buttonStatus['21'] === true) {
        buttonStatus['20'] = true;
}
    // 检查 20 是否为 true
    if (buttonStatus['20'] === true) {
        buttonStatus['19'] = true;
}
    // 检查 19 是否为 true
    if (buttonStatus['19'] === true) {
        buttonStatus['18'] = true;
}
    // 检查 18 是否为 true
    if (buttonStatus['18'] === true) {
        buttonStatus['17'] = true;
}
    // 检查 423 是否为 true
    if (buttonStatus['423'] === true) {
        buttonStatus['76'] = true;
	buttonStatus['403'] = true;
}
    // 检查 100 是否为 true
    if (buttonStatus['100'] === true) {
        buttonStatus['385'] = true;
	buttonStatus['76'] = true;
}
    // 检查 76 是否为 true
    if (buttonStatus['76'] === true) {
        buttonStatus['75'] = true;
}
    // 检查 102 是否为 true
    if (buttonStatus['102'] === true) {
        buttonStatus['99'] = true;
}
    // 检查 99 是否为 true
    if (buttonStatus['99'] === true) {
        buttonStatus['75'] = true;
}
    // 检查 75 是否为 true
    if (buttonStatus['75'] === true) {
        buttonStatus['72'] = true;
}
    // 检查 98 是否为 true
    if (buttonStatus['98'] === true) {
        buttonStatus['97'] = true;
}
    // 检查 97 是否为 true
    if (buttonStatus['97'] === true) {
        buttonStatus['80'] = true;
}
    // 检查 106 是否为 true
    if (buttonStatus['106'] === true) {
        buttonStatus['83'] = true;
}
    // 检查 83 是否为 true
    if (buttonStatus['83'] === true) {
        buttonStatus['82'] = true;
}
    // 检查 82 是否为 true
    if (buttonStatus['82'] === true) {
        buttonStatus['81'] = true;
}
    // 检查 81 是否为 true
    if (buttonStatus['81'] === true) {
        buttonStatus['80'] = true;
}
    // 检查 80 是否为 true
    if (buttonStatus['80'] === true) {
        buttonStatus['79'] = true;
}
    // 检查 79 是否为 true
    if (buttonStatus['79'] === true) {
        buttonStatus['72'] = true;
}
    // 检查 434 是否为 true
    if (buttonStatus['434'] === true) {
        buttonStatus['403'] = true;
}
    // 检查 403 是否为 true
    if (buttonStatus['403'] === true) {
        buttonStatus['401'] = true;
}
    // 检查 401 是否为 true
    if (buttonStatus['401'] === true) {
        buttonStatus['426'] = true;
        buttonStatus['393'] = true;
}
    // 检查 739 是否为 true
    if (buttonStatus['739'] === true) {
        buttonStatus['430'] = true;
}
    // 检查 430 是否为 true
    if (buttonStatus['430'] === true) {
        buttonStatus['429'] = true;
}
    // 检查 429 是否为 true
    if (buttonStatus['429'] === true) {
        buttonStatus['428'] = true;
}
    // 检查 428 是否为 true
    if (buttonStatus['428'] === true) {
        buttonStatus['427'] = true;
}
    // 检查 427 是否为 true
    if (buttonStatus['427'] === true) {
        buttonStatus['426'] = true;
}
    // 检查 426 是否为 true
    if (buttonStatus['426'] === true) {
        buttonStatus['425'] = true;
}
    // 检查 425 是否为 true
    if (buttonStatus['425'] === true) {
        buttonStatus['381'] = true;
}
    // 检查 424 是否为 true
    if (buttonStatus['424'] === true) {
        buttonStatus['381'] = true;
}
    // 检查 417 是否为 true
    if (buttonStatus['417'] === true) {
        buttonStatus['402'] = true;
}
    // 检查 271 是否为 true
    if (buttonStatus['271'] === true) {
        buttonStatus['262'] = true;
}
    // 检查 265 是否为 true
    if (buttonStatus['265'] === true) {
        buttonStatus['262'] = true;
}
    // 检查 162 是否为 true
    if (buttonStatus['162'] === true) {
        buttonStatus['161'] = true;
}
    // 检查 166 是否为 true
    if (buttonStatus['166'] === true) {
        buttonStatus['142'] = true;
}
    // 检查 161 是否为 true
    if (buttonStatus['161'] === true) {
        buttonStatus['146'] = true;
}
    // 检查 144 是否为 true
    if (buttonStatus['144'] === true) {
        buttonStatus['143'] = true;
}
    // 检查 143 是否为 true
    if (buttonStatus['143'] === true) {
        buttonStatus['142'] = true;
}
    // 检查 142 是否为 true
    if (buttonStatus['142'] === true) {
        buttonStatus['141'] = true;
}
    // 检查 141 是否为 true
    if (buttonStatus['141'] === true) {
        buttonStatus['139'] = true;
}
    // 检查 34 是否为 true
    if (buttonStatus['34'] === true) {
        buttonStatus['33'] = true;
}
    // 检查 33 是否为 true
    if (buttonStatus['33'] === true) {
        buttonStatus['136'] = true;
}
    // 检查 400 是否为 true
    if (buttonStatus['400'] === true) {
        buttonStatus['432'] = true;
}
    // 检查 49 是否为 true
    if (buttonStatus['49'] === true) {
        buttonStatus['16'] = true;
}
    // 检查 432 是否为 true
    if (buttonStatus['432'] === true) {
        buttonStatus['381'] = true;
	buttonStatus['135'] = true;
}
    // 检查 15 是否为 true
    if (buttonStatus['15'] === true) {
        buttonStatus['14'] = true;
}
    // 检查 14 是否为 true
    if (buttonStatus['14'] === true) {
        buttonStatus['13'] = true;
}
    // 检查 56 是否为 true
    if (buttonStatus['56'] === true) {
        buttonStatus['13'] = true;
}
    // 检查 92 是否为 true
    if (buttonStatus['92'] === true) {
        buttonStatus['13'] = true;
}
    // 检查 13 是否为 true
    if (buttonStatus['13'] === true) {
        buttonStatus['10'] = true;
}
    // 检查 12 是否为 true
    if (buttonStatus['12'] === true) {
        buttonStatus['11'] = true;
}
    // 检查 11 是否为 true
    if (buttonStatus['11'] === true) {
        buttonStatus['8'] = true;
}
    // 检查 226 是否为 true
    if (buttonStatus['226'] === true) {
        buttonStatus['225'] = true;
}
    // 检查 225 是否为 true
    if (buttonStatus['225'] === true) {
        buttonStatus['156'] = true;
}
    // 检查 156 是否为 true
    if (buttonStatus['156'] === true) {
        buttonStatus['146'] = true;
}
    // 检查 343 是否为 true
    if (buttonStatus['343'] === true) {
        buttonStatus['342'] = true;
}
    // 检查 342 是否为 true
    if (buttonStatus['342'] === true) {
        buttonStatus['341'] = true;
}
    // 检查 341 是否为 true
    if (buttonStatus['341'] === true) {
        buttonStatus['329'] = true;
        buttonStatus['328'] = true;
}
    // 检查 330 是否为 true
    if (buttonStatus['330'] === true) {
        buttonStatus['327'] = true;
}
    // 检查 373 是否为 true
    if (buttonStatus['373'] === true) {
        buttonStatus['328'] = true;
}
    // 检查 328 是否为 true
    if (buttonStatus['328'] === true) {
        buttonStatus['327'] = true;
}
    // 检查 362 是否为 true
    if (buttonStatus['362'] === true) {
        buttonStatus['329'] = true;
}
    // 检查 329 是否为 true
    if (buttonStatus['329'] === true) {
        buttonStatus['327'] = true;
}
    // 检查 420 是否为 true
    if (buttonStatus['420'] === true) {
        buttonStatus['393'] = true;
}
    // 检查 396 是否为 true
    if (buttonStatus['396'] === true) {
        buttonStatus['392'] = true;
}
    // 检查 398 是否为 true
    if (buttonStatus['398'] === true) {
        buttonStatus['393'] = true;
}
    // 检查 406 是否为 true
    if (buttonStatus['406'] === true) {
        buttonStatus['395'] = true;
}
    // 检查 395 是否为 true
    if (buttonStatus['395'] === true) {
        buttonStatus['394'] = true;
}
    // 检查 394 是否为 true
    if (buttonStatus['394'] === true) {
        buttonStatus['393'] = true;
}
    // 检查 393 是否为 true
    if (buttonStatus['393'] === true) {
        buttonStatus['392'] = true;
}
    // 检查 255 是否为 true
    if (buttonStatus['255'] === true) {
        buttonStatus['256'] = true;
}
    // 检查 256 是否为 true
    if (buttonStatus['256'] === true) {
        buttonStatus['254'] = true;
}
    // 检查 108 是否为 true
    if (buttonStatus['108'] === true) {
        buttonStatus['315'] = true;
}
    // 检查 315 是否为 true
    if (buttonStatus['315'] === true) {
        buttonStatus['314'] = true;
}
    // 检查 175 是否为 true
    if (buttonStatus['175'] === true) {
        buttonStatus['174'] = true;
}
    // 检查 174 是否为 true
    if (buttonStatus['174'] === true) {
        buttonStatus['254'] = true;
}
    // 检查 314 是否为 true
    if (buttonStatus['314'] === true) {
        buttonStatus['316'] = true;
}
    // 检查 316 是否为 true
    if (buttonStatus['316'] === true) {
        buttonStatus['254'] = true;
}
    // 检查 254 是否为 true
    if (buttonStatus['254'] === true) {
        buttonStatus['253'] = true;
}
    // 检查 261 是否为 true
    if (buttonStatus['261'] === true) {
        buttonStatus['260'] = true;
}
    // 检查 272 是否为 true
    if (buttonStatus['272'] === true) {
        buttonStatus['262'] = true;
}
    // 检查 74 是否为 true
    if (buttonStatus['74'] === true) {
        buttonStatus['72'] = true;
}
    // 检查 112 是否为 true
    if (buttonStatus['112'] === true) {
        buttonStatus['110'] = true;
}
    // 检查 110 是否为 true
    if (buttonStatus['110'] === true) {
        buttonStatus['111'] = true;
}
    // 检查 111 是否为 true
    if (buttonStatus['111'] === true) {
        buttonStatus['96'] = true;
}
    // 检查 8 是否为 true
    if (buttonStatus['8'] === true) {
        buttonStatus['7'] = true;
}
    // 检查 7 是否为 true
    if (buttonStatus['7'] === true) {
        buttonStatus['6'] = true;
}
    // 检查 157 是否为 true
    if (buttonStatus['157'] === true) {
        buttonStatus['72'] = true;
        buttonStatus['77'] = true;
}
    // 检查 77 是否为 true
    if (buttonStatus['77'] === true) {
        buttonStatus['72'] = true;
        buttonStatus['157'] = true;
}
    // 检查 307 是否为 true
    if (buttonStatus['307'] === true) {
        buttonStatus['258'] = true;
}
    // 检查 277 是否为 true
    if (buttonStatus['277'] === true) {
        buttonStatus['257'] = true;
}
    // 检查 258 是否为 true
    if (buttonStatus['258'] === true) {
        buttonStatus['257'] = true;
}
    // 检查 257 是否为 true
    if (buttonStatus['257'] === true) {
        buttonStatus['253'] = true;
}
    // 检查 253 是否为 true
    if (buttonStatus['253'] === true) {
        buttonStatus['252'] = true;
}
    // 检查 252 是否为 true
    if (buttonStatus['252'] === true) {
        buttonStatus['279'] = true;
}
    // 检查 397 是否为 true
    if (buttonStatus['397'] === true) {
        buttonStatus['399'] = true;
}
    // 检查 399 是否为 true
    if (buttonStatus['399'] === true) {
        buttonStatus['398'] = true;
}
    // 检查 392 是否为 true
    if (buttonStatus['392'] === true) {
        buttonStatus['391'] = true;
}
    // 检查 391 是否为 true
    if (buttonStatus['391'] === true) {
        buttonStatus['383'] = true;
}
    // 检查 159 是否为 true
    if (buttonStatus['159'] === true) {
        buttonStatus['36'] = true;
        buttonStatus['35'] = true;
        buttonStatus['140'] = true;
        buttonStatus['167'] = true;
        buttonStatus['93'] = true;
        buttonStatus['94'] = true;
}
    // 检查 93 是否为 true
    if (buttonStatus['93'] === true) {
        buttonStatus['139'] = true;
        buttonStatus['35'] = true;
        buttonStatus['140'] = true;
        buttonStatus['94'] = true;
}
    // 检查 35 是否为 true
    if (buttonStatus['35'] === true) {
        buttonStatus['139'] = true;
        buttonStatus['140'] = true;
        buttonStatus['93'] = true;
        buttonStatus['36'] = true;
}
    // 检查 140 是否为 true
    if (buttonStatus['140'] === true) {
        buttonStatus['139'] = true;
        buttonStatus['35'] = true;
        buttonStatus['93'] = true;
}
    // 检查 139 是否为 true
    if (buttonStatus['139'] === true) {
        buttonStatus['138'] = true;
}
    // 检查 138 是否为 true
    if (buttonStatus['138'] === true) {
        buttonStatus['137'] = true;
}
    // 检查 137 是否为 true
    if (buttonStatus['137'] === true) {
        buttonStatus['136'] = true;
}
    // 检查 136 是否为 true
    if (buttonStatus['136'] === true) {
        buttonStatus['135'] = true;
}
    // 检查 73 是否为 true
    if (buttonStatus['73'] === true) {
        buttonStatus['72'] = true;
}
    // 检查 88 是否为 true
    if (buttonStatus['88'] === true) {
        buttonStatus['72'] = true;
}
    // 检查 402 是否为 true
    if (buttonStatus['402'] === true) {
        buttonStatus['384'] = true;
}
    // 检查 384 是否为 true
    if (buttonStatus['384'] === true) {
        buttonStatus['383'] = true;
}
    // 检查 383 是否为 true
    if (buttonStatus['383'] === true) {
        buttonStatus['382'] = true;
}
    // 检查 382 是否为 true
    if (buttonStatus['382'] === true) {
        buttonStatus['381'] = true;
}
    // 检查 17 是否为 true
    if (buttonStatus['17'] === true) {
        buttonStatus['10'] = true;
}
    // 检查 10 是否为 true
    if (buttonStatus['10'] === true) {
        buttonStatus['9'] = true;
}
    // 检查 9 是否为 true
    if (buttonStatus['9'] === true) {
        buttonStatus['6'] = true;
}
    // 检查 59 是否为 true
    if (buttonStatus['59'] === true) {
        buttonStatus['6'] = true;
}
    // 检查 6 是否为 true
    if (buttonStatus['6'] === true) {
        buttonStatus['5'] = true;
}
    // 检查 135 是否为 true
    if (buttonStatus['135'] === true) {
        buttonStatus['133'] = true;
}
    // 检查 72 是否为 true
    if (buttonStatus['72'] === true) {
        buttonStatus['71'] = true;
}
    // 检查 71 是否为 true
    if (buttonStatus['71'] === true) {
        buttonStatus['70'] = true;
}
    // 检查 199 是否为 true
    if (buttonStatus['199'] === true) {
        buttonStatus['198'] = true;
}
    // 检查 198 是否为 true
    if (buttonStatus['198'] === true) {
        buttonStatus['197'] = true;
}
    // 检查 197 是否为 true
    if (buttonStatus['197'] === true) {
        buttonStatus['196'] = true;
}
    // 检查 196 是否为 true
    if (buttonStatus['196'] === true) {
        buttonStatus['195'] = true;
}
    // 检查 195 是否为 true
    if (buttonStatus['195'] === true) {
        buttonStatus['146'] = true;
}
    // 检查 146 是否为 true
    if (buttonStatus['146'] === true) {
        buttonStatus['145'] = true;
}
    // 检查 145 是否为 true
    if (buttonStatus['145'] === true) {
        buttonStatus['132'] = true;
}
    // 检查 133 是否为 true
    if (buttonStatus['133'] === true) {
        buttonStatus['132'] = true;
}
    // 检查 263 是否为 true
    if (buttonStatus['263'] === true) {
        buttonStatus['262'] = true;
}
    // 检查 262 是否为 true
    if (buttonStatus['262'] === true) {
        buttonStatus['260'] = true;
}
    // 检查 318 是否为 true
    if (buttonStatus['318'] === true) {
        buttonStatus['260'] = true;
}
    // 检查 260 是否为 true
    if (buttonStatus['260'] === true) {
        buttonStatus['259'] = true;
}
    // 检查 259 是否为 true
    if (buttonStatus['259'] === true) {
        buttonStatus['278'] = true;
}
    // 检查 5 是否为 true
    if (buttonStatus['5'] === true) {
        buttonStatus['3'] = true;
}
    // 检查 4 是否为 true
    if (buttonStatus['4'] === true) {
        buttonStatus['3'] = true;
}
    // 检查 70 是否为 true
    if (buttonStatus['70'] === true) {
        buttonStatus['69'] = true;
}
    // 检查 69 是否为 true
    if (buttonStatus['69'] === true) {
        buttonStatus['66'] = true;
}
    // 检查 134 是否为 true
    if (buttonStatus['134'] === true) {
        buttonStatus['132'] = true;
}
    // 检查 132 是否为 true
    if (buttonStatus['132'] === true) {
        buttonStatus['164'] = true;
}
    // 检查 437 是否为 true
    if (buttonStatus['437'] === true) {
        buttonStatus['436'] = true;
}
    // 检查 436 是否为 true
    if (buttonStatus['436'] === true) {
        buttonStatus['381'] = true;
}
    // 检查 440 是否为 true
    if (buttonStatus['440'] === true) {
        buttonStatus['439'] = true;
}
    // 检查 439 是否为 true
    if (buttonStatus['439'] === true) {
        buttonStatus['381'] = true;
}
    // 检查 381 是否为 true
    if (buttonStatus['381'] === true) {
        buttonStatus['250'] = true;
}
    // 检查 68 是否为 true
    if (buttonStatus['68'] === true) {
        buttonStatus['67'] = true;
}
    // 检查 67 是否为 true
    if (buttonStatus['67'] === true) {
        buttonStatus['66'] = true;
}
    // 检查 2 是否为 true
    if (buttonStatus['2'] === true) {
        buttonStatus['1'] = true;
}
    // 检查 3 是否为 true
    if (buttonStatus['3'] === true) {
        buttonStatus['48'] = true;
}
    // 检查 48 是否为 true
    if (buttonStatus['48'] === true) {
        buttonStatus['1'] = true;
}
    // 检查 278 是否为 true
    if (buttonStatus['278'] === true) {
        buttonStatus['306'] = true;
}
    // 检查 250 是否为 true
    if (buttonStatus['250'] === true) {
        buttonStatus['306'] = true;
}
    // 检查 66 是否为 true
    if (buttonStatus['66'] === true) {
        buttonStatus['101'] = true;
}
    // 检查 1 是否为 true
    if (buttonStatus['1'] === true) {
        buttonStatus['47'] = true;
}
    // 检查 189 是否为 true
    if (buttonStatus['189'] === true) {
        buttonStatus['188'] = true;
}
    // 检查 190 是否为 true
    if (buttonStatus['190'] === true) {
        buttonStatus['189'] = true;
}
    // 检查 191 是否为 true
    if (buttonStatus['191'] === true) {
        buttonStatus['190'] = true;
}
    // 检查 192 是否为 true
    if (buttonStatus['192'] === true) {
        buttonStatus['191'] = true;
}
    // 检查 193 是否为 true
    if (buttonStatus['193'] === true) {
        buttonStatus['192'] = true;
}
    // 检查 194 是否为 true
    if (buttonStatus['194'] === true) {
        buttonStatus['193'] = true;
}
    // 检查 4500 是否为 true
    if (buttonStatus['4500'] === true) {
        buttonStatus['4499'] = true;
        buttonStatus['4498'] = true;
}
    // 检查 65 是否为 true
    if (buttonStatus['65'] === true) {
        buttonStatus['28'] = true;
}
    // 检查 4908 是否为 true
    if (buttonStatus['4908'] === true) {
        buttonStatus['249'] = true;
}
    // 检查 4907 是否为 true
    if (buttonStatus['4907'] === true) {
        buttonStatus['23'] = true;
}
    // 检查 5363 是否为 true
    if (buttonStatus['5363'] === true) {
        buttonStatus['213'] = true;
        buttonStatus['265'] = true;
}
    // 检查 5582 是否为 true
    if (buttonStatus['5582'] === true) {
        buttonStatus['5581'] = true;
}
    // 检查 5583 是否为 true
    if (buttonStatus['5583'] === true) {
        buttonStatus['5582'] = true;
}
    // 检查 5584 是否为 true
    if (buttonStatus['5584'] === true) {
        buttonStatus['5583'] = true;
}
    // 检查 5589 是否为 true
    if (buttonStatus['5589'] === true) {
        buttonStatus['5585'] = true;
}
    // 检查 5590 是否为 true
    if (buttonStatus['5590'] === true) {
        buttonStatus['5589'] = true;
}
    // 检查 5591 是否为 true
    if (buttonStatus['5591'] === true) {
        buttonStatus['5586'] = true;
}
    // 检查 5608 是否为 true
    if (buttonStatus['5608'] === true) {
        buttonStatus['5607'] = true;
}
    // 检查 5609 是否为 true
    if (buttonStatus['5609'] === true) {
        buttonStatus['5608'] = true;
}
    // 检查 5610 是否为 true
    if (buttonStatus['5610'] === true) {
        buttonStatus['5609'] = true;
}
    // 检查 5611 是否为 true
    if (buttonStatus['5611'] === true) {
        buttonStatus['5610'] = true;
}
    // 检查 5612 是否为 true
    if (buttonStatus['5612'] === true) {
        buttonStatus['5611'] = true;
}
    // 检查 5613 是否为 true
    if (buttonStatus['5613'] === true) {
        buttonStatus['5612'] = true;
}
    // 检查 5614 是否为 true
    if (buttonStatus['5614'] === true) {
        buttonStatus['5613'] = true;
}
    // 检查 5615 是否为 true
    if (buttonStatus['5615'] === true) {
        buttonStatus['5614'] = true;
}
    // 检查 5616 是否为 true
    if (buttonStatus['5616'] === true) {
        buttonStatus['5615'] = true;
}
    // 检查 5617 是否为 true
    if (buttonStatus['5617'] === true) {
        buttonStatus['5616'] = true;
}
    // 检查 5618 是否为 true
    if (buttonStatus['5618'] === true) {
        buttonStatus['5617'] = true;
}
    // 检查 5619 是否为 true
    if (buttonStatus['5619'] === true) {
        buttonStatus['5618'] = true;
}
    // 检查 5620 是否为 true
    if (buttonStatus['5620'] === true) {
        buttonStatus['5619'] = true;
}
    // 检查 5621 是否为 true
    if (buttonStatus['5621'] === true) {
        buttonStatus['5620'] = true;
}
    // 检查 5622 是否为 true
    if (buttonStatus['5622'] === true) {
        buttonStatus['5621'] = true;
}
    // 检查 5623 是否为 true
    if (buttonStatus['5623'] === true) {
        buttonStatus['5622'] = true;
}
    // 检查 5624 是否为 true
    if (buttonStatus['5624'] === true) {
        buttonStatus['5623'] = true;
}
    // 检查 5625 是否为 true
    if (buttonStatus['5625'] === true) {
        buttonStatus['5624'] = true;
}
    // 检查 5626 是否为 true
    if (buttonStatus['5626'] === true) {
        buttonStatus['5625'] = true;
}
    // 检查 5627 是否为 true
    if (buttonStatus['5627'] === true) {
        buttonStatus['5626'] = true;
}
    // 检查 5628 是否为 true
    if (buttonStatus['5628'] === true) {
        buttonStatus['5627'] = true;
}
    // 检查 5629 是否为 true
    if (buttonStatus['5629'] === true) {
        buttonStatus['5628'] = true;
}
    // 检查 5630 是否为 true
    if (buttonStatus['5630'] === true) {
        buttonStatus['5629'] = true;
}
    // 检查 5631 是否为 true
    if (buttonStatus['5631'] === true) {
        buttonStatus['5630'] = true;
}
    // 检查 5632 是否为 true
    if (buttonStatus['5632'] === true) {
        buttonStatus['5631'] = true;
}
    // 检查 5633 是否为 true
    if (buttonStatus['5633'] === true) {
        buttonStatus['5632'] = true;
}
    // 检查 5634 是否为 true
    if (buttonStatus['5634'] === true) {
        buttonStatus['5633'] = true;
}
    // 检查 5650 是否为 true
    if (buttonStatus['5650'] === true) {
        buttonStatus['5634'] = true;
		buttonStatus['5649'] = true;
}
    // 检查 5651 是否为 true
    if (buttonStatus['5651'] === true) {
        buttonStatus['5650'] = true;
}
    // 检查 5652 是否为 true
    if (buttonStatus['5652'] === true) {
        buttonStatus['5651'] = true;
}
    // 检查 5635 是否为 true
    if (buttonStatus['5635'] === true) {
        buttonStatus['5622'] = true;
}
    // 检查 5636 是否为 true
    if (buttonStatus['5636'] === true) {
        buttonStatus['5635'] = true;
}
    // 检查 5637 是否为 true
    if (buttonStatus['5637'] === true) {
        buttonStatus['5636'] = true;
}
    // 检查 5638 是否为 true
    if (buttonStatus['5638'] === true) {
        buttonStatus['5637'] = true;
}
    // 检查 5639 是否为 true
    if (buttonStatus['5639'] === true) {
        buttonStatus['5638'] = true;
}
    // 检查 5640 是否为 true
    if (buttonStatus['5640'] === true) {
        buttonStatus['5639'] = true;
}
    // 检查 5641 是否为 true
    if (buttonStatus['5641'] === true) {
        buttonStatus['5640'] = true;
}
    // 检查 5642 是否为 true
    if (buttonStatus['5642'] === true) {
        buttonStatus['5641'] = true;
}
    // 检查 5643 是否为 true
    if (buttonStatus['5643'] === true) {
        buttonStatus['5642'] = true;
}
    // 检查 5644 是否为 true
    if (buttonStatus['5644'] === true) {
        buttonStatus['5643'] = true;
}
    // 检查 5645 是否为 true
    if (buttonStatus['5645'] === true) {
        buttonStatus['5644'] = true;
}
    // 检查 5646 是否为 true
    if (buttonStatus['5646'] === true) {
        buttonStatus['5645'] = true;
}
    // 检查 5647 是否为 true
    if (buttonStatus['5647'] === true) {
        buttonStatus['5646'] = true;
}
    // 检查 5648 是否为 true
    if (buttonStatus['5648'] === true) {
        buttonStatus['5647'] = true;
}
    // 检查 5649 是否为 true
    if (buttonStatus['5649'] === true) {
        buttonStatus['5648'] = true;
}

    localStorage.setItem('buttonStatus', JSON.stringify(buttonStatus));
}

updateButtonStatus();