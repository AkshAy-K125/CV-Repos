function getCookie(cName) {
    const name = cName ;
    const cArr = document.cookie.split('; ');
    let res = -1;
    cArr.forEach(val => {
        if (val.split('=')[0] === name)
            res = val.split('=')[1]
    })
    return res;
}


// $(function () {

//     setTimeout(function () {

//         $('.startGif').fadeToggle()
//         $('.container').show()
//         phenoxAnimate()
//         setInterval(phenoxAnimate, 5000); 

    // if (getCookie('globalLoginCheck') === -1 )
    // {
    //     let date = new Date();
    //     date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
    //     const expires = "expires=" + date.toUTCString();
    //     document.cookie = "globalLoginCheck=1; " + expires + "; path=/";

    //     $('.startGif').fadeToggle()
    //     $('.container').show()
    //     phenoxAnimate()
    //     setInterval(phenoxAnimate, 5000); 
    // }
    // else
    // {
    //     $('.startGif').fadeToggle()
    //     $('.container').show()
    //     $('.loginModal').fadeToggle("slow");
    //     phenoxAnimate()
    //     setInterval(phenoxAnimate, 5000); 
    // }

//     }, 1000);

// })



function phenoxAnimate()
{
    $('#homepageLogo').css('position','relative').animate({
        top: '-25px'
    }, {
        duration: 2500,
    }).animate({
        top: '0px'
    },{
        duration: 2500,
    })
    
}

function showPassword()
{
    if ($('#passWordRadio').is(':checked')) { $('#passWord').attr('type', 'text') }
    else { $('#passWord').attr('type', 'password') }
}

function loaderActivate() {

    if ($('#userName').val() == '') {
        $('#userDialog').html('Please enter a valid Username')
        return;
    }
    if ($('#passWord').val() == '') {
        $('#passDialog').html('Please enter a valid Password')
        return;
    }

    $('#loaderDiv').html(`<div class="sk-cube-grid">
                  <div class="sk-cube sk-cube1"></div>
                  <div class="sk-cube sk-cube2"></div>
                  <div class="sk-cube sk-cube3"></div>
                  <div class="sk-cube sk-cube4"></div>
                  <div class="sk-cube sk-cube5"></div>
                  <div class="sk-cube sk-cube6"></div>
                  <div class="sk-cube sk-cube7"></div>
                  <div class="sk-cube sk-cube8"></div>
                  <div class="sk-cube sk-cube9"></div>
                </div>`)


    setTimeout(function () {

        $('.loginModal').fadeToggle("slow")

    }, 1000);

}
function headerDropdown(e)
{
    var dropdownDict = {
        "jobs":"jobsDrop",
        "invoices": "invoiceDrop",
    "other":"otherDrop"
    }

    if ($('#' + dropdownDict[e]).css('display') === 'none') {
        $('.headerDropDown').css('display', 'none')
        $('#' + dropdownDict[e]).slideToggle('fast').css('display', 'flex')
    }
    else
    {
        $('.headerDropDown').css('display', 'none')
    }
    
}