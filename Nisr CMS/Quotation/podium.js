function openPage(pageName, elmnt, color) {
    $('.tabcontent').css('display', 'none')
    $('.tablink').css({ "background-color": "", "color": "#008de9" })

    $(elmnt).css({ "background-color": color, "color": "white" })
    $('#' + pageName).css("display", "block")
}

function onPageLoad() {
    setTimeout(function () {
        openPage('New', this, '#008DE9');
        $('.container').show();
    }, 10);

    getLastQno()

}; onPageLoad();

function getLastQno()
{

    var raw = JSON.stringify({ 'qNo': '777', 'functionName': 'getLastQno' });

    var requestOptions = {
        method: 'POST',
        body: raw,
        redirect: 'follow'
    };

    fetch("https://xdcfusruzi.execute-api.ap-south-1.amazonaws.com/dev", requestOptions)
        .then(response => response.json())
        .then(
            function (result)
            {
                $("#lastQno").html(JSON.parse(JSON.parse(result.body)[0]))

            }
        )
        .catch(
            function (error) {
                console.log(error)
            });


}
function dateSetNew(today) {
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }

    today = yyyy + '-' + mm + '-' + dd;
    $('#datePickerNew').val(today);
}

function headerDropdown(e) {
    var dropdownDict = {
        "jobs": "jobsDrop",
        "invoices": "invoiceDrop",
        "other": "otherDrop"
    }

    if ($('#' + dropdownDict[e]).css('display') === 'none') {
        $('.headerDropDown').css('display', 'none')
        $('#' + dropdownDict[e]).slideToggle('fast').css('display', 'flex')
    }
    else {
        $('.headerDropDown').css('display', 'none')
    }

}


const fields = document.querySelectorAll('.form-control');
var globalAllData = ['test'];
for (const field of fields) {
    field.addEventListener('blur', (event) => {
        const sel = event.target;
        if ($(sel).is("select") && $(sel).val() != "") {
            $(sel).next().css({
                "top": "-9px",
                "font-size": "12px",
                "color": "#004880",
                "font-weight": "bold"
            })
        }
        else if ($(sel).is("select") && $(sel).val() == "") {
            $(sel).next().css({
                "font-size": "14px",
                "color": "grey",
                "position": "absolute",
                "top": "20px",
                "left": "0",
                "padding": "10px",
                "transition": ".2s",
                "font-weight": ""
            })
        }
        else if ($(sel).is("textarea")) {
            if ($(sel).val() != "") {
                $(sel).next().css({
                    "top": "-9px",
                    "font-size": "12px",
                    "color": "#004880",
                    "font-weight": "bold"
                })
            }
            else {
                $(sel).next().css({
                    "font-size": "14px",
                    "color": "grey",
                    "position": "absolute",
                    "top": "20px",
                    "left": "0",
                    "padding": "10px",
                    "transition": ".2s",
                    "font-weight": ""
                })

                $(sel).next().removeAttr('style');
            }
        }
        else
            if (sel.value) {
                sel.classList.add('filled');
            }
            else {
                sel.classList.remove('filled');
            }
    });
}

function qStatusTableRefresh() {
    $('#cdnTableRefresh').css('display', 'none')
    $('#cdnTableRefresh').html(`
          <table id="myTable">
                <thead>
                  <tr>
                    <th>Q No</th>
                    <th>DummyCol</th>
                    <th>DummyCol</th>
                    <th>DummyCol</th>
                    <th>DummyCol</th>
                    <th>Q Doc</th>
                    <th>Q Costing</th>
                    <th>Status</th>
                    <th>DummyCol</th>
                    <th>DummyCol</th>
                    <th>DummyCol</th>
                    <th>DummyCol</th>
                    <th>DummyCol</th>
                    <th>DummyCol</th>
                    <th>DummyCol</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody id="qStatusTableRefreshBody">
                <tr>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
                </tr>
                </tbody>
              </table>
              <button id="statusBulkMailButton" class="ripple">Bulk Mail</button>
              `)

    google.script.run.withSuccessHandler(
        function (allData) {
            console.log(allData[0])
            var hook = "https://";
            var temp = []
            for (let i = 0; i < allData.length; i++) {
                var idS = allData[i][2].split(',')
                idS = idS.map(data => data.toString())
                temp.push(`<tr id="QST` + (i + 1) + `">
                <td>`+ allData[i][0] + `</td>
                <td>`+ allData[i][1] + `</td>
                <td>`+ idS[0] + `</td>
                <td>`+ idS[1] + `</td>
                <td>`+ idS[2] + `</td>
                <td><button onclick="window.open('`+ hook + `drive.google.com/file/d/` + idS[0] + `/view','_blank')" ><ion-icon name="document-outline"></ion-icon></button></td>
                <td><button onclick="window.open('`+ hook + `drive.google.com/file/d/` + idS[2] + `/view','_blank')" ><ion-icon name="file-tray-full-outline"></ion-icon></button></td>
                <td><label class="switch" ><input onchange="verStatusChange(this,'`+ allData[i][11] + `','` + allData[i][0] + `')" type="checkbox"` + (allData[i][3] == "Verified" ? " checked" : "") + `><span class="slider round"></span></label></td>
                <td>`+ allData[i][4] + `</td>
                <td>`+ allData[i][5] + `</td>
                <td>`+ allData[i][6] + `</td>
                <td>`+ allData[i][7] + `</td>
                <td>`+ allData[i][8] + `</td>
                <td>`+ allData[i][9] + `</td>
                <td>`+ allData[i][10] + `</td>
                <td><button onclick="qStatusDetailsFetch('`+ (i + 1) + `','` + allData[i][11] + `')"><ion-icon name="open-outline"></ion-icon></button></td>
                <td>`+ allData[i][12] + `</td>
                </tr>`)
            }
            $('#qStatusTableRefreshBody').html(temp.join(''))
            $('#myTable').DataTable({
                "pageLength": 100,
                "lengthChange": false,
                "scrollResize": true,
                "scrollY": 310,
                "scrollCollapse": true,
                language: { search: "" },
                paging: true,
                pagingType: 'simple',
                columnDefs: [
                    { target: 0, visible: true },
                    { target: 1, visible: false },
                    { target: 2, visible: false },
                    { target: 3, visible: false },
                    { target: 4, visible: false },
                    { target: 5, visible: true },
                    { target: 6, visible: true },
                    { target: 7, visible: true },
                    { target: 8, visible: false },
                    { target: 9, visible: false },
                    { target: 10, visible: false },
                    { target: 11, visible: false },
                    { target: 12, visible: false },
                    { target: 13, visible: false },
                    { target: 14, visible: false },
                    { target: 15, visible: true },
                    { target: 16, visible: false },
                ],
            });

            $('#cdnTableRefresh').css('display', 'block')
        }
    ).getStatusDetails()

}

var photoOptions;

function photoListSet() {
    google.script.run.withSuccessHandler(
        function (data) {
            var temp = [];
            temp.push(`<option selected="" dsiabled="">--please select--</option>`)
            for (let i = 0; i < data.length; i++) {
                temp.push(`<option value="` + data[i][1] + `">` + data[i][0] + `</option>`)
            }
            photoOptions = temp.join('')

            var totalDescp = $('.accordion').length

            for (let i = 0; i < totalDescp; i++) {
                $('#D' + (i + 1) + 'photoSelect').html(photoOptions)
            }


        }).fetchPhotoIDS()
}

function textareaAutofills() {
    availableTags = ['Full in advance', '60% in advance\n40% after the mechanical installation completion, Prior to final electrical connection and remote handover', '50% advance and 50% after production completion and prior to installation ']

    $("#PaymentInp").autocomplete({
        source: availableTags
    });

    availableTags = ['One years for any technical defects from the date of installation.']

    $("#gauranteeInp").autocomplete({
        source: availableTags
    });

    availableTags = ['PRICE INCLUDES MS POST SUPPORT 100 x 100 x 2 mm - ',
        'PRICE INCLUDES MS POST SUPPORT 100 x 100 x 3 mm - ']

    $("#additional1ContentInp").autocomplete({
        source: availableTags
    });




}

//Script for main tabs page
// photoListSet()
// textAreaListTrigger()
// qStatusTableRefresh()
textareaAutofills()

function openPage(pageName, elmnt, color) {
    $('.tabcontent').css('display', 'none')
    $('.tablink').css({ "background-color": "", "color": "#008de9" })

    $(elmnt).css({ "background-color": color, "color": "white" })
    $('#' + pageName).css("display", "block")
}

/** script for new tab **/
listsUpdate()




function accordionListner(id) {
    console.log('running')
    if ($('#panel' + id + '0').css('display') === "flex") {
        $('#panel' + id + '0').slideUp()
        $('#panel' + id + '1').slideUp()
        $('#panel' + id + '2').slideUp()
        $('#panel' + id + '3').slideUp()
    } else {
        $('#panel' + id + '0').slideDown().css('display', 'flex')
        $('#panel' + id + '1').slideDown().css('display', 'flex')
        $('#panel' + id + '2').slideDown().css({ display: 'flex', overflow: 'auto' })
        $('#panel' + id + '3').slideDown().css('display', 'flex')
    }
}
function accordionNewAdd(id) {
    $('#addButton' + id).css('display', 'none')
    $('#removeButton' + id).css('display', 'none')
    $('#DescriptionMainDiv').append(`

                <div id="description`+ (id + 1) + `">
                  <div  style="display: flex;align-items: center;">
                    <button id="addButton`+ (id + 1) + `" class="ExpandButton" onclick="accordionNewAdd(` + (id + 1) + `)"><ion-icon name="add-circle"></ion-icon></button>
                    <button class="accordion ripple" onclick="accordionListner(`+ (id + 1) + `)">Description ` + (id + 1) + `</button>
                    `+ (id == 0 ? ``
            :
            `<button id="removeButton` + (id + 1) + `" class="ExpandButton" onclick="accordionNewRemove(` + (id + 1) + `)"><ion-icon name="remove-circle"></ion-icon></button>`
        ) + `
                  </div>
                  <div id="panel`+ (id + 1) + `0" class="panel0">
                  <table class="descriptionNew MaterialDescription">
                  <thead>
                    <tr>
                      <th  colspan="5">Material Description</th>
                    </tr>
                    <tr>
                      <th contenteditable="true" id="optionItem`+ (id + 1) + `0">OPTION</th>
                      <th contenteditable="true" id="optionItem`+ (id + 1) + `1">` + (id + 1) + `</th>
                      <th><select id="D`+ (id + 1) + `Select1" onchange="descriptionSwitch('` + (id + 1) + `')">
                      <option disabled selected value> -- select an option -- </option>
                        <option value="1" >Aluminium Single Skin 80 x 1.2 mm</option>
                        <option value="2" >Aluminium Double Skin Insulated 78 x 1.4 mm</option>
                        <option value="3" >0.58 mm steel corrugated</option>
                        <option value="4" >0.50 mm steel corrugated</option>
                        <option value="5" >Heavy Duty Polycarbonate shutter</option>
                        <option value="6" >Medium Duty Polycarbonate shutter</option>
                        <option value="7" >Aluminium Grill Type</option>
                        <option value="8" >GI 0.8 mm Micro Perforated</option>
                        <option value="9" >GI 1.0 mm Micro Perforated</option>
                        <option value="10" >GI 0.8 mm Non-Micro Perforated</option>
                        <option value="11" >GI 1.0 mm Non-Micro Perforated</option>
                        </select>
                      </th>
                      <th><select id="D`+ (id + 1) + `Select2" onchange="descriptionSwitch('` + (id + 1) + `')">
                      <option disabled selected value> -- select an option -- </option>
                        <option value="1" >High Quality Side Mounted Motor</option>
                        <option value="2" >European make Center Motor</option>
                        <option value="3">Manual Push-Up</option>
                        <option value="4">Manual Chain-Pully</option>
                        </select>
                      </th>
                      <th>
                          <select id="D`+ (id + 1) + `photoSelect" onchange="photoChange('` + (id + 1) + `')">
                          `+ photoOptions + `
                          </select>
                        </th>
                    </tr>
                  </thead>
                  <tbody id="DDTB">
                    <tr>
                    <td id="D`+ (id + 1) + `Selected" colspan="3" style="padding: 0;background: #f1f1f1;"><textarea style="width: -webkit-fill-available; padding: 5px; background: rgb(241, 241, 241); resize: vertical;"></textarea></td>
                    <td id="D`+ (id + 1) + `Photo" colspan="2" style="text-align: center;background-color: #f1f1f1;color: #6a6a6a;"><ion-icon name="image-outline"></ion-icon></td>
                    </tr>
                  </tbody>
                </table>
                </div>
                <div id="panel`+ (id + 1) + `1" class="panel1">
                  <table class="descriptionNew">
                  <thead>
                    <tr>
                      <th>S#</th>
                      <th>C</th>
                      <th>E</th>
                      <th colspan="2">Opening size/Scope of Work</th>
                      <th>Price&nbsp;&nbsp;<input id="D`+ (id + 1) + `PCheck" type="checkbox" checked></th>
                      <th>Qty&nbsp;&nbsp;<input id="D`+ (id + 1) + `QCheck" type="checkbox" checked></th>
                      <th>Total</th>
                      <th>+/-</th>
                    </tr>
                  </thead>
                  <tbody id="D`+ (id + 1) + `TB">
                    <tr id="D`+ (id + 1) + `TR1">
                      <td>1</td>
                      <td id="D`+ (id + 1) + `TR1CB"><button class="customizeDescButton" onclick="customizeDescOn(` + (id + 1) + `1)"><ion-icon name="create-outline"></ion-icon></button></td>
                      <td><input id="D`+ (id + 1) + `TR1ECheck" type="checkbox"></td>
                      <td id="D`+ (id + 1) + `TR1W" contenteditable="true"></td>
                      <td id="D`+ (id + 1) + `TR1H" contenteditable="true"></td>
                      <td id="D`+ (id + 1) + `TR1Q" contenteditable="true" oninput="dimensionCalc(` + (id + 1) + `1)" style="text-align: right;"></td>
                      <td id="D`+ (id + 1) + `TR1A" contenteditable="true" oninput="dimensionCalc(` + (id + 1) + `1)"></td>
                      <td id="D`+ (id + 1) + `TR1T" style="text-align: right;"></td>
                      <td id="D`+ (id + 1) + `TR1AR">
                        <button class="rowAddButton" onclick="rowAddButtonClick(`+ (id + 1) + `1)"><ion-icon name="add-circle-outline"></ion-icon></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                </div>
                <div id="panel`+ (id + 1) + `2" class="panel2">
                <table class="descriptionNew">
                  <tbody id="D`+ (id + 1) + `TTB">
                    <tr id="D`+ (id + 1) + `TTR1">
                      <th colspan="3">Total</th>
                      <td></td>
                      <td style="text-align: right;"></td>
                    </tr>
                    <tr id="D`+ (id + 1) + `TTR2">
                      <th colspan="3">Vat @ 10%</th>
                      <td></td>
                      <td style="text-align: right;"></td>
                    </tr>
                    <tr id="D`+ (id + 1) + `TTR3">
                      <th colspan="3"><button onclick="specialPriceOn(`+ (id + 1) + `)"><ion-icon name="git-compare-outline"></ion-icon></button>&nbsp;&nbsp;Grand Total</th>
                      <td></td>
                      <td style="text-align: right;"></td>
                    </tr>
                    <tr id="D`+ (id + 1) + `TTR4">
                      <td colspan="5"></td>
                    </tr>
                  </tbody>
                </table>
                </div>

                <div id="panel`+ (id + 1) + `3" class="panel2">


                 <table class="descriptionNew">
                  <thead>
                    <tr>
                      <th colspan="3">Costing</th>
                    </tr>
                  </thead>
                  <tbody id="costingBodyD`+ (id + 1) + `">
                    <tr id="D`+ (id + 1) + `CR1">
                      <th>Material, Manpower, and other Cost</th> <td></td> <td></td>
                    </tr>
                    <tr id="D`+ (id + 1) + `CR2">
                      <th>Discount Margin</th> <td contenteditable="true" oninput="marginCalC(`+ (id + 1) + `)">10.00</td> <td></td>
                    </tr>
                    <tr id="D`+ (id + 1) + `CR3">
                      <th>Discount Given</th> <td></td> <td style="text-align: right;"></td>
                    </tr>
                    <tr id="D`+ (id + 1) + `CR4">
                      <th>Profit Margin</th> <td contenteditable="true" oninput="marginCalC(`+ (id + 1) + `)">30.00</td> <td style="text-align: right;"></td>
                    </tr>
                    <tr id="D`+ (id + 1) + `CR5">
                      <th>Total</th> <td></td> <td style="text-align: right;"></td>
                    </tr>
                    <tr id="D`+ (id + 1) + `CR6">
                      <th>VAT</th> <td>10%</td> <td style="text-align: right;"></td>
                    </tr>
                    <tr id="D`+ (id + 1) + `CR7">
                      <th>Grand Total</th> <td></td> <td style="text-align: right;"></td>
                    </tr>
                  </tbody>
                </table>




                </div>


                </div>

                `)
}

function accordionNewRemove(id) {
    $('#description' + id).remove()
    $('#addButton' + (id - 1)).css('display', 'block')
    $('#removeButton' + (id - 1)).css('display', 'block')
}

function dimensionCalc(tagIdClub) {
    var tagId = tagIdClub.toString().length == 2 ? parseInt(tagIdClub % 10, 10) : parseInt(tagIdClub % 100, 10)
    var descriptionTagId = tagIdClub.toString().length == 2 ? parseInt(tagIdClub / 10, 10) : parseInt(tagIdClub / 100, 10)
    $('#D' + descriptionTagId + 'TR' + tagId + `T`).html(parseFloat(
        parseFloat($('#D' + descriptionTagId + 'TR' + tagId + 'Q').text()) * parseInt($('#D' + descriptionTagId + 'TR' + tagId + 'A').text(), 10)).toFixed(2))

    var tableLen = $('#D' + descriptionTagId + 'TB').find('tr').length;
    var totalTableLen = $('#D' + descriptionTagId + 'TTB').find('tr').length;
    var totalCount = 0;
    var totalPrice = 0;

    for (var i = 0; i < tableLen; i++) {
        totalCount += parseInt($('#D' + descriptionTagId + 'TR' + (i + 1) + 'A').text(), 10)
        totalPrice += parseFloat($('#D' + descriptionTagId + 'TR' + (i + 1) + 'T').text())
    }


    if (totalTableLen > 4) {
        $($('#D' + descriptionTagId + 'TTR1').find('td')[0]).html(totalCount)
        $($('#D' + descriptionTagId + 'TTR1').find('td')[1]).html(parseFloat(totalPrice).toFixed(3))

        totalPrice = parseFloat($($('#D' + descriptionTagId + 'TTR2').find('td')[1]).text())
        totalPrice = totalPrice.toFixed(3);
        var finalPrice = parseFloat(totalPrice) + totalPrice * .1
        finalPrice = finalPrice.toFixed(3);
        var wholePrice = parseInt(finalPrice, 10);
        var decimalPrice = parseInt(finalPrice.toString().slice((finalPrice).toString().indexOf('.') + 1), 10)

        $($('#D' + descriptionTagId + 'TTR3').find('td')[1]).html((totalPrice * .1).toFixed(3))
        $($('#D' + descriptionTagId + 'TTR4').find('td')[0]).html(totalCount)
        $($('#D' + descriptionTagId + 'TTR4').find('td')[1]).html(finalPrice)

        if (decimalPrice == 0) {
            $($('#D' + descriptionTagId + 'TTR5').find('td')[0]).html("(" + Number2words(wholePrice).replace(" and Fils ", " ") + "ONLY)")
        }
        else {
            $($('#D' + descriptionTagId + 'TTR5').find('td')[0]).html("(" + Number2words(wholePrice) + decimalPrice + "/1000 ONLY)")
        }
    }
    else {
        totalPrice = totalPrice.toFixed(3);
        var finalPrice = parseFloat(totalPrice) + totalPrice * .1
        finalPrice = finalPrice.toFixed(3);
        var wholePrice = parseInt(finalPrice, 10);
        var decimalPrice = parseInt(finalPrice.toString().slice((finalPrice).toString().indexOf('.') + 1), 10)



        $($('#D' + descriptionTagId + 'TTR1').find('td')[0]).html(totalCount)
        $($('#D' + descriptionTagId + 'TTR1').find('td')[1]).html(totalPrice)
        $($('#D' + descriptionTagId + 'TTR2').find('td')[1]).html((totalPrice * .1).toFixed(3))
        $($('#D' + descriptionTagId + 'TTR3').find('td')[0]).html(totalCount)
        $($('#D' + descriptionTagId + 'TTR3').find('td')[1]).html(finalPrice)

        if (decimalPrice == 0) {
            $($('#D' + descriptionTagId + 'TTR4').find('td')[0]).html("(" + Number2words(wholePrice).replace(" and Fils ", " ") + "ONLY)")
        }
        else {
            $($('#D' + descriptionTagId + 'TTR4').find('td')[0]).html("(" + Number2words(wholePrice) + decimalPrice + "/1000 ONLY)")
        }

    }
    marginCalC(descriptionTagId)

}

function rowAddButtonClick(tagIdClub) {
    var tagId = tagIdClub.toString().length == 2 ? parseInt(tagIdClub % 10, 10) : parseInt(tagIdClub % 100, 10)
    var descriptionTagId = tagIdClub.toString().length == 2 ? parseInt(tagIdClub / 10, 10) : parseInt(tagIdClub / 100, 10)
    $('#D' + descriptionTagId + 'TR' + tagId + 'AR').html(`<button class="rowAddButton"><ion-icon name="lock-closed-outline"></ion-icon></button>`)
    $('#D' + descriptionTagId + 'TB').append(`<tr id="D` + descriptionTagId + 'TR' + (tagId + 1) + `">
                <td>`+ (tagId + 1) + `</td>
                <td id="D`+ descriptionTagId + `TR` + (tagId + 1) + `CB"><button class="customizeDescButton" onclick="customizeDescOn(` + descriptionTagId.toString() + (tagId + 1) + `)"><input id="D` + descriptionTagId + `TR` + (tagId + 1) + `CBH" class="hiddenCheckBox" type="checkbox"><ion-icon name="create-outline"></ion-icon></button></td>
                <td><input id="D`+ descriptionTagId + `TR` + (tagId + 1) + `ECheck" type="checkbox">
                <td id="D`+ descriptionTagId + 'TR' + (tagId + 1) + `W" contenteditable="true"></td>
                <td id="D`+ descriptionTagId + 'TR' + (tagId + 1) + `H" contenteditable="true"></td>
                <td id="D`+ descriptionTagId + 'TR' + (tagId + 1) + `Q" contenteditable="true" oninput="dimensionCalc(` + descriptionTagId.toString() + (tagId + 1) + `)" style="text-align: right;"></td>
                <td id="D`+ descriptionTagId + 'TR' + (tagId + 1) + `A" contenteditable="true" oninput="dimensionCalc(` + descriptionTagId.toString() + (tagId + 1) + `)"></td>
                <td id="D`+ descriptionTagId + 'TR' + (tagId + 1) + `T" style="text-align: right;"></td>
                <td id="D`+ descriptionTagId + 'TR' + (tagId + 1) + `AR">
                  <button class="rowAddButton" onclick="rowAddButtonClick(`+ (descriptionTagId).toString() + (tagId + 1) + `)"><ion-icon name="add-circle-outline"></ion-icon></button><button class="rowAddButton" onclick="rowRemoveButtonClick(` + (descriptionTagId).toString() + (tagId + 1) + `)"><ion-icon name="remove-circle-outline"></ion-icon></button>
                </td></tr>`)
}
function rowRemoveButtonClick(tagIdClub) {
    var tagId = tagIdClub.toString().length == 2 ? parseInt(tagIdClub % 10, 10) : parseInt(tagIdClub % 100, 10)
    var descriptionTagId = tagIdClub.toString().length == 2 ? parseInt(tagIdClub / 10, 10) : parseInt(tagIdClub / 100, 10)

    $('#D' + descriptionTagId + 'TR' + tagId).remove()
    if (tagId == 2) {
        $('#D' + descriptionTagId + 'TR' + (tagId - 1) + 'AR').html(
            `<button class="rowAddButton" onclick="rowAddButtonClick(` + (descriptionTagId).toString() + (tagId - 1) + `)">
                <ion-icon name="add-circle-outline"></ion-icon></button>` )

        dimensionCalc((descriptionTagId).toString() + (tagId - 1))
    }
    else {
        $('#D' + descriptionTagId + 'TR' + (tagId - 1) + 'AR').html(
            `<button class="rowAddButton" onclick="rowAddButtonClick(` + (descriptionTagId).toString() + (tagId - 1) + `)">
                <ion-icon name="add-circle-outline"></ion-icon></button>
                <button class="rowAddButton" onclick="rowRemoveButtonClick(`+ (descriptionTagId).toString() + (tagId - 1) + `)">
                <ion-icon name="remove-circle-outline"></ion-icon></button>`
        )
    }
    dimensionCalc('11')
}

function customizeDescOn(tagIdClub) {
    var tagId = tagIdClub.toString().length == 2 ? parseInt(tagIdClub % 10, 10) : parseInt(tagIdClub % 100, 10)
    var descriptionTagId = tagIdClub.toString().length == 2 ? parseInt(tagIdClub / 10, 10) : parseInt(tagIdClub / 100, 10)
    $('#D' + descriptionTagId + 'TR' + tagId + 'CB').html(`<button class="customizeDescButton customizeDescButtonOff" onclick="customizeDescOff(` + descriptionTagId.toString() + tagId + `)"><ion-icon name="stop-circle-outline"></ion-icon></button><input id="D` + descriptionTagId + `TR` + tagId + `CBH" class="hiddenCheckBox" type="checkbox" checked>`)

    $('#D' + descriptionTagId + 'TR' + tagId + 'H').remove()
    $('#D' + descriptionTagId + 'TR' + tagId + 'W').attr('colspan', 2).css('padding', '0px')
    $('#D' + descriptionTagId + 'TR' + tagId + 'W').html(`<textarea style="width: -webkit-fill-available; padding: 5px; resize: vertical;"></textarea>`)
}

function customizeDescOff(tagIdClub) {
    var tagId = tagIdClub.toString().length == 2 ? parseInt(tagIdClub % 10, 10) : parseInt(tagIdClub % 100, 10)
    var descriptionTagId = tagIdClub.toString().length == 2 ? parseInt(tagIdClub / 10, 10) : parseInt(tagIdClub / 100, 10)
    $('#D' + descriptionTagId + 'TR' + tagId + 'CB').html(`<button class="customizeDescButton" onclick="customizeDescOn(` + descriptionTagId.toString() + tagId + `)"><ion-icon name="create-outline"></ion-icon></button><input id="D` + descriptionTagId + `TR` + tagId + `CBH" class="hiddenCheckBox" type="checkbox">`)

    $('#D' + descriptionTagId + 'TR' + tagId + 'W').attr('colspan', 1).html('').css('padding', '').after(`<td id="D` + descriptionTagId + `TR` + tagId + `H" contenteditable="true"></td>`)
}

function specialPriceOn(descriptionTagId) {
    $('#D' + descriptionTagId + 'TTR4').attr('id', 'D' + descriptionTagId + 'TTR5')
    $('#D' + descriptionTagId + 'TTR3').attr('id', 'D' + descriptionTagId + 'TTR4')
    $('#D' + descriptionTagId + 'TTR2').attr('id', 'D' + descriptionTagId + 'TTR3')


    $('#D' + descriptionTagId + 'TTR1').after(`
            <tr id="D`+ descriptionTagId + `TTR2">
              <th colspan="3">SPECIAL PRICE</th>
              <td></td>
              <td contenteditable="true" oninput="splPriceCalc(`+ descriptionTagId + `)"></td>
            </tr>`)

    $('#D' + descriptionTagId + 'TTR4').html(`
              <th colspan="3"><button onclick="specialPriceOff(`+ descriptionTagId + `)">
              <ion-icon name="git-commit-outline"></ion-icon></button>&nbsp;&nbsp;Grand Total</th>
              <td></td>
              <td style="text-align:right;"></td>
            `)
}
function specialPriceOff(descriptionTagId) {
    $('#D' + descriptionTagId + 'TTR2').remove()
    $('#D' + descriptionTagId + 'TTR3').attr('id', 'D' + descriptionTagId + 'TTR2')
    $('#D' + descriptionTagId + 'TTR4').attr('id', 'D' + descriptionTagId + 'TTR3')
    $('#D' + descriptionTagId + 'TTR5').attr('id', 'D' + descriptionTagId + 'TTR4')

    $('#D' + descriptionTagId + 'TTR3').html(`
                <th colspan="3"><button onclick="specialPriceOn(`+ descriptionTagId + `)">
                <ion-icon name="git-compare-outline"></ion-icon></button>&nbsp;&nbsp;Grand Total</th>
                <td></td>
                <td style="text-align:right;"></td>`)
    var tableLen = $('#D' + descriptionTagId + 'TB').find('tr').length;
    var totalTableLen = $('#D' + descriptionTagId + 'TTB').find('tr').length;
    var totalCount = 0;
    var totalPrice = 0;

    for (var i = 0; i < tableLen; i++) {
        totalCount += parseInt($('#D' + descriptionTagId + 'TR' + (i + 1) + 'A').text(), 10)
        totalPrice += parseInt($('#D' + descriptionTagId + 'TR' + (i + 1) + 'T').text(), 10)
    }

    var finalPrice = totalPrice + totalPrice * 0.1;
    var wholePrice = parseInt(finalPrice, 10);
    var decimalCheck = (finalPrice).toString().indexOf('.')
    var decimalPrice = decimalCheck == -1 ? 0 : parseInt(finalPrice.toString().slice((finalPrice).toString().indexOf('.') + 1), 10)


    $($('#D' + descriptionTagId + 'TTR1').find('td')[0]).html(totalCount)
    $($('#D' + descriptionTagId + 'TTR1').find('td')[1]).html(parseFloat(totalPrice).toFixed(3))
    $($('#D' + descriptionTagId + 'TTR2').find('td')[1]).html(parseFloat(totalPrice * .1).toFixed(3))
    $($('#D' + descriptionTagId + 'TTR3').find('td')[0]).html(totalCount)
    $($('#D' + descriptionTagId + 'TTR3').find('td')[1]).html(parseFloat(finalPrice).toFixed(3))

    if (decimalPrice == 0) {
        $($('#D' + descriptionTagId + 'TTR4').find('td')[0]).html("(" + Number2words(wholePrice).replace(" and Fils ", " ") + "ONLY)")
    }
    else {
        $($('#D' + descriptionTagId + 'TTR4').find('td')[0]).html("(" + Number2words(wholePrice) + decimalPrice + "/1000 ONLY)")
    }

    marginCalC(descriptionTagId)

}
function splPriceCalc(descriptionTagId) {
    var splPrice = parseFloat($($('#D' + descriptionTagId + 'TTR2').find('td')[1]).text())
    var finalPrice = splPrice + splPrice * 0.1;
    finalPrice = parseFloat(finalPrice).toFixed(3)
    var wholePrice = parseInt(finalPrice, 10);
    var decimalPrice = parseInt(finalPrice.toString().slice((finalPrice).toString().indexOf('.') + 1), 10)

    $($('#D' + descriptionTagId + 'TTR3').find('td')[1]).html((splPrice * .1).toFixed(3))
    $($('#D' + descriptionTagId + 'TTR4').find('td')[0]).html($($('#D' + descriptionTagId + 'TTR1').find('td')[0]).text())
    $($('#D' + descriptionTagId + 'TTR4').find('td')[1]).html(finalPrice)


    if (decimalPrice == 0) {
        $($('#D' + descriptionTagId + 'TTR5').find('td')[0]).html("(" + Number2words(wholePrice).replace(" and Fils ", " ") + "ONLY)")
    }
    else {
        $($('#D' + descriptionTagId + 'TTR5').find('td')[0]).html("(" + Number2words(wholePrice) + decimalPrice + "/1000 ONLY)")
    }
    marginCalC(descriptionTagId)

}

function descriptionSwitch(descriptionTagId) {
    var select1Val = $('#D' + descriptionTagId + 'Select1').val();
    var select2Val = $('#D' + descriptionTagId + 'Select2').val();
    switch (select1Val + select2Val) {
        case ("11"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Aluminium Single Skin 80 x 1.2 mm thick slat profile rolling shutter powder coated to standard RAL color. The rolling shutter is electrically operated by using High Quality Side Mounted Motor with 1 No. Push Button, 2 Nos. remote controls and Manual Chain Operation in case of power failure per shutter')
                break;
            }
        case ("12"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Aluminium Single Skin 80 x1.2 mm thick slat profile rolling shutter powder coated to standard RAL color. The rolling shutter is electrically operated by using European make Center Motor with 1 No. Key switch, 2 Nos. remote controls and Manual declutch in case of power failure per shutter');
                break;
            }
        case ("13"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Aluminium Single Skin 80 x1.2 mm thick slat profile rolling shutter powder coated to standard RAL color. The rolling shutter is Manually operated by using Manual Hand Push-Up Operation.');
                break;
            }
        case ("14"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Aluminium Single Skin 80 x1.2 mm thick slat profile rolling shutter powder coated to standard RAL color. The rolling shutter is Manually operated by using Chain-Pully System.');
                break;
            }
        case ("21"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Aluminium Double Skin Insulated 78 x 1.4 mm thick slat profile rolling shutter powder coated to standard RAL color. The rolling shutter is electrically operated by using High Quality Side Mounted Motor with 1 No. Push Button, 2 Nos. remote controls and Manual Chain Operation in case of power failure per shutter');
                break;
            }
        case ("22"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Aluminium Double Skin Insulated 78 x 1.4 mm thick slat profile rolling shutter powder coated to standard RAL color. The rolling shutter is electrically operated by using European make Center Motor with 1 No. Key switch, 2 Nos. remote controls and Manual declutch in case of power failure per shutter');
                break;
            }
        case ("23"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Aluminium Double Skin Insulated 78 x 1.4 mm thick slat profile rolling shutter powder coated to standard RAL color. The rolling shutter is Manually operated by using Manual Hand Push-Up Operation.');
                break;
            }
        case ("24"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Aluminium Double Skin Insulated 78 x 1.4 mm thick slat profile rolling shutter powder coated to standard RAL color. The rolling shutter is Manually operated by using Chain-Pully System.');
                break;
            }
        case ("31"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured 0.58 mm steel corrugated thick Panel profile Garage rolling shutter, prepainted to RAL 1015 or 1019. The rolling shutter is electrically operated by using High Quality Side Mounted Motor with 1 No. Push Button, 2 Nos. remote controls and Manual Chain Operation in case of power failure per shutter');
                break;
            }
        case ("32"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured 0.58 mm steel corrugated thick Panel profile Garage rolling shutter, prepainted to RAL 1015 or 1019. The rolling shutter is electrically operated by using European make Center Motor with 1 No. Key Switch, 2 Nos. remote controls and Manual Hand declutch in case of power failure per shutter');
                break;
            }
        case ("33"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured 0.58 mm steel corrugated thick Panel profile Garage rolling shutter, prepainted to RAL 1015 or 1019. The rolling shutter is Manually operated by using Manual Hand Push-Up Operation.');
                break;
            }
        case ("34"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured 0.58 mm steel corrugated thick Panel profile Garage rolling shutter, prepainted to RAL 1015 or 1019. The rolling shutter is Manually operated by using Chain-Pully System.');
                break;
            }
        case ("41"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured 0.50 mm steel corrugated thick Panel profile Garage rolling shutter, prepainted to RAL 1013 or 9003. The rolling shutter is electrically operated by using High Quality Side Mounted Motor with 1 No. Push Button, 2 Nos. remote controls and Manual Chain Operation in case of power failure per shutter');
                break;
            }
        case ("42"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured 0.50 mm steel corrugated thick Panel profile Garage rolling shutter, prepainted to RAL 1013 or 9003. The rolling shutter is electrically operated by using European make Center Motor with 1 No. Key Switch, 2 Nos. remote controls and Manual Hand declutch in case of power failure per shutter');
                break;
            }
        case ("43"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured 0.50 mm steel corrugated thick Panel profile Garage rolling shutter, prepainted to RAL 1013 or 9003. The rolling shutter is Manually operated by using Manual Hand Push-Up Operation.');
                break;
            }
        case ("44"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured 0.50 mm steel corrugated thick Panel profile Garage rolling shutter, prepainted to RAL 1013 or 9003. The rolling shutter is Manually operated by using Chain-Pully System.');
                break;
            }
        case ("51"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Heavy Duty Polycarbonate shutter, the bottom and guide rails powder coated to Standard RAL color. The rolling shutter is electrically operated by using High Quality Side Mounted Motor with 1 No. Push Button, 2 Nos. remote controls and Manual Chain Operation in case of power failure per shutter.');
                break;
            }
        case ("52"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Heavy Duty Polycarbonate shutter, the bottom and guide rails powder coated to Standard RAL color. The rolling shutter is electrically operated by using European make Center Motor with 1 No. Key Switch, 2 Nos. remote controls and Manual Hand declutch in case of power failure per shutter');
                break;
            }
        case ("53"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Heavy Duty Polycarbonate shutter, the bottom and guide rails powder coated to Standard RAL color. The rolling shutter is Manually operated by using Manual Hand Push-Up Operation.');
                break;
            }
        case ("54"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Heavy Duty Polycarbonate shutter, the bottom and guide rails powder coated to Standard RAL color. The rolling shutter is Manually operated by using Chain-Pully System.');
                break;
            }
        case ("61"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Manufactured Medium Duty Polycarbonate shutter. The bottom and guide rails powder coated to Standard RAL color. The rolling shutter is electrically operated by using High Quality Side Mounted Motor with 1 No. Push Button, 2 Nos. remote controls and Manual Chain Operation in case of power failure per shutter.');
                break;
            }
        case ("62"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Manufactured Medium Duty Polycarbonate shutter. The bottom and guide rails powder coated to Standard RAL color. The rolling shutter is electrically operated by using European make Center Motor with 1 No. Key Switch, 2 Nos. remote controls and Manual Hand declutch in case of power failure per shutter');
                break;
            }
        case ("63"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Manufactured Medium Duty Polycarbonate shutter. The bottom and guide rails powder coated to Standard RAL color. The rolling shutter is Manually operated by using Manual Hand Push-Up Operation.');
                break;
            }
        case ("64"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Manufactured Medium Duty Polycarbonate shutter. The bottom and guide rails powder coated to Standard RAL color.  The rolling shutter is Manually operated by using Chain-Pully System.');
                break;
            }
        case ("71"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured Aluminium Grill Type Rolling shutter with Silver Iodized finish.The rolling shutter is electrically operated by using High Quality Side Mounted Motor with 1 No. Push Button, 2 Nos. remote controls and Manual Chain Operation in case of power failure per shutter.');
                break;
            }
        case ("72"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured Aluminium Grill Type Rolling shutter with Silver Iodized finish. The rolling shutter is electrically operated by using European make Center Motor with 1 No. Key Switch, 2 Nos. remote controls and Manual Hand declutch in case of power failure per shutter');
                break;
            }
        case ("73"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured Aluminium Grill Type Rolling shutter with Silver Iodized finish. The rolling shutter is Manually operated by using Manual Hand Push-Up Operation.');
                break;
            }
        case ("74"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured Aluminium Grill Type Rolling shutter with Silver Iodized finish. The rolling shutter is Manually operated by using Chain-Pully System.');
                break;
            }
        case ("81"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured GI Micro Perforated 0.8mm thick slat profile rolling shutter powder coated to standard RAL color. The rolling shutter is electrically operated by using High Quality Side Mounted Motor with 1 No. Push Button, 2 Nos. remote controls and Manual Chain Operation in case of power failure per shutter');
                break;
            }
        case ("82"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured GI Micro Perforated 0.8 mm thick slat profile rolling shutter powder coated to standard RAL color. The rolling shutter is electrically operated by using European make Center Motor with 1 No. Key switch, 2 Nos. remote controls and Manual declutch in case of power failure per shutter');
                break;
            }
        case ("83"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured GI Micro Perforated 0.8 mm thick slat profile rolling shutter powder coated to standard RAL color. The rolling shutter is Manually operated by using Manual Hand Push-Up Operation.');
                break;
            }
        case ("84"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured GI Micro Perforated 0.8 mm thick slat profile rolling shutter powder coated to standard RAL color. The rolling shutter is Manually operated by using Chain-Pully System.');
                break;
            }
        case ("91"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured GI Micro Perforated 1.0 mm thick slat profile rolling shutter powder coated to standard RAL color. The rolling shutter is electrically operated by using High Quality Side Mounted Motor with 1 No. Push Button, 2 Nos. remote controls and Manual Chain Operation in case of power failure per shutter');
                break;
            }
        case ("92"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured GI Micro Perforated 1.0 mm thick slat profile rolling shutter powder coated to standard RAL color. The rolling shutter is electrically operated by using European make Center Motor with 1 No. Key switch, 2 Nos. remote controls and Manual declutch in case of power failure per shutter');
                break;
            }
        case ("93"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured GI Micro Perforated 1.0 mm thick slat profile rolling shutter powder coated to standard RAL color. The rolling shutter is Manually operated by using Manual Hand Push-Up Operation.');
                break;
            }
        case ("94"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured GI Micro Perforated 1.0 mm thick slat profile rolling shutter powder coated to standard RAL color. The rolling shutter is Manually operated by using Chain-Pully System.');
                break;
            }
        case ("101"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured GI 0.8mm thick  closed curved type slat profile rolling shutter powder coated to standard RAL color. The rolling shutter is electrically operated by using High Quality Side Mounted Motor with 1 No. Push Button, 2 Nos. remote controls and Manual Chain Operation in case of power failure per shutter');
                break;
            }
        case ("102"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured GI 0.8 mm thick closed curved type slat profile rolling shutter powder coated to standard RAL color. The rolling shutter is electrically operated by using European make Center Motor with 1 No. Key switch, 2 Nos. remote controls and Manual declutch in case of power failure per shutter');
                break;
            }
        case ("103"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured GI 0.8 mm thick closed curved type slat profile rolling shutter powder coated to standard RAL color.  The rolling shutter is Manually operated by using Manual Hand Push-Up Operation.');
                break;
            }
        case ("104"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured GI 0.8 mm thick closed curved type slat profile rolling shutter powder coated to standard RAL color. The rolling shutter is Manually operated by using Chain-Pully System.');
                break;
            }
        case ("111"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured GI 1.0 mm thick closed curved type slat profile rolling shutter powder coated to standard RAL color. The rolling shutter is electrically operated by using High Quality Side Mounted Motor with 1 No. Push Button, 2 Nos. remote controls and Manual Chain Operation in case of power failure per shutter');
                break;
            }
        case ("112"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured GI 1.0 mm thick closed curved type  slat profile rolling shutter powder coated to standard RAL color. The rolling shutter is electrically operated by using European make Center Motor with 1 No. Key switch, 2 Nos. remote controls and Manual declutch in case of power failure per shutter');
                break;
            }
        case ("113"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured GI 1.0 mm thick closed curved type  slat profile rolling shutter powder coated to standard RAL color. The rolling shutter is Manually operated by using Manual Hand Push-Up Operation.');
                break;
            }
        case ("114"):
            {
                $('#D' + descriptionTagId + 'Selected').find('textarea').eq(0).html('Supply and Installation of Locally Manufactured GI 1.0 mm thick closed curved type  slat profile rolling shutter powder coated to standard RAL color. The rolling shutter is Manually operated by using Chain-Pully System.');
                break;
            }
    }
}

function openTermsModalDialogue() {
    $('#CustomizeTerms').show(300).css('display', 'flex').dequeue().animate({ top: '0', left: '0' });
}


function listsUpdate() {
    // qNoListUpdateClient()
    //  clientNameListUpdateClient()
    dateSetNew(new Date())

}

function qNoListUpdateClient() {
    google.script.run.withSuccessHandler(function (list) {
        $('#QnoList').html(list)
    }).qNoListUpdateServer()
}

function clientNameListUpdateClient() {
    google.script.run.withSuccessHandler(function (list) {
        $('#ClientNameList').html(list)
    }).clientNameListUpdateServer()
}


function contactPersonListUpdateClient() {
    $("#ContactPersonListInp").prop('disabled', true);
    var name = $("#ClientNameListInp").val()
    google.script.run.withSuccessHandler(function (list) {
        $('#ContactPersonList').html(list)
        $("#ContactPersonListInp").prop('disabled', false);
    }).contactPersonListUpdateServer(name)
}

function contactNoListUpdateClient() {
    $("#ContactNumberListInp").prop('disabled', true);
    google.script.run.withSuccessHandler(function (list) {
        $('#ContactNumberList').html(list)
        $("#ContactNumberListInp").prop('disabled', false);
    }).contactNoListUpdateServer($("#ContactPersonListInp").val())
}

function rfqSubjectListUpdateClient() {
    $("#MailSubjectLineInp").prop('disabled', true)
    var choice = $("#mailTypeSelect").find(":selected").text()
    if (choice == "Reply") {
        google.script.run.withSuccessHandler(function (list) {
            $('#MailSubjectLine').html(list)
            $("#MailSubjectLineInp").prop('disabled', false)
        }).rfqSubjectListUpdateServer()
    }
    else { $("#MailSubjectLineInp").prop('disabled', false) }
}

function emailListUpdateClient() {
    $("#EmailListInp").prop('disabled', true)

    if ($("#mailTypeSelect").find(":selected").text() == "Reply") {
        google.script.run.withSuccessHandler(function (list) {
            $('#EmailList').html(list)
            $("#EmailListInp").prop('disabled', false)
        }).emailListUpdateServer($("#MailSubjectLineInp").val())

    }
    else {
        google.script.run.withSuccessHandler(function (list) {
            $('#EmailList').html(list)
            $("#EmailListInp").prop('disabled', false)
        }).emailListUpdateServerNonRfq($("#ContactNumberListInp").val())

    }

}

function Number2words(input) {

    var a, b, c, d, e, output, outputA, outputB, outputC, outputD, outputE;

    var ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

    if (input === 0) { // Zero

        output = "Bahraini Dinars Zero and Fils ";////Rupee

    } else if (input == 1) { // One

        output = "Bahraini Dinars One and Fils "; //Rupee

    } else { // More than one

        // Tens
        a = input % 100;
        outputA = oneToHundred_(a);

        // Hundreds
        b = Math.floor((input % 1000) / 100);
        if (b > 0 && b < 10) {
            outputB = ones[b];
        }

        // Thousands
        c = (Math.floor(input / 1000)) % 100;
        outputC = oneToHundred_(c);

        // Hundred Thousand
        d = (Math.floor(input / 100000)) % 100;
        if (d > 0 && d < 10) {
            outputD = ones[d];
        }


        // Million
        e = (Math.floor(input / 10000000)) % 100;
        outputE = oneToHundred_(e);

        // Make string
        output = "Bahraini Dinars";//Rupees

        if (e > 0) {
            output = output + " " + outputE + " crore";
        }

        if (d > 0 && c == "") {
            output = output + " " + outputD + " hundred thousand";
        }
        else if (d > 0) {
            output = output + " " + outputD + " hundred";
        }
        if (c > 0) {
            output = output + " " + outputC + " thousand";
        }

        if (b > 0) {
            output = output + " " + outputB + " hundred";
        }

        if (input > 100 && a > 0) {
            output = output + ""; // and
        }

        if (a > 0) {
            output = output + " " + outputA;
        }

        output = output + " and Fils ";// only
    }

    return output;

}

function oneToHundred_(num) {

    var outNum;

    var ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

    var teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

    var tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if (num > 0 && num < 10) { // 1 to 9

        outNum = ones[num]; // ones

    } else if (num > 9 && num < 20) { // 10 to 19

        outNum = teens[(num % 10)]; // teens

    } else if (num > 19 && num < 100) { // 20 to 100

        outNum = tens[Math.floor(num / 10)]; // tens

        if (num % 10 > 0) {
            outNum = outNum + " " + ones[num % 10]; // tens + ones
        }
    }
    return outNum;
}

function searchQuoteDetailsClientSide() {
    if ($('#QnoSelection').val() == "") {
        Swal.fire({
            icon: 'error',
            text: 'Please enter a Quotation Number to search!',
            showConfirmButton: true,
        })
    }
    else {

        var swalHtmlContent = `<img src='https://cdn.dribbble.com/users/1204495/screenshots/11563915/media/8c8a32cee54576be99f304d6098fd464.gif' style="width:200px">`

        Swal.fire({
            title: "Searching...",
            html: swalHtmlContent,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false
        })

        var userQno = $('#QnoSelection').val();

        console.log('running API call')

        var raw = JSON.stringify({ 'qNo': userQno, 'functionName': 'searchQuoteDetailsClientSide' });

        var requestOptions = {
            method: 'POST',
            body: raw,
            redirect: 'follow'
        };

        fetch("https://xdcfusruzi.execute-api.ap-south-1.amazonaws.com/dev", requestOptions)
            .then(response => response.json())
            .then(
                function (result) {

                    var alldata = JSON.parse(JSON.parse(result.body)[0])

                    console.log(alldata)

                    $("#ClientNameListInp").val(alldata[1]).addClass("form-control filled");
                    $("#ContactPersonListInp").val(alldata[2]).addClass("form-control filled");
                    $("#ContactNumberListInp").val(alldata[5]).addClass("form-control filled");
                    var d, m, y;
                    [d, m, y] = (alldata[4]).split("-")

                    dateSetNew(new Date(y + "-" + m + "-" + d))

                    $("#QSubjectInp").val(alldata[3]).addClass("form-control filled");

                    $("#mailTypeSelect").val(alldata[8]).next().css({"top": "-9px",
                    "font-size": "12px",
                    "color": "#004880",
                    "font-weight": "bold"})

                    $("#MailSubjectLineInp").val(alldata[7]).addClass("form-control filled");
                    $("#EmailListInp").val(alldata[6]).addClass("form-control filled");

                    $("#PaymentInp").val(alldata[10]).next().css({"top": "-9px",
                    "font-size": "12px",
                    "color": "#004880",
                    "font-weight": "bold"})

                    $("#validityInp").val(alldata[11]).addClass("form-control filled");
                    $("#gauranteeInp").val(alldata[12]).next().css({"top": "-9px",
                    "font-size": "12px",
                    "color": "#004880",
                    "font-weight": "bold"})
                    $("#materialInp").val(alldata[13]).addClass("form-control filled");
                    $("#hoodCoverInp").val(alldata[9]).addClass("form-control filled");
                    $("#additional1Inp").val(alldata[14]).addClass("form-control filled");
                    $("#additional1ContentInp").val(alldata[15]).next().css({"top": "-9px",
                    "font-size": "12px",
                    "color": "#004880",
                    "font-weight": "bold"})
                    $("#additional2Inp").val(alldata[16]).addClass("form-control filled");
                    $("#additional2ContentInp").val(alldata[17]).next().css({"top": "-9px",
                    "font-size": "12px",
                    "color": "#004880",
                    "font-weight": "bold"})

                    Swal.close();
                }          
            )
            .catch(
                function (error)
                {
                    console.log(error)
                    Swal.fire({
                      icon: 'error',
                      text: 'Q Number Not saved yet!',
                      showConfirmButton: true,
                  })
                });

















        //          google.script.run.withSuccessHandler(
        //              function (allData) {
        //                  $("#ClientNameListInp").val(allData[0][0][0]).addClass("form-control filled");
        //                  $("#ContactPersonListInp").val(allData[0][0][1]).addClass("form-control filled");
        //                  $("#ContactNumberListInp").val(allData[0][0][4]).addClass("form-control filled");
        //                  var d, m, y;
        //                  [d, m, y] = (allData[0][0][3]).split("-")
        //                  dateSetNew(new Date(y + "-" + m + "-" + d))
        //                  $("#QSubjectInp").val(allData[0][0][2]).addClass("form-control filled");

        //                  $("#mailTypeSelect").val(allData[0][0][7]).next().css({"top": "-9px",
        //                  "font-size": "12px",
        //                  "color": "#004880",
        //                  "font-weight": "bold"})

        //                  $("#MailSubjectLineInp").val(allData[0][0][6]).addClass("form-control filled");
        //                  $("#EmailListInp").val(allData[0][0][5]).addClass("form-control filled");

        //                  $("#PaymentInp").val(allData[0][0][9]).next().css({"top": "-9px",
        //                  "font-size": "12px",
        //                  "color": "#004880",
        //                  "font-weight": "bold"})

        //                  $("#validityInp").val(allData[0][0][10]).addClass("form-control filled");
        //                  $("#gauranteeInp").val(allData[0][0][11]).next().css({"top": "-9px",
        //                  "font-size": "12px",
        //                  "color": "#004880",
        //                  "font-weight": "bold"})
        //                  $("#materialInp").val(allData[0][0][12]).addClass("form-control filled");
        //                  $("#hoodCoverInp").val(allData[0][0][8]).addClass("form-control filled");
        //                  $("#additional1Inp").val(allData[0][0][13]).addClass("form-control filled");
        //                  $("#additional1ContentInp").val(allData[0][0][14]).next().css({"top": "-9px",
        //                  "font-size": "12px",
        //                  "color": "#004880",
        //                  "font-weight": "bold"})
        //                  $("#additional2Inp").val(allData[0][0][15]).addClass("form-control filled");
        //                  $("#additional2ContentInp").val(allData[0][0][16]).next().css({"top": "-9px",
        //                  "font-size": "12px",
        //                  "color": "#004880",
        //                  "font-weight": "bold"})

        //                  var splPrices = (allData[0][0][17]).split(",")
        //                  var pMargin = (allData[0][0][18]).split(",")
        //                  var dMargin = (allData[0][0][19]).split(",")
        //                  var optionItems = (allData[0][0][20]).split(",")
        //                  var optionItemsNos = (allData[0][0][21]).split(",")
        //                  var materialDescs = (allData[0][0][22]).split("~")
        //                  var priceCol = (allData[0][0][23]).split(",")
        //                  var qtyCol = (allData[0][0][24]).split(",")
        //                  var descriptionTotalRows = (allData[0][0][25]).split(",")
        //                  var photoIDs = (allData[0][0][27]).split(',')
        //                  var totalDescriptions = descriptionTotalRows.length;
        //                  $('#DescriptionMainDiv').html('')
        //                  var temp = []
        //                  var descriptionTotalRowsparseInt = descriptionTotalRows.map(e => parseInt(e))
        //                  var totalRows = descriptionTotalRowsparseInt.reduce((partialSum, a) => partialSum + a, 0)

        //                  var temp = [];
        //                  var flag = 1;
        //                  var count = 0;

        //                  console.log(allData)

        //                  if (allData[1] == 0) {
        //                      Swal.fire({
        //                          icon: 'error',
        //                          title: 'Please Stop, There is some data mismatch, contact the Admin!',
        //                          showConfirmButton: true,
        //                      })

        //                      return;
        //                  }


        //                  for (var i = 0; i < totalRows; i++) {
        //                      if (flag > descriptionTotalRowsparseInt[count]) {
        //                          flag = 1; count++;
        //                      }

        //                      if (allData[1][i][0] == 1) {
        //                          temp.push(`<tr id="D` + (count + 1) + `TR` + flag + `">
        //          <td>`+ flag + `</td>
        //          <td id="D`+ (count + 1) + `TR` + flag + `CB"><button class="customizeDescButton customizeDescButtonOff" onclick="customizeDescOff(` + (count + 1).toString() + flag + `)"><ion-icon name="stop-circle-outline" aria-label="stop circle outline"></ion-icon></button><input id="D` + (count + 1) + `TR` + flag + `CBH" class="hiddenCheckBox" type="checkbox" checked></td>
        //          <td>
        //            <input id="D`+ (count + 1) + `TR` + flag + `ECheck" type="checkbox">
        //          </td>
        //          <td id="D`+ (count + 1) + `TR` + flag + `W" contenteditable="true" style="padding:0px;" colspan="2"><textarea style="width: -webkit-fill-available; padding: 5px; resize: vertical;">` + allData[1][i][2] + `</textarea></td>
        //          <td id="D`+ (count + 1) + `TR` + flag + `Q" contenteditable="true" oninput="dimensionCalc(` + (count + 1).toString() + flag + `)" style="text-align: right;">` + allData[1][i][3] + `</td>
        //          <td id="D`+ (count + 1) + `TR` + flag + `A" contenteditable="true" oninput="dimensionCalc(` + (count + 1).toString() + flag + `)" >` + allData[1][i][4] + `</td>
        //          <td id="D`+ (count + 1) + `TR` + flag + `T" style="text-align: right;">` + (
        //                                  parseFloat(allData[1][i][3]) * parseFloat(allData[1][i][4])
        //                              ).toFixed(2) + `</td>
        //          <td id="D`+ (count + 1) + `TR` + flag + `AR">` + (flag != descriptionTotalRowsparseInt[count]
        //                                  ?
        //                                  `<button class="rowAddButton"><ion-icon name="lock-closed-outline" aria-label="lock closed outline"></ion-icon></button>`
        //                                  :
        //                                  `<button class="rowAddButton" onclick="rowAddButtonClick(` + (count + 1).toString() + flag + `)">
        //              <ion-icon name="add-circle-outline" aria-label="add circle outline"></ion-icon>
        //            </button>`
        //                              ) + `
        //          </td>
        //        </tr>`)
        //                      }
        //                      else if (allData[1][i][1] == 1) {
        //                          temp.push(`<tr id="D` + (count + 1) + `TR` + flag + `">
        //          <td>`+ flag + `</td>
        //          <td id="D`+ (count + 1) + `TR` + flag + `CB"><button class="customizeDescButton" onclick="customizeDescOn(` + (count + 1).toString() + flag + `)"><ion-icon name="create-outline" aria-label="create outline"></ion-icon></button><input id="D` + (count + 1) + `TR` + flag + `CBH" class="hiddenCheckBox" type="checkbox"></td>
        //          <td>
        //            <input id="D`+ (count + 1) + `TR` + flag + `ECheck" type="checkbox" checked>
        //          </td>
        //          <td id="D`+ (count + 1) + `TR` + flag + `W" contenteditable="true">` + ((allData[1][i][2]).split(',')[0]) + `</td>
        //          <td id="D`+ (count + 1) + `TR` + flag + `H" contenteditable="true">` + ((allData[1][i][2]).split(',')[1]) + `</td>
        //          <td id="D`+ (count + 1) + `TR` + flag + `Q" contenteditable="true" oninput="dimensionCalc(` + (count + 1).toString() + flag + `)" style="text-align: right;">` + allData[1][i][3] + `</td>
        //          <td id="D`+ (count + 1) + `TR` + flag + `A" contenteditable="true" oninput="dimensionCalc(` + (count + 1).toString() + flag + `)">` + allData[1][i][4] + `</td>
        //          <td id="D`+ (count + 1) + `TR` + flag + `T" style="text-align: right;">` + (
        //                                  parseFloat(allData[1][i][3]) * parseFloat(allData[1][i][4])
        //                              ).toFixed(2) + `</td>
        //          <td id="D`+ (count + 1) + `TR` + flag + `AR">` + (flag != descriptionTotalRowsparseInt[count]
        //                                  ?
        //                                  `<button class="rowAddButton"><ion-icon name="lock-closed-outline" aria-label="lock closed outline"></ion-icon></button>`
        //                                  :
        //                                  `<button class="rowAddButton" onclick="rowAddButtonClick(` + (count + 1).toString() + flag + `)">
        //              <ion-icon name="add-circle-outline" aria-label="add circle outline"></ion-icon>
        //            </button>`
        //                              ) + `
        //          </td>
        //        </tr>`)
        //                      }
        //                      else {
        //                          temp.push(`<tr id="D` + (count + 1) + `TR` + flag + `">
        //          <td>`+ flag + `</td>
        //          <td id="D`+ (count + 1) + `TR` + flag + `CB"><button class="customizeDescButton" onclick="customizeDescOn(` + (count + 1).toString() + flag + `)"><ion-icon name="create-outline" aria-label="create outline"></ion-icon></button><input id="D` + (count + 1) + `TR` + flag + `CBH" class="hiddenCheckBox" type="checkbox"></td>
        //          <td>
        //            <input id="D`+ (count + 1) + `TR` + flag + `ECheck" type="checkbox">
        //          </td>
        //          <td id="D`+ (count + 1) + `TR` + flag + `W" contenteditable="true">` + ((allData[1][i][2]).split(',')[0]) + `</td>
        //          <td id="D`+ (count + 1) + `TR` + flag + `H" contenteditable="true">` + ((allData[1][i][2]).split(',')[1]) + `</td>
        //          <td id="D`+ (count + 1) + `TR` + flag + `Q" contenteditable="true" oninput="dimensionCalc(` + (count + 1).toString() + flag + `)" style="text-align: right;">` + allData[1][i][3] + `</td>
        //          <td id="D`+ (count + 1) + `TR` + flag + `A" contenteditable="true" oninput="dimensionCalc(` + (count + 1).toString() + flag + `)">` + allData[1][i][4] + `</td>
        //          <td id="D`+ (count + 1) + `TR` + flag + `T" style="text-align: right;">` + (
        //                                  parseFloat(allData[1][i][3]) * parseFloat(allData[1][i][4])
        //                              ).toFixed(2) + `</td>
        //          <td id="D`+ (count + 1) + `TR` + flag + `AR">` + (flag != descriptionTotalRowsparseInt[count]
        //                                  ?
        //                                  `<button class="rowAddButton"><ion-icon name="lock-closed-outline" aria-label="lock closed outline"></ion-icon></button>`
        //                                  :
        //                                  `<button class="rowAddButton" onclick="rowAddButtonClick(` + (count + 1).toString() + flag + `)">
        //              <ion-icon name="add-circle-outline" aria-label="add circle outline"></ion-icon>
        //            </button>`
        //                              ) + `
        //          </td>
        //        </tr>`)
        //                      }
        //                      flag++;
        //                  }
        //                  var start = 0;
        //                  var end = descriptionTotalRowsparseInt[0] + start;

        //                  for (let i = 0; i < totalDescriptions; i++) {
        //                      $('#DescriptionMainDiv').append(`
        //  <div id="description`+ (i + 1) + `">
        //    <div  style="display: flex;align-items: center;">
        //      <button id="addButton`+ (i + 1) + `" class="ExpandButton" onclick="accordionNewAdd(` + (i + 1) + `)"><ion-icon name="add-circle"></ion-icon></button>
        //      <button class="accordion ripple" onclick="accordionListner(`+ (i + 1) + `)">Description ` + (i + 1) + `</button>
        //      <button id="removeButton`+ (i + 1) + `" class="ExpandButton" onclick="accordionNewRemove(` + (i + 1) + `)"><ion-icon name="remove-circle"></ion-icon></button>
        //    </div>
        //    <div id="panel`+ (i + 1) + `0" class="panel0">
        //    <table class="descriptionNew MaterialDescription">
        //    <thead>
        //      <tr>
        //        <th  colspan="5">Material Description</th>
        //      </tr>
        //      <tr>
        //        <th contenteditable="true" id="optionItem`+ (i + 1) + `0">` + optionItems[i] + `</th>
        //        <th contenteditable="true" id="optionItem`+ (i + 1) + `1">` + optionItemsNos[i] + `</th>
        //        <th><select id="D`+ (i + 1) + `Select1" onchange="descriptionSwitch('` + (i + 1) + `')">
        //          <option disabled selected value> -- select an option -- </option>
        //          <option value="1" >Aluminium Single Skin 80 x 1.2 mm</option>
        //          <option value="2" >Aluminium Double Skin Insulated 78 x 1.4 mm</option>
        //          <option value="3" >0.58 mm steel corrugated</option>
        //          <option value="4" >0.50 mm steel corrugated</option>
        //          <option value="5" >Heavy Duty Polycarbonate shutter</option>
        //          <option value="6" >Medium Duty Polycarbonate shutter</option>
        //          <option value="7" >Aluminium Grill Type</option>
        //          <option value="8" >GI 0.8 mm Micro Perforated</option>
        //          <option value="9" >GI 1.0 mm Micro Perforated</option>
        //          <option value="10" >GI 0.8 mm Non-Micro Perforated</option>
        //          <option value="11" >GI 1.0 mm Non-Micro Perforated</option>
        //          </select>
        //        </th>
        //        <th><select id="D`+ (i + 1) + `Select2" onchange="descriptionSwitch('` + (i + 1) + `')">
        //          <option disabled selected value> -- select an option -- </option>
        //          <option value="1" >High Quality Side Mounted Motor</option>
        //          <option value="2" >European make Center Motor</option>
        //          <option value="3">Manual Push-Up</option>
        //          <option value="4">Manual Chain-Pully</option>
        //          </select>
        //        </th>
        //        <th>
        //            <select id="D`+ (i + 1) + `photoSelect" onchange="photoChange('` + (i + 1) + `')">
        //           `+ photoOptions + `
        //            </select>
        //          </th>
        //      </tr>
        //    </thead>
        //    <tbody id="DDTB">
        //      <tr>
        //        <td id="D`+ (i + 1) + `Selected" colspan="3" style="background: #f1f1f1;padding: 0;border-bottom: 0.5px solid #f1f1f1;"><textarea style="width: -webkit-fill-available; padding: 5px; background: rgb(241, 241, 241); resize: vertical;">` + materialDescs[i] + `</textarea></td>
        //        <td id="D`+ (i + 1) + `Photo" colspan="2" style="text-align: center;background-color: #f1f1f1;color: #6a6a6a;">` + (photoIDs[i] == "" ? '<ion-icon name="image-outline"></ion-icon>' : '<img width="200px" src=\"https://drive.google.com/uc?export=view&id=' + photoIDs[i] + '\">') + `</td>
        //      </tr>
        //    </tbody>
        //  </table>
        //  </div>
        //  <div id="panel`+ (i + 1) + `1" class="panel1" style="display: none;">
        //    <table class="descriptionNew">
        //      <thead>
        //        <tr>
        //          <th>S#</th>
        //          <th>C</th>
        //          <th>E</th>
        //          <th colspan="2">Opening size/Scope of Work</th>
        //          <th>Price&nbsp;&nbsp; <input id="D`+ (i + 1) + `PCheck" type="checkbox" ` + (priceCol[i] == "1" ? "checked" : "") + `>
        //          </th>
        //          <th>Qty&nbsp;&nbsp; <input id="D`+ (i + 1) + `QCheck" type="checkbox" ` + (qtyCol[i] == "1" ? "checked" : "") + `>
        //          </th>
        //          <th>Total</th>
        //          <th>+/-</th>
        //        </tr>
        //      </thead>
        //      <tbody id="D`+ (i + 1) + `TB">
        //        `+ temp.slice(start, end).join('') + `
        //      </tbody>
        //    </table>
        //  </div>
        //  <div id="panel`+ (i + 1) + `2" class="panel2" style="display: none;">
        //    <table class="descriptionNew">
        //      <tbody id="D`+ (i + 1) + `TTB">
        //        <tr id="D`+ (i + 1) + `TTR1">
        //          <th colspan="3">Total</th>
        //          <td></td>
        //          <td style="text-align: right;"></td>
        //        </tr>`+ (splPrices[i] != "0"
        //                              ?
        //                              `<tr id="D` + (i + 1) + `TTR2">
        //          <th colspan="3">SPECIAL PRICE</th>
        //          <td></td>
        //          <td style="text-align: right;" contenteditable="true" oninput="splPriceCalc(`+ (i + 1) + `)">` + (parseFloat(splPrices[i]).toFixed(3)) + `</td>
        //        </tr>
        //        <tr id="D`+ (i + 1) + `TTR3">
        //          <th colspan="3">Vat @ 10%</th>
        //          <td></td>
        //          <td style="text-align: right;"></td>
        //        </tr>
        //        <tr id="D`+ (i + 1) + `TTR4">
        //          <th colspan="3"><button onclick="specialPriceOff(`+ (i + 1) + `)">
        //<ion-icon name="git-commit-outline" aria-label="git commit outline"></ion-icon></button>&nbsp;&nbsp;Grand Total</th>
        //          <td></td>
        //          <td style="text-align: right;"></td>
        //        </tr>
        //        <tr id="D`+ (i + 1) + `TTR5">
        //          <td colspan="5"></td>
        //        </tr>`
        //                              :
        //                              `<tr id="D` + (i + 1) + `TTR2">
        //          <th colspan="3">Vat @ 10%</th>
        //          <td></td>
        //          <td style="text-align: right;"></td>
        //        </tr>
        //        <tr id="D`+ (i + 1) + `TTR3">
        //          <th colspan="3">
        //            <button onclick="specialPriceOn(`+ (i + 1) + `)">
        //              <ion-icon name="git-compare-outline" role="img" class="md hydrated" aria-label="git compare outline"></ion-icon>
        //            </button>&nbsp;&nbsp;Grand Total
        //          </th>
        //          <td></td>
        //          <td style="text-align: right;"></td>
        //        </tr>
        //        <tr id="D`+ (i + 1) + `TTR4">
        //          <td colspan="5"></td>
        //        </tr>`
        //                          ) + `
        //      </tbody>
        //    </table>
        //  </div>
        //  <div id="panel`+ (i + 1) + `3" class="panel2">
        //   <table class="descriptionNew">
        //    <thead>
        //      <tr>
        //        <th colspan="3">Costing</th>
        //      </tr>
        //    </thead>
        //    <tbody id="costingBodyD`+ (i + 1) + `">
        //      <tr id="D`+ (i + 1) + `CR1">
        //        <th>Material, Manpower, and other Cost</th> <td></td> <td></td>
        //      </tr>
        //      <tr id="D`+ (i + 1) + `CR2">
        //        <th>Discount Margin</th> <td contenteditable="true" oninput="marginCalC(`+ (i + 1) + `)">` + (parseFloat(dMargin[i]).toFixed(2)) + `</td> <td style="text-align: right;"></td>
        //      </tr>
        //      <tr id="D`+ (i + 1) + `CR3">
        //        <th>Discount Given</th> <td></td> <td style="text-align: right;"></td>
        //      </tr>
        //      <tr id="D`+ (i + 1) + `CR4">
        //        <th>Profit Margin</th> <td contenteditable="true" oninput="marginCalC(`+ (i + 1) + `)">` + (parseFloat(pMargin[i]).toFixed(2)) + `</td> <td style="text-align: right;"></td>
        //      </tr>
        //      <tr id="D`+ (i + 1) + `CR5">
        //        <th>Total</th> <td></td> <td style="text-align: right;"></td>
        //      </tr>
        //      <tr id="D`+ (i + 1) + `CR6">
        //        <th>VAT</th> <td>10%</td> <td style="text-align: right;"></td>
        //      </tr>
        //      <tr id="D`+ (i + 1) + `CR7">
        //        <th>Grand Total</th> <td></td> <td style="text-align: right;"></td>
        //      </tr>
        //    </tbody>
        //  </table>
        //  </div>
        //</div>
        //  `)

        //                      if (i != (totalDescriptions)) {
        //                          $('#addButton' + i).css('display', 'none')
        //                          $('#removeButton' + i).css('display', 'none')
        //                      }

        //                      if (i == 0) { $('#removeButton1').remove() }

        //                      start = descriptionTotalRowsparseInt[i] + start;
        //                      end = end + descriptionTotalRowsparseInt[i + 1];


        //                      if (i == (totalDescriptions - 1)) {
        //                          Swal.fire({
        //                              icon: 'success',
        //                              title: 'Done!',
        //                              showConfirmButton: false,
        //                              timer: 1000
        //                          })
        //                      }
        //                      dimensionCalc((i + 1) + "1")
        //                  }
        //              }
        //          ).searchQuoteDetailsServerSide($("#QnoSelection").val())
        //      }
        //  }).quotationServerSideCheck($('#QnoSelection').val())
    }
}


function marginCalC(tagID) {
    var splCheck = $('#D' + tagID + 'TTR2').find('th').eq(0).text() == 'SPECIAL PRICE'
        ? parseFloat($($('#D' + tagID + 'TTR2').find('td')[1]).text())
        : 0;
    var pMargin = toPercentage($($('#D' + tagID + 'CR4').find('td')[0]).text());
    var dMargin = toPercentage($($('#D' + tagID + 'CR2').find('td')[0]).text());
    var costFromTotalTable = parseFloat($($('#D' + tagID + 'TTR1').find('td')[1]).text());
    var materialCost = costFromTotalTable / (1 + dMargin + pMargin)
    var discGiven = splCheck == 0 ? 0.000 : costFromTotalTable - parseFloat(splCheck)
    var discGivenPercent = (parseFloat(discGiven) / materialCost) * 100

    $($('#D' + tagID + 'CR1').find('td')[1]).html(
        (materialCost).toFixed(3)
    )

    $($('#D' + tagID + 'CR2').find('td')[1]).html(
        (materialCost * dMargin).toFixed(3)
    )

    $($('#D' + tagID + 'CR3').find('td')[1]).html(
        (discGiven).toFixed(3)
    )

    $($('#D' + tagID + 'CR3').find('td')[0]).html(
        splCheck == 0 ? 0.00 : discGivenPercent.toFixed(2)
    )

    $($('#D' + tagID + 'CR4').find('td')[1]).html(
        (materialCost * pMargin).toFixed(3)
    )

    var newTotal = materialCost + (materialCost * dMargin) - discGiven + (materialCost * pMargin)

    $($('#D' + tagID + 'CR5').find('td')[1]).html(
        (newTotal).toFixed(3)
    )

    $($('#D' + tagID + 'CR6').find('td')[1]).html(
        (newTotal * .1).toFixed(3)
    )

    $($('#D' + tagID + 'CR7').find('td')[1]).html(
        (newTotal + (newTotal * .1)).toFixed(3)
    )
}



/**    Micro functions
 *
 *    To connvert 2 to BHD 2.000
 *    To convert 12% to 0.12
 *    To convert 12 to 12.00%
 *
*/


function toBHD(string) {
    return 'BHD ' + (parseFloat(string).toFixed(3)).toString();
}


function toPercentage(val) {
    val = val.replace("%", "");
    val = parseFloat(val) / 100;
    return val
}

function toPercentageFormat(string) {
    string = parseFloat(string).toFixed(2)
    string = string.toString() + "%"
    return string
}


function screenReset(noSwal) {

    if (!noSwal) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: true,
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: 'Done!',
                    showConfirmButton: false,
                    timer: 1000
                })

                $('.GeneralDetails').find('table').animate({ scrollTop: 0 }, 1000);
                $("#QnoSelection").val('').focus()
                $("#ClientNameListInp").val('')
                $("#ContactPersonListInp").val('')
                $("#ContactNumberListInp").val('')
                dateSetNew(new Date())
                $("#QSubjectInp").val('')
                $("#mailTypeSelect").val('')
                $("#MailSubjectLineInp").val('')
                $("#EmailListInp").val('')
                $("#PaymentInp").val('')
                $("#validityInp").val('')
                $("#gauranteeInp").val('')
                $("#materialInp").val('')
                $("#hoodCoverInp").val('')
                $("#additional1Inp").val('')
                $("#additional1ContentInp").val('')
                $("#additional2Inp").val('')
                $("#additional2ContentInp").val('')
                $('.modal-content').find('textarea').eq(0).val(`1- Scaffolding material and erection should be arranged by the main contractor.
2- All necessary civil works are to be arranged by the main contractor.
3 Any damages could occur to the doors after completing the installation. Works will not be under Al Nisr's responsibility.
4- Any delay due to force measures or any Pandemic is not under Al Nisr's responsibility.
5- Electrical supply to the final connection point should be done by the main contractor.
6 Any construction defects which could affect the installation works will be the main contractor's responsibility.
7- Any required medical tests ( such as COVID-19 or fitness reports) should be paid for by the client.
8- The delivery period should start only once we get the advance payment and all the required technical confirmations including the RAL color.
9- Final price is subjected to final site measurements and inspection.
10- There is a high probability of noise and scratches appearing on the doors after repetitive use due to the material nature.
11- If the client did repair work causing damages or color variation to the doors, Al Nisr will not be responsible for that in any way.
12 - Negligent or intentional destruction to the doors will cause the warranty to be Null and Void.
13- The Schedule of work is to be confirmed once the advance payment is done, technical confirmation, and RAI color are finalized.
14 - The warranty will be considered void in the case of :
a - The repair works, maintenance , or service will be carried out by unqualified personnel. ( Other than Al Nisr technicians)
b - Mechanical damage by accident
c - Using parts from other sources.
d-Breakdowns caused by force measure, weather, or geological phenomena.
e - Faults caused by inadequate powder supply, voltage drops in the network overshoot or poor section cables or exposure to water sources (rain..)
f- Any damage caused by inadequate environmental conditions for the type of door installed
g-Damage caused by the use of inappropriate cleaning products or lubrication.
h - All damages caused by lacking or inadequate maintenance of the door and/or not fulfilling the instructions received from the manufacturer
and the regulations in force in each country.
15- Any additional fees for the gate pass, badges, or any other security obligations should be paid by the client
16- In order to keep the shutter in a good condition for a long period, you are requested to do proper maintenance and service following the instructions of
the manufacturer. Otherwise, you can agree with Al-Nisr company to do the annual maintenance contract after the warranty period at an extra charge.
17 The warranty will be applicable only if the client agreed on the annual maintenance contract with Al-Nisr company.
18- Any changes in the size or in the quantity. Al-Nisr has the right to revise the unit rates of all the doors at any time during the project as per the market prices.
19- Al-Nisr will not bear any responsibility for any delay caused by the COVID-19 pandemic including new restrictions and lockdown
20. The warranty will be Null and Void if the shutter is operated without proper testing and commissioning by Al Nisr technical personnel.
21- Any element or description not included in this offer will be subjected to a price variation.
Important Note: 1- Appropriate periodical services should be carried out by the Al-Nisr Technical team to the rolling shutter in order to ensure functionality and durability.
2- Never use abrasive or solvent-type cleaners like turpentine, petrol, kerosene, or paint thinners to clean door surfaces as they may ruin the finish.`)
                google.script.run.withSuccessHandler(function (num) {
                    $("#lastQno").html(num)
                    $("#QnoSelection").focus()
                }).getLastQno()

                $("#DescriptionMainDiv").html('')
                accordionNewAdd(0)



            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire(
                    'Cancelled',
                    'Screen not reset',
                    'error'
                )
            }
        })
    }
    else {
        $('.GeneralDetails').find('table').animate({ scrollTop: 0 }, 1000);
        $("#QnoSelection").val('')
        $("#ClientNameListInp").val('')
        $("#ContactPersonListInp").val('')
        $("#ContactNumberListInp").val('')
        dateSetNew(new Date())
        $("#QSubjectInp").val('')
        $("#mailTypeSelect").val('')
        $("#MailSubjectLineInp").val('')
        $("#EmailListInp").val('')
        $("#PaymentInp").val('')
        $("#validityInp").val('')
        $("#gauranteeInp").val('')
        $("#materialInp").val('')
        $("#hoodCoverInp").val('')
        $("#additional1Inp").val('')
        $("#additional1ContentInp").val('')
        $("#additional2Inp").val('')
        $("#additional2ContentInp").val('')
        $('.modal-content').find('textarea').eq(0).val(`1- Scaffolding material and erection should be arranged by the main contractor.
2- All necessary civil works are to be arranged by the main contractor.
3 Any damages could occur to the doors after completing the installation. Works will not be under Al Nisr's responsibility.
4- Any delay due to force measures or any Pandemic is not under Al Nisr's responsibility.
5- Electrical supply to the final connection point should be done by the main contractor.
6 Any construction defects which could affect the installation works will be the main contractor's responsibility.
7- Any required medical tests ( such as COVID-19 or fitness reports) should be paid for by the client.
8- The delivery period should start only once we get the advance payment and all the required technical confirmations including the RAL color.
9- Final price is subjected to final site measurements and inspection.
10- There is a high probability of noise and scratches appearing on the doors after repetitive use due to the material nature.
11- If the client did repair work causing damages or color variation to the doors, Al Nisr will not be responsible for that in any way.
12 - Negligent or intentional destruction to the doors will cause the warranty to be Null and Void.
13- The Schedule of work is to be confirmed once the advance payment is done, technical confirmation, and RAI color are finalized.
14 - The warranty will be considered void in the case of :
a - The repair works, maintenance , or service will be carried out by unqualified personnel. ( Other than Al Nisr technicians)
b - Mechanical damage by accident
c - Using parts from other sources.
d-Breakdowns caused by force measure, weather, or geological phenomena.
e - Faults caused by inadequate powder supply, voltage drops in the network overshoot or poor section cables or exposure to water sources (rain..)
f- Any damage caused by inadequate environmental conditions for the type of door installed
g-Damage caused by the use of inappropriate cleaning products or lubrication.
h - All damages caused by lacking or inadequate maintenance of the door and/or not fulfilling the instructions received from the manufacturer
and the regulations in force in each country.
15- Any additional fees for the gate pass, badges, or any other security obligations should be paid by the client
16- In order to keep the shutter in a good condition for a long period, you are requested to do proper maintenance and service following the instructions of
the manufacturer. Otherwise, you can agree with Al-Nisr company to do the annual maintenance contract after the warranty period at an extra charge.
17 The warranty will be applicable only if the client agreed on the annual maintenance contract with Al-Nisr company.
18- Any changes in the size or in the quantity. Al-Nisr has the right to revise the unit rates of all the doors at any time during the project as per the market prices.
19- Al-Nisr will not bear any responsibility for any delay caused by the COVID-19 pandemic including new restrictions and lockdown
20. The warranty will be Null and Void if the shutter is operated without proper testing and commissioning by Al Nisr technical personnel.
21- Any element or description not included in this offer will be subjected to a price variation.
Important Note: 1- Appropriate periodical services should be carried out by the Al-Nisr Technical team to the rolling shutter in order to ensure functionality and durability.
2- Never use abrasive or solvent-type cleaners like turpentine, petrol, kerosene, or paint thinners to clean door surfaces as they may ruin the finish.`)

        $("#DescriptionMainDiv").html('')
        accordionNewAdd(0)

        $("#QnoSelection").focus()
    }
}

function deleteQuotationClientSide() {
    if ($('#QnoSelection').val() == "") {
        Swal.fire({
            icon: 'error',
            text: 'Please enter a Quotation Number to delete!',
            showConfirmButton: true,
        })
    }
    else {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    text: 'Checking for file in DB',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                })

                google.script.run.withSuccessHandler(function (num) {
                    if (num == 404) {
                        Swal.fire({
                            icon: 'error',
                            text: 'Error 404,File not Found!',
                            showConfirmButton: true,
                        })
                    }
                    else {
                        google.script.run.deleteQuotationServerSide($('#QnoSelection').val())
                        google.script.run.withSuccessHandler(function (num) {
                            $("#lastQno").html(num)

                            $("#QnoSelection").focus()
                        }).getLastQno()

                        $('.GeneralDetails').find('table').animate({ scrollTop: 0 }, 1000);
                        setTimeout(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Delete Successful!',
                                showConfirmButton: false,
                                timer: 1000
                            })
                        }, 5000);
                        setTimeout(() => { qStatusTableRefresh() }, 30000);
                    }
                }).quotationServerSideCheck($('#QnoSelection').val())

            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire(
                    'Cancelled',
                    'Your file is safe',
                    'error')
            }
        })
    }
}

function saveQuotationClientSide() {
    Swal.fire({
        text: 'Checking all inputs',
        showConfirmButton: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
    })
    if ($('#QnoSelection').val() == "") {
        Swal.fire({
            icon: 'error',
            text: 'Please enter a Quotation Number to save!',
            showConfirmButton: true,
        })
    }
    else if ($('#QSubjectInp').val() == "") {
        Swal.fire({
            icon: 'error',
            text: 'Please enter a Quotation SUBJECT to save!',
            showConfirmButton: true,
        })
    }
    else if ($('#mailTypeSelect').val() == "") {
        Swal.fire({
            icon: 'error',
            text: 'Please choose a MAIL TYPE to save!',
            showConfirmButton: true,
        })
    }
    else if (($('#mailTypeSelect').val() == "New" ||
        $('#mailTypeSelect').val() == "Reply" ||
        $('#mailTypeSelect').val() == "Revised" ||
        $('#mailTypeSelect').val() == "Best Price") &&
        ($('#MailSubjectLineInp').val() == "" ||
            $('#EmailListInp').val() == "")) {
        Swal.fire({
            icon: 'error',
            text: 'Please enter both MAIL SUBJECT LINE and MAIL-ID to save!',
            showConfirmButton: true,
        })
    }
    else {
        var inpFlag = '';

        for (let i = 0; i < $('#DescriptionMainDiv').children().length; i++) {
            if ($('#D' + (i + 1) + 'CR2').find('td').eq(0).text() == '') {
                inpFlag = 'Please enter DISCOUNT MARGINS to save!'
                break;
            }
            else if ($('#D' + (i + 1) + 'CR4').find('td').eq(0).text() == "") {
                inpFlag = 'Please enter PROFIT MARGINS to save!'
                break;
            }
            else if ($('.modal-content').find('textarea').eq(0).val() == "") {
                inpFlag = 'Please enter THE TERMS & CONDITIONS to save!'
                break;
            }
            else if ($('#D' + (i + 1) + 'TTR2').find('th').eq(0).text() == "SPECIAL PRICE" &&
                $('#D' + (i + 1) + 'TTR2').find('td').eq(1).text() == '') {
                inpFlag = 'Please enter the SPECIAL PRICES to save!'
                break;
            }
            for (let j = 0; j < $('#D' + (i + 1) + 'TB').children().length; j++) {
                if ($('#D' + (i + 1) + 'TR' + (j + 1) + 'Q').text() == '' || $('#D' + (i + 1) + 'TR' + (j + 1) + 'A').text() == '') {
                    inpFlag = 'Please enter all the UNIT PRICES & QUANTITIES to save!'
                    break;
                }
            }

        }

        if (inpFlag != '') {
            Swal.fire({
                icon: 'error',
                text: inpFlag,
                showConfirmButton: true,
            })

            return;
        }
        Swal.fire({
            title: 'Are you sure?',
            text: "Quotation generation will commence post this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    text: 'Checking for file in DB',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                })

                google.script.run.withSuccessHandler(function (num) {
                    if (num == 404) {

                        var swalHtmlContent = `<img src='https://cdn.dribbble.com/users/503653/screenshots/3143656/media/620227c4bbcbfefd6fbb6126cd15e86a.gif' style="width:200px">`

                        swal.fire({
                            title: "Generating Quote, please wait",
                            html: swalHtmlContent,
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        })


                        var allData = []
                        allData.push([$('#QnoSelection').val(),
                        $('#ClientNameListInp').val(),
                        $('#ContactPersonListInp').val(),
                        $('#QSubjectInp').val(),
                        $('#datePickerNew').val(),
                        $('#ContactNumberListInp').val(),
                        $('#EmailListInp').val(),
                        $('#MailSubjectLineInp').val(),
                        $('#mailTypeSelect').val(),
                        $('#hoodCoverInp').val(),
                        $('#PaymentInp').val(),
                        $('#validityInp').val(),
                        $('#gauranteeInp').val(),
                        $('#materialInp').val(),
                        $('#additional1Inp').val(),
                        $('#additional1ContentInp').val(),
                        $('#additional2Inp').val(),
                        $('#additional2ContentInp').val()
                        ])

                        var totalDescriptions = $('#DescriptionMainDiv').children().length;
                        var descriptionRowCount = [];
                        var tempRowMod = [];
                        var tempGtotalMod = []
                        var tempCostingSplit = []
                        var splPrice = []
                        var profitMargin = []
                        var discountMargin = []
                        var optionItem = []
                        var optionItemNo = []
                        var mDesc = []
                        var priceCol = []
                        var qtyCol = []
                        var photoIds = []

                        for (var i = 0; i < totalDescriptions; i++) {
                            descriptionRowCount.push($('#D' + (i + 1) + 'TB').children().length)
                            var tempphotoString = $('#D' + (i + 1) + 'Photo').find('img').eq(0).prop('src')
                            if (tempphotoString === undefined) { photoIds.push('') }
                            else { photoIds.push(tempphotoString.toString().replace('https://drive.google.com/uc?export=view&id=', '')) }


                            splPrice.push($('#D' + (i + 1) + 'TTR2').find('th').eq(0).text() == 'SPECIAL PRICE' ?
                                $('#D' + (i + 1) + 'TTR2').find('td').eq(1).text() : 0)

                            profitMargin.push($('#D' + (i + 1) + 'CR4').find('td').eq(0).text())
                            discountMargin.push($('#D' + (i + 1) + 'CR2').find('td').eq(0).text())
                            optionItem.push($('#optionItem' + (i + 1) + '0').text())
                            optionItemNo.push($('#optionItem' + (i + 1) + '1').text())
                            mDesc.push($('#D' + (i + 1) + 'Selected').find('textarea').val())
                            priceCol.push(+$('#D' + (i + 1) + 'PCheck').is(':checked'))
                            qtyCol.push(+$('#D' + (i + 1) + 'QCheck').is(':checked'))

                            for (let j = 0; j < descriptionRowCount[i]; j++) {
                                var customiseCheck = +$('#D' + (i + 1) + 'TR' + (j + 1) + 'CBH').is(':checked')
                                var extraCheck = +$('#D' + (i + 1) + 'TR' + (j + 1) + 'ECheck').is(':checked')
                                tempRowMod.push([allData[0][0],
                                    customiseCheck,
                                    extraCheck,
                                (customiseCheck ?
                                    ($('#D' + (i + 1) + 'TR' + (j + 1) + 'W').find("textarea").val()) :
                                    ($('#D' + (i + 1) + 'TR' + (j + 1) + 'W').text() + "," + $('#D' + (i + 1) + 'TR' + (j + 1) + 'H').text())),
                                $('#D' + (i + 1) + 'TR' + (j + 1) + 'Q').text(),
                                $('#D' + (i + 1) + 'TR' + (j + 1) + 'A').text(),
                                $('#D' + (i + 1) + 'TR' + (j + 1) + 'T').text(),
                                    '', '', '=ROW()'
                                ])
                            }
                        }

                        for (let i = 0; i < descriptionRowCount.length; i++) {
                            if ($('#D' + (i + 1) + 'TTR2').find('th').eq(0).text() == 'SPECIAL PRICE') {
                                tempGtotalMod.push([[$('#D' + (i + 1) + 'TTR1').find('th').eq(0).text(),
                                $('#D' + (i + 1) + 'TTR1').find('td').eq(0).text(),
                                toBHD($('#D' + (i + 1) + 'TTR1').find('td').eq(1).text())],
                                [$('#D' + (i + 1) + 'TTR2').find('th').eq(0).text(),
                                $('#D' + (i + 1) + 'TTR2').find('td').eq(0).text(),
                                toBHD($('#D' + (i + 1) + 'TTR2').find('td').eq(1).text())],
                                [$('#D' + (i + 1) + 'TTR3').find('th').eq(0).text(),
                                $('#D' + (i + 1) + 'TTR3').find('td').eq(0).text(),
                                toBHD($('#D' + (i + 1) + 'TTR3').find('td').eq(1).text())],
                                ['Grand Total', $('#D' + (i + 1) + 'TTR4').find('td').eq(0).text(),
                                    toBHD($('#D' + (i + 1) + 'TTR4').find('td').eq(1).text())],
                                [$('#D' + (i + 1) + 'TTR5').find('td').eq(0).text()]])
                            }
                            else {
                                tempGtotalMod.push([[$('#D' + (i + 1) + 'TTR1').find('th').eq(0).text(),
                                $('#D' + (i + 1) + 'TTR1').find('td').eq(0).text(),
                                toBHD($('#D' + (i + 1) + 'TTR1').find('td').eq(1).text())],
                                [$('#D' + (i + 1) + 'TTR2').find('th').eq(0).text(),
                                $('#D' + (i + 1) + 'TTR2').find('td').eq(0).text(),
                                toBHD($('#D' + (i + 1) + 'TTR2').find('td').eq(1).text())],
                                ['Grand Total', $('#D' + (i + 1) + 'TTR3').find('td').eq(0).text(),
                                    toBHD($('#D' + (i + 1) + 'TTR3').find('td').eq(1).text())],
                                [$('#D' + (i + 1) + 'TTR4').find('td').eq(0).text()]])
                            }

                            tempCostingSplit.push([
                                [$('#D' + (i + 1) + 'CR1').find('th').eq(0).text(),
                                $('#D' + (i + 1) + 'CR1').find('td').eq(0).text(),
                                toBHD($('#D' + (i + 1) + 'CR1').find('td').eq(1).text())],
                                [$('#D' + (i + 1) + 'CR2').find('th').eq(0).text(),
                                toPercentageFormat($('#D' + (i + 1) + 'CR2').find('td').eq(0).text()),
                                toBHD($('#D' + (i + 1) + 'CR2').find('td').eq(1).text())],
                                [$('#D' + (i + 1) + 'CR3').find('th').eq(0).text(),
                                toPercentageFormat($('#D' + (i + 1) + 'CR3').find('td').eq(0).text()),
                                toBHD($('#D' + (i + 1) + 'CR3').find('td').eq(1).text())],
                                [$('#D' + (i + 1) + 'CR4').find('th').eq(0).text(),
                                toPercentageFormat($('#D' + (i + 1) + 'CR4').find('td').eq(0).text()),
                                toBHD($('#D' + (i + 1) + 'CR4').find('td').eq(1).text())],
                                [$('#D' + (i + 1) + 'CR5').find('th').eq(0).text(),
                                $('#D' + (i + 1) + 'CR5').find('td').eq(0).text(),
                                toBHD($('#D' + (i + 1) + 'CR5').find('td').eq(1).text())],
                                [$('#D' + (i + 1) + 'CR6').find('th').eq(0).text(),
                                toPercentageFormat($('#D' + (i + 1) + 'CR6').find('td').eq(0).text()),
                                toBHD($('#D' + (i + 1) + 'CR6').find('td').eq(1).text())],
                                [$('#D' + (i + 1) + 'CR7').find('th').eq(0).text(),
                                $('#D' + (i + 1) + 'CR7').find('td').eq(0).text(),
                                toBHD($('#D' + (i + 1) + 'CR7').find('td').eq(1).text())]
                            ])
                        }

                        allData[0].push(splPrice.join(','),
                            profitMargin.join(','),
                            discountMargin.join(','),
                            optionItem.join(','),
                            optionItemNo.join(','),
                            mDesc.join('~'),
                            priceCol.join(','),
                            qtyCol.join(','),
                            descriptionRowCount.join(','),
                            $('.modal-content').find('textarea').eq(0).val(),
                            photoIds.join(','), '', '=ROW()')
                        allData.push(tempRowMod)
                        allData.push(tempGtotalMod)
                        allData.push(tempCostingSplit)

                        if (parseInt($('#lastQno').text(), 10) < parseInt($('#QnoSelection').val(), 10)) {
                            $('#lastQno').text($('#QnoSelection').val())
                        }


                        google.script.run.withSuccessHandler(
                            function (links) {
                                allData[0].push("", links[1] + "," + links[2])

                                globalAllData = allData.slice();

                                swalHtmlContent = `<div style="display:flex;align-items: center;">
            <img src='https://content.presentermedia.com/content/animsp/00007000/7028/press_on_screen_anim_md_nwm_v2.gif' style="width:200px;">
            <div>
            <button style="padding: 10px;
              margin: 10px 0px 0px;
              background-color: grey;
              color: white;
              cursor:pointer" onclick="window.open('https://drive.google.com/file/d/`+ links[1] + `/view','_blank')" >Quotation: ` + links[0] + `</button>
              <button style="padding: 10px;
              margin: 10px 0px 0px;
              background-color: grey;
              color: white;
              cursor:pointer" onclick="redoQuote('`+ links[0] + `','` + links[2] + `')" >CUSTOMIZE MORE</button>
              </div>
              </div>`



                                Swal.fire({
                                    title: "Quotation Generated",
                                    html: swalHtmlContent,
                                    showConfirmButton: true,
                                    showCancelButton: false,
                                    confirmButtonText: "Done",
                                    allowOutsideClick: false,
                                    allowEscapeKey: false,
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        google.script.run.quotationCostingSplitFormat(allData, 1)

                                        Swal.fire({
                                            title: "Quotation Generation Complete",
                                            showConfirmButton: false,
                                            timer: 1000,
                                            icon: "success",
                                        })

                                        screenReset(1)

                                        setTimeout(() => { qStatusTableRefresh() }, 30000);

                                    }
                                })
                            }
                        ).saveQuotationServerSide(allData)



                    }
                    else {

                        Swal.fire({
                            icon: 'warning',
                            title: 'Quotation already saved!',
                            showConfirmButton: true,
                        })
                    }
                }).quotationServerSideCheck($('#QnoSelection').val())

            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire(
                    'Cancelled',
                    'Quotation generation halted!',
                    'error')
            }
        })
    }
}

function covertingToTemplateStrings(string) {
    var output = !string ? '' : string.replace(/(?:\r\n|\r|\n)/g, '\n')
    return output;
}

//Scriplets for status tab
//File for placeholders //https://jsfiddle.net/v18dybn5/1/

function statusPanelShow() {
    if ($('#statusPanelContent').css('display') == 'none') {
        $('.qStatusDetails').css('box-shadow', 'none')
        $('#statusPanelContent').slideDown()
    }
    else {
        $('.qStatusDetails').css('box-shadow', 'rgb(0 0 0 / 10%) 0px -12px 30px, rgb(0 0 0 / 55%) 0px 4px 6px, rgb(0 0 0 / 65%) 0px 12px 13px, rgb(0 0 0 / 25%) 0px -3px 5px')
        $('#statusPanelContent').slideUp()
    }
}

function qStatusDetailsFetch(rowId, dbRow) {
    var table = $('#myTable').DataTable();
    var allData = table.row($('#QST' + rowId)).data()

    if ($('#statusPanelContent').css('display') == 'none') { statusPanelShow() }

    $('#statusPanelContent').find('table').eq(0).attr('id', dbRow)
    $('#qstatusChosenQuote').html(allData[0])
    $('#quotationPDFlink').html(`<a href="" style="text-decoration: none;color: red;font-weight: bold;" onclick="window.open('https://drive.google.com/file/d/` + allData[2] + `/view','_blank')">LINK</a>`);

    $('#quotationTimeStamp').html(allData[1]);

    $('#quotationCostSplit').html(`<a href="" style=\"text-decoration: none;color: red;font-weight: bold;\" onclick=\"window.open('https://drive.google.com/file/d/` + allData[4] + `/view','_blank')\">LINK</a>`);

    var temp = $('#QST' + rowId).find('input').eq(0).is(":checked") == true ?
        $('#quotationStatusStatement').find('select').eq(0).val('Verified').change() :
        $('#quotationStatusStatement').find('select').eq(0).val("Verification Pending").change();

    $('#quotationWordLink').html("<a href=\"\" style=\"text-decoration: none;color: red;font-weight: bold;\" onclick=\"window.open('https:&#47;&#47;docs.google.com/document/d/" + allData[3] + "/edit','_blank')\">LINK</a>");

    $('#quotationStatusContactPerson').find('input').eq(0).val(allData[8])
    $('#quotationStatusEmailID').find('input').eq(0).val(allData[10])
    $('#quotationStatusSubjectLine').find('input').eq(0).val(allData[11])

    $('#quotationStatusEmailType').find('select').eq(0).val(allData[13])
    $('#quotationStatusEmailStatus').find('select').eq(0).val(allData[14])
    $('#quotationStatusEmailTimeStamp').html(allData[12])
}

function verStatusChange(input, dbRow, qNo) {
    var valChanged = $(input).is(":checked") ? 'Verified' : 'Verification Pending';
    google.script.run.verStatusChangeServerSide(dbRow, valChanged)
    if ($('#qstatusChosenQuote').html() == qNo) {
        $("#quotationStatusStatement").find('select').eq(0).val(valChanged).change();
    }

}

function verStatusChangeSel() {
    google.script.run.verStatusChangeServerSide($('#statusPanelContent').find('table').eq(0).attr('id'), $('#quotationStatusStatement').find(':selected').text())
}

function verStatusChangeName() {
    google.script.run.verStatusChangeNameServerSide($('#statusPanelContent').find('table').eq(0).attr('id'), $('#quotationStatusContactPerson').find('input').eq(0).val())
}

function verStatusChangeEmail() {
    google.script.run.verStatusChangeEmailServerSide($('#statusPanelContent').find('table').eq(0).attr('id'), $('#quotationStatusEmailID').find('input').eq(0).val())
}

function verStatusChangeSubLine() {
    google.script.run.verStatusChangeSubLineServerSide($('#statusPanelContent').find('table').eq(0).attr('id'), $('#quotationStatusSubjectLine').find('input').eq(0).val())
}

function verStatusChangeEmailType() {
    google.script.run.verStatusChangeEmailTypeServerSide($('#statusPanelContent').find('table').eq(0).attr('id'), $('#quotationStatusEmailType').find(':selected').text())
}

function verStatusChangeDelivery() {
    google.script.run.verStatusChangeDeliveryServerSide($('#statusPanelContent').find('table').eq(0).attr('id'), $('#quotationStatusEmailStatus').find(':selected').text())
}

function photoChange(id) {
    $('#D' + id + 'Photo').html("Loding ...")
    var photoId = $('#D' + id + 'photoSelect').find(':selected').val();
    $('#D' + id + 'Photo').html(`<img width="200px" src="https://drive.google.com/uc?export=view&id=` + photoId + `">`)
}

function photoCloudUpload() {
    var swalHtmlContent = `<img src="https://cdn.dribbble.com/users/73104/screenshots/2832940/cloud_load.gif"  style="width:200px">`


    Swal.fire({
        title: "Uploading to Cloud",
        html: swalHtmlContent,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false
    })

    var photoInputNameTag = $('#cloudUpload').find('input').eq(0).val()
    if (document.getElementById('photoFile').value == '') { return }
    const name = 'AL-NISR Factory'
    const email = 'alnisrmaterial@gmail.com'

    const f = document.getElementById('photoFile');

    [...f.files].forEach((file, i) => {
        const fr = new FileReader();
        fr.onload = (e) => {
            const data = e.target.result.split(",");
            const obj = { fileName: f.files[i].name, mimeType: data[0].match(/:(\w.+);/)[1], data: data[1], myName: name, myEmail: email };


            $('#cloudUpload').css('display', 'none')

            google.script.run.withSuccessHandler(
                function () {
                    photoListSet();

                    Swal.fire({
                        icon: 'success',
                        title: 'Done!',
                        showConfirmButton: false,
                        timer: 1000
                    })
                }
            ).uploadFiles(obj, photoInputNameTag)

            $('#cloudUpload').find('input').eq(0).val('')
            $('#cloudUpload').find('input').eq(1).val('')


        }
        fr.readAsDataURL(file);
    });
}

$("#bulkUploadData").on("click", function () {

    Swal.fire({
        title: 'Bulk Download?',
        text: "Proceed with download?",
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swal.fire({
                title: "Downloading...",
                showConfirmButton: false,
                allowOutsideClick: false,
                allowEscapeKey: false
            })

            google.script.run.withSuccessHandler(
                function (allData) {
                    console.log(allData)


                    $('#DescriptionMainDiv').html('')

                    var temp = [];
                    var flag = 1;
                    var count = 0;
                    allData[1] = allData[1].map(row => row.map(data => parseInt(data)))

                    for (var i = 0; i < allData[0].length; i++) {
                        if (flag > allData[1][count][0]) {
                            flag = 1; count++;
                        }

                        if (allData[0][i][0] == 1) {
                            temp.push(`<tr id="D` + (count + 1) + `TR` + flag + `">
                        <td>`+ flag + `</td>
                        <td id="D`+ (count + 1) + `TR` + flag + `CB"><button class="customizeDescButton customizeDescButtonOff" onclick="customizeDescOff(` + (count + 1).toString() + flag + `)"><ion-icon name="stop-circle-outline" aria-label="stop circle outline"></ion-icon></button><input id="D` + (count + 1) + `TR` + flag + `CBH" class="hiddenCheckBox" type="checkbox" checked></td>
                        <td>
                          <input id="D`+ (count + 1) + `TR` + flag + `ECheck" type="checkbox">
                        </td>
                        <td id="D`+ (count + 1) + `TR` + flag + `W" contenteditable="true" style="padding:0px;" colspan="2"><textarea style="width: -webkit-fill-available; padding: 5px; background: rgb(241, 241, 241); resize: vertical;">` + allData[2][i][0] + `</textarea></td>
                        <td id="D`+ (count + 1) + `TR` + flag + `Q" contenteditable="true" oninput="dimensionCalc(` + (count + 1).toString() + flag + `)" style="text-align: right;">` + allData[0][i][5] + `</td>
                        <td id="D`+ (count + 1) + `TR` + flag + `A" contenteditable="true" oninput="dimensionCalc(` + (count + 1).toString() + flag + `)" >` + allData[0][i][6] + `</td>
                        <td id="D`+ (count + 1) + `TR` + flag + `T" style="text-align: right;">` + (
                                    parseFloat(allData[1][i][6]) * parseFloat(allData[1][i][5])
                                ).toFixed(2) + `</td>
                        <td id="D`+ (count + 1) + `TR` + flag + `AR">` + (flag != allData[1][count][0]
                                    ?
                                    `<button class="rowAddButton"><ion-icon name="lock-closed-outline" aria-label="lock closed outline"></ion-icon></button>`
                                    :
                                    `<button class="rowAddButton" onclick="rowAddButtonClick(` + (count + 1).toString() + flag + `)">
                            <ion-icon name="add-circle-outline" aria-label="add circle outline"></ion-icon>
                          </button>`
                                ) + `
                        </td>
                      </tr>`)
                        }
                        else if (allData[0][i][1] == 1) {
                            temp.push(`<tr id="D` + (count + 1) + `TR` + flag + `">
                        <td>`+ flag + `</td>
                        <td id="D`+ (count + 1) + `TR` + flag + `CB"><button class="customizeDescButton" onclick="customizeDescOn(` + (count + 1).toString() + flag + `)"><ion-icon name="create-outline" aria-label="create outline"></ion-icon></button><input id="D` + (count + 1) + `TR` + flag + `CBH" class="hiddenCheckBox" type="checkbox"></td>
                        <td>
                          <input id="D`+ (count + 1) + `TR` + flag + `ECheck" type="checkbox" checked>
                        </td>
                        <td id="D`+ (count + 1) + `TR` + flag + `W" contenteditable="true">` + ((allData[2][i][0]).split(',')[0]) + `</td>
                        <td id="D`+ (count + 1) + `TR` + flag + `H" contenteditable="true">` + ((allData[2][i][0]).split(',')[1]) + `</td>
                        <td id="D`+ (count + 1) + `TR` + flag + `Q" contenteditable="true" oninput="dimensionCalc(` + (count + 1).toString() + flag + `)" style="text-align: right;">` + allData[0][i][5] + `</td>
                        <td id="D`+ (count + 1) + `TR` + flag + `A" contenteditable="true" oninput="dimensionCalc(` + (count + 1).toString() + flag + `)">` + allData[0][i][6] + `</td>
                        <td id="D`+ (count + 1) + `TR` + flag + `T" style="text-align: right;">` + (
                                    parseFloat(allData[0][i][5]) * parseFloat(allData[0][i][6])
                                ).toFixed(2) + `</td>
                        <td id="D`+ (count + 1) + `TR` + flag + `AR">` + (flag != allData[1][count][0]
                                    ?
                                    `<button class="rowAddButton"><ion-icon name="lock-closed-outline" aria-label="lock closed outline"></ion-icon></button>`
                                    :
                                    `<button class="rowAddButton" onclick="rowAddButtonClick(` + (count + 1).toString() + flag + `)">
                            <ion-icon name="add-circle-outline" aria-label="add circle outline"></ion-icon>
                          </button>`
                                ) + `
                        </td>
                      </tr>`)
                        }
                        else {
                            temp.push(`<tr id="D` + (count + 1) + `TR` + flag + `">
                        <td>`+ flag + `</td>
                        <td id="D`+ (count + 1) + `TR` + flag + `CB"><button class="customizeDescButton" onclick="customizeDescOn(` + (count + 1).toString() + flag + `)"><ion-icon name="create-outline" aria-label="create outline"></ion-icon></button><input id="D` + (count + 1) + `TR` + flag + `CBH" class="hiddenCheckBox" type="checkbox"></td>
                        <td>
                          <input id="D`+ (count + 1) + `TR` + flag + `ECheck" type="checkbox">
                        </td>
                        <td id="D`+ (count + 1) + `TR` + flag + `W" contenteditable="true">` + ((allData[2][i][0]).split(',')[0]) + `</td>
                        <td id="D`+ (count + 1) + `TR` + flag + `H" contenteditable="true">` + ((allData[2][i][0]).split(',')[1]) + `</td>
                        <td id="D`+ (count + 1) + `TR` + flag + `Q" contenteditable="true" oninput="dimensionCalc(` + (count + 1).toString() + flag + `)" style="text-align: right;">` + allData[0][i][5] + `</td>
                        <td id="D`+ (count + 1) + `TR` + flag + `A" contenteditable="true" oninput="dimensionCalc(` + (count + 1).toString() + flag + `)">` + allData[0][i][6] + `</td>
                        <td id="D`+ (count + 1) + `TR` + flag + `T" style="text-align: right;">` + (
                                    parseFloat(allData[0][i][5]) * parseFloat(allData[0][i][6])
                                ).toFixed(2) + `</td>
                        <td id="D`+ (count + 1) + `TR` + flag + `AR">` + (flag != allData[1][count][0]
                                    ?
                                    `<button class="rowAddButton"><ion-icon name="lock-closed-outline" aria-label="lock closed outline"></ion-icon></button>`
                                    :
                                    `<button class="rowAddButton" onclick="rowAddButtonClick(` + (count + 1).toString() + flag + `)">
                            <ion-icon name="add-circle-outline" aria-label="add circle outline"></ion-icon>
                          </button>`
                                ) + `
                        </td>
                      </tr>`)
                        }
                        flag++;
                    }
                    var start = 0;
                    var end = allData[1][0][0] + start;
                    console.log('allData[1].length__>' + allData[1].length)

                    for (let i = 0; i < allData[1].length; i++) {
                        console.log('start-->i' + i)
                        $('#DescriptionMainDiv').append(`
                <div id="description`+ (i + 1) + `">
                  <div  style="display: flex;align-items: center;">
                    <button id="addButton`+ (i + 1) + `" class="ExpandButton" onclick="accordionNewAdd(` + (i + 1) + `)"><ion-icon name="add-circle"></ion-icon></button>
                    <button class="accordion ripple" onclick="accordionListner(`+ (i + 1) + `)">Description ` + (i + 1) + `</button>
                    <button id="removeButton`+ (i + 1) + `" class="ExpandButton" onclick="accordionNewRemove(` + (i + 1) + `)"><ion-icon name="remove-circle"></ion-icon></button>
                  </div>
                  <div id="panel`+ (i + 1) + `0" class="panel0">
                  <table class="descriptionNew MaterialDescription">
                  <thead>
                    <tr>
                      <th  colspan="5">Material Description</th>
                    </tr>
                    <tr>
                      <th contenteditable="true" id="optionItem`+ (i + 1) + `0">OPTION</th>
                      <th contenteditable="true" id="optionItem`+ (i + 1) + `1">` + (i + 1) + `</th>
                      <th><select id="D`+ (i + 1) + `Select1" onchange="descriptionSwitch('` + (i + 1) + `')">
                        <option disabled selected value> -- select an option -- </option>
                        <option value="1" >Aluminium Single Skin 80 x 1.2 mm</option>
                        <option value="2" >Aluminium Double Skin Insulated 78 x 1.4 mm</option>
                        <option value="3" >0.58 mm steel corrugated</option>
                        <option value="4" >0.50 mm steel corrugated</option>
                        <option value="5" >Heavy Duty Polycarbonate shutter</option>
                        <option value="6" >Medium Duty Polycarbonate shutter</option>
                        <option value="7" >Aluminium Grill Type</option>
                        <option value="8" >GI 0.8 mm Micro Perforated</option>
                        <option value="9" >GI 1.0 mm Micro Perforated</option>
                        <option value="10" >GI 0.8 mm Non-Micro Perforated</option>
                        <option value="11" >GI 1.0 mm Non-Micro Perforated</option>
                        </select>
                      </th>
                      <th><select id="D`+ (i + 1) + `Select2" onchange="descriptionSwitch('` + (i + 1) + `')">
                        <option disabled selected value> -- select an option -- </option>
                        <option value="1" >High Quality Side Mounted Motor</option>
                        <option value="2" >European make Center Motor</option>
                        <option value="3">Manual Push-Up</option>
                        <option value="4">Manual Chain-Pully</option>
                        </select>
                      </th>
                      <th>
                          <select id="D`+ (i + 1) + `photoSelect" onchange="photoChange('` + (i + 1) + `')">
                         `+ photoOptions + `
                          </select>
                        </th>
                    </tr>
                  </thead>
                  <tbody id="DDTB">
                    <tr>
                      <td id="D`+ (i + 1) + `Selected" colspan="3" style="padding:0;"><textarea style="width: -webkit-fill-available; padding: 5px; background: rgb(241, 241, 241); resize: vertical;"></textarea></td>
                      <td id="D`+ (i + 1) + `Photo" colspan="2" style="text-align: center;background-color: grey;color: white;"><ion-icon name="image-outline"></ion-icon></td>
                    </tr>
                  </tbody>
                </table>
                </div>
                <div id="panel`+ (i + 1) + `1" class="panel1" style="display: none;">
                  <table class="descriptionNew">
                    <thead>
                      <tr>
                        <th>S#</th>
                        <th>C</th>
                        <th>E</th>
                        <th colspan="2">Opening size/Scope of Work</th>
                        <th>Price&nbsp;&nbsp; <input id="D`+ (i + 1) + `PCheck" type="checkbox" checked>
                        </th>
                        <th>Qty&nbsp;&nbsp; <input id="D`+ (i + 1) + `QCheck" type="checkbox" checked>
                        </th>
                        <th>Total</th>
                        <th>+/-</th>
                      </tr>
                    </thead>
                    <tbody id="D`+ (i + 1) + `TB">
                      `+ temp.slice(start, end).join('') + `
                    </tbody>
                  </table>
                </div>
                <div id="panel`+ (i + 1) + `2" class="panel2" style="display: none;">
                  <table class="descriptionNew">
                    <tbody id="D`+ (i + 1) + `TTB">
                      <tr id="D`+ (i + 1) + `TTR1">
                        <th colspan="3">Total</th>
                        <td></td>
                        <td style="text-align: right;"></td>
                      </tr><tr id="D`+ (i + 1) + `TTR2">
                        <th colspan="3">Vat @ 10%</th>
                        <td></td>
                        <td style="text-align: right;"></td>
                      </tr>
                      <tr id="D`+ (i + 1) + `TTR3">
                        <th colspan="3">
                          <button onclick="specialPriceOn(`+ (i + 1) + `)">
                            <ion-icon name="git-compare-outline" role="img" class="md hydrated" aria-label="git compare outline"></ion-icon>
                          </button>&nbsp;&nbsp;Grand Total
                        </th>
                        <td></td>
                        <td style="text-align: right;"></td>
                      </tr>
                      <tr id="D`+ (i + 1) + `TTR4">
                        <td colspan="5"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div id="panel`+ (i + 1) + `3" class="panel2">
                 <table class="descriptionNew">
                  <thead>
                    <tr>
                      <th colspan="3">Costing</th>
                    </tr>
                  </thead>
                  <tbody id="costingBodyD`+ (i + 1) + `">
                    <tr id="D`+ (i + 1) + `CR1">
                      <th>Material, Manpower, and other Cost</th> <td></td> <td></td>
                    </tr>
                    <tr id="D`+ (i + 1) + `CR2">
                      <th>Discount Margin</th> <td contenteditable="true" oninput="marginCalC(`+ (i + 1) + `)">10.00</td><td style="text-align: right;"></td>
                    </tr>
                    <tr id="D`+ (i + 1) + `CR3">
                      <th>Discount Given</th> <td></td> <td style="text-align: right;"></td>
                    </tr>
                    <tr id="D`+ (i + 1) + `CR4">
                      <th>Profit Margin</th> <td contenteditable="true" oninput="marginCalC(`+ (i + 1) + `)">30.00</td> <td style="text-align: right;"></td>
                    </tr>
                    <tr id="D`+ (i + 1) + `CR5">
                      <th>Total</th> <td></td> <td style="text-align: right;"></td>
                    </tr>
                    <tr id="D`+ (i + 1) + `CR6">
                      <th>VAT</th> <td>10%</td> <td style="text-align: right;"></td>
                    </tr>
                    <tr id="D`+ (i + 1) + `CR7">
                      <th>Grand Total</th> <td></td> <td style="text-align: right;"></td>
                    </tr>
                  </tbody>
                </table>
                </div>
              </div>
                `)

                        if (i != allData[1].length) {
                            $('#addButton' + i).css('display', 'none')
                            $('#removeButton' + i).css('display', 'none')
                        }

                        if (i == 0) { $('#removeButton1').remove() }

                        if (i == (allData[1].length - 1)) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Done!',
                                showConfirmButton: false,
                                timer: 1000
                            })
                        }
                        else {
                            start = allData[1][i][0] + start;
                            end = end + allData[1][i + 1][0];
                        }
                        dimensionCalc((i + 1) + "1")
                    }

                    Swal.fire(
                        'Done',
                        'Data tabulated',
                        'success'
                    )
                }).bulkUpload()
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            Swal.fire(
                'Cancelled',
                'Bulk download halted.',
                'error'
            )
        }
    });
});

function redoQuote(qNo, id) {

    var url = "//docs.google.com/document/d/" + id + "/edit"
    var openWindow = window.open("https:" + url, 'popup')

    Swal.close();

    Swal.fire({
        title: 'Confirmation needed!',
        text: 'Done customizing?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Done',
        allowEscapeKey: false,
        allowOutsideClick: false,
    }).then((result) => {

        if (result.isConfirmed) {
            var hook = "https://";
            var swalHtmlContent = `<img src='` + hook + `cdn.dribbble.com/users/1204495/screenshots/11563915/media/8c8a32cee54576be99f304d6098fd464.gif' style="width:200px">`;

            Swal.fire({
                title: 'Customization in progress',
                text: 'Please wait...',
                html: swalHtmlContent,
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                showCancelButton: false,
            });

            try { openWindow.close() }
            catch (e) { console.log(e) }

            google.script.run.withSuccessHandler(
                function (costingWordID) {
                    google.script.run.withSuccessHandler(
                        function (check) {
                            if (check == 3000) {
                                Swal.close();
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Please contact the admin!',
                                    icon: 'error',
                                    showConfirmButton: 'true',
                                });
                            }
                            else {
                                Swal.close();

                                swalHtmlContent = `<div style="display:flex;align-items: center;">
              <img src='`+ hook + `content.presentermedia.com/content/animsp/00007000/7028/press_on_screen_anim_md_nwm_v2.gif' style="width:200px;">
              <div>
              <button style="padding: 10px;
                margin: 10px 0px 0px;
                background-color: grey;
                color: white;
                cursor:pointer" onclick="window.open('`+ hook + `drive.google.com/file/d/` + check + `/view','_blank')" >Quotation updated: ` + qNo + `</button>
                <button style="padding: 10px;
                margin: 10px 0px 0px;
                background-color: grey;
                color: white;
                cursor:pointer" onclick="redoCostingQuote('`+ qNo + `','` + costingWordID + `')" >Customize Costing Quote</button>
                </div>
                </div>`;

                                Swal.fire({
                                    title: "Quotation Customized",
                                    html: swalHtmlContent,
                                    showConfirmButton: true,
                                    allowOutsideClick: false,
                                    allowEscapeKey: false,
                                    confirmButtonText: 'Done',
                                }).then((result) => {
                                    if (result.isConfirmed) {

                                        Swal.fire({
                                            title: "Quotation Generation Complete",
                                            showConfirmButton: false,
                                            timer: 1000,
                                            icon: "success",
                                        })

                                        screenReset(1)

                                        setTimeout(() => { qStatusTableRefresh() }, 30000);

                                    }
                                })
                            }
                        }).redoQuoteClientSide(qNo)
                }).quotationCostingSplitFormat(globalAllData, 0)
        }
        else {
            google.script.run.quotationCostingSplitFormat(globalAllData, 1)

            Swal.fire({
                text: 'Customization Cancelled',
                icon: 'warning',
            });
        }
    });
}

function redoCostingQuote(qNo, costingWordID) {
    var url = "//docs.google.com/document/d/" + costingWordID + "/edit"
    var openWindow = window.open("https:" + url, 'popup')

    Swal.close();

    Swal.fire({
        title: 'Confirmation needed!',
        text: 'Done customizing?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Done',
        allowEscapeKey: false,
        allowOutsideClick: false,
    }).then((result) => {

        if (result.isConfirmed) {
            var hook = "https://";
            var swalHtmlContent = `<img src='` + hook + `cdn.dribbble.com/users/1204495/screenshots/11563915/media/8c8a32cee54576be99f304d6098fd464.gif' style="width:200px">`;

            Swal.fire({
                title: 'Costing Quote Customization in Progress',
                text: 'Please wait...',
                html: swalHtmlContent,
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                showCancelButton: false,
            });


            google.script.run.withSuccessHandler(
                function (check) {
                    if (check == 3000) {
                        Swal.close();
                        Swal.fire({
                            title: 'Error!',
                            text: 'Please contact the admin!',
                            icon: 'error',
                            showConfirmButton: 'true',
                        });
                    }
                    else {
                        Swal.close();
                        try { openWindow.close() }
                        catch (e) { console.log(e) }

                        swalHtmlContent = `<div style="display:flex;align-items: center;">
              <img src='`+ hook + `content.presentermedia.com/content/animsp/00007000/7028/press_on_screen_anim_md_nwm_v2.gif' style="width:200px;">
              <div>
              <button style="padding: 10px;
                margin: 10px 0px 0px;
                background-color: grey;
                color: white;
                cursor:pointer" onclick="window.open('`+ hook + `drive.google.com/file/d/` + check + `/view','_blank')" >Costing Quote updated: ` + qNo + `</button>
                </div>
                </div>`;

                        Swal.fire({
                            title: "Quotation Customized",
                            html: swalHtmlContent,
                            showConfirmButton: true,
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            confirmButtonText: 'Close',
                        }).then((result) => {
                            if (result.isConfirmed) {

                                Swal.fire({
                                    title: "Quotation Generation Complete",
                                    showConfirmButton: false,
                                    timer: 1000,
                                    icon: "success",
                                })

                                screenReset(1)

                                setTimeout(() => { qStatusTableRefresh() }, 30000);

                            }
                        })
                    }
                }).redoCostingQuoteClientSide(qNo, costingWordID)






        }

    })





    console.log(qNo + " " + costingWordID)
}


function openForm() {
    $('.complaint-open-button').hide()
    $('#complaint-myForm').animate({ 'bottom': '0' }, "fast")
}

function closeForm() {
    $('.complaint-open-button').show()
    $('#complaint-myForm').animate({ 'bottom': '-1000px' }, "fast")
}

function saveChangesComplaintEntry() {

    Swal.fire({
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
    })

    var data = []

    $('#complaint-formInput').find('input').each(function () {
        data.push($(this).val())
    });



    for (var i = 0; i < 8; i++) {
        if (i == 0) { data[i] = ('V ' + data[i]) }
        else if (i == 1) { data[i] = ('R ' + data[i]) }
        else if (i == 2) { data[i] = ('B ' + data[i]) }
    }
    data.push('')


    google.script.run.withSuccessHandler(function e(lastTicketNumber) {
        data.unshift(lastTicketNumber + 1)
        var number = data[6]
        var message = "Dear%20valued%20customer%2C%20%0A%2AGreetings%20from%20Al%20Nisr%20Aluminium%2A%0A%0AYour%20complaint%20has%20been%20registered%20%28Ticket%20No%3A%20%2A" + (lastTicketNumber + 1) + "%2A%29%20in%20our%20system%2C%20you%20will%20be%20getting%20a%20call%20from%20our%20Technicians%20shortly%20Please%20make%20use%20of%20the%20ticket%20number%20for%20enquiries%20regarding%20the%20present%20complaint%0AYou%20can%20contact%20our%20supervisor%20at%20%2A%2B973%203605%209108%2A%20for%20any%20further%20assistance.%0A%0A%D8%B4%D9%83%D8%B1%D9%8B%D8%A7%20%D9%84%D9%83"

        $('#complaint-formInput').find('input').eq(0).val(data.join(' / '))

        var textArea = $('#complaint-formInput').find('input').eq(0)
        textArea.focus();
        textArea.select();
        document.execCommand('copy')

        google.script.run.saveResponseComplaintEntry(data)

        $('#complaint-formInput').find('input').each(function () {
            data.push($(this).val(''))
        });

        if (number != "") {
            window.open('https://web.whatsapp.com/send?phone=+973' + number + '&text=' + message, '_blank');
        }

    }).getLastTicketNumber();
}
