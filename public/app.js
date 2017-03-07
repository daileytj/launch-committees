'use strict';

/* global $, document, window */

$(document).ready(function() {


    // Home Link / All Committees Link
    mainLinkHandler();
    committeeLinkHandler();

    getSetupAndCleanup();
    getNewMembers();

});


// page variables
var signinPage = "#signin";
var signupPage = "#signup";
var homepageContent = ".homepage_main_content_wrapper";
var outreachPage = ".wrapper_for_outreach_committee";
var welcomePage = ".wrapper_for_welcome_committee";
var foundationsPage = ".wrapper_for_foundations_committee";
var setupPage = ".wrapper_for_setup_committee";
var accountPage = ".main_wrapper_for_account";
var editAccountPage = ".main_wrapper_for_edit_form";

// collections variables
var allPages = [homepageContent, outreachPage, welcomePage, foundationsPage, setupPage, accountPage, editAccountPage, signinPage, signupPage];
var allPopups = [setupPage, accountPage, editAccountPage, signinPage, signupPage];

// link variables
var signInLink = ".link_to_signin";
var signUpLink = ".link_to_signup";
var closeSigninForm = ".close_signin_form";
var closeSignupForm = ".close_signup_form";
var closeAccountForm = ".close_account_form";
var closeEditForm = ".close_edit_form";
var signupSubmit = ".signup_submit";
var signinSubmit = ".signin_submit";
var myAccountLink = ".link_to_account";
var editMyAccountLink = ".edit_user_info";
var submitEditLink = ".edit_submit";
var allCommitteesLink = ".linkToCommittees";
var outreachCommitteeLink = ".outreach_more_info";
var welcomeCommitteeLink = ".welcome_more_info";
var foundationsCommitteeLink = ".foundations_more_info";
var setupCommitteeLink = ".setup_more_info";


function showPage(jquerySelector, page_to_appear) {
    $(document).on('click', jquerySelector, function(e) {
        e.preventDefault();
        var pages = allPages;
        pages.forEach(function(page) {
            $(page).addClass("hidden");
        });
        $(page_to_appear).removeClass("hidden");
        window.scrollTo(0, 0);
    });
}

function showPopup(jquerySelector, page_to_appear) {
    $(document).on('click', jquerySelector, function(e) {
        e.preventDefault();
        var pages = allPopups;
        pages.forEach(function(page) {
            $(page).addClass("hidden");
        });
        $(page_to_appear).removeClass("hidden");
        window.scrollTo(0, 0);
    });
}

function hidePage(jquerySelector, page_to_dissapear) {
    $(document).on('click', jquerySelector, function() {
        $(page_to_dissapear).addClass("hidden");
    });
}

function mainLinkHandler() {
    $(".launch_page_heading").on('click', function() {
        var pages = allPages;
        pages.forEach(function(page) {
            $(page).addClass("hidden");
        });
        $(homepageContent).removeClass("hidden");
    });
}

$('.link_to_mission').on('click', function(event) {
    var pages = allPages;
    pages.forEach(function(page) {
        $(page).addClass("hidden");
    });
    $(homepageContent).removeClass("hidden");
});

function committeeLinkHandler() {
    $(".link_to_committees").on('click', function() {
        var pages = allPages;
        pages.forEach(function(page) {
            $(page).addClass("hidden");
        });
        $(homepageContent).removeClass("hidden");
    });
}

showPopup(signInLink, signinPage);
hidePage(closeSigninForm, signinPage);
// if proper information is given and form is submittable
// do
// hidePage(signinSubmit, signinPage);

showPopup(signUpLink, signupPage);
hidePage(closeSignupForm, signupPage);
// if proper information is given and form is submittable
// do
// hidePage(signupSubmit, signupPage);

// Account show / edit_submit
showPopup(myAccountLink, accountPage);
showPopup(editMyAccountLink, editAccountPage);
showPopup(submitEditLink, accountPage);
hidePage(closeAccountForm, accountPage);
hidePage(closeEditForm, editAccountPage);

// Page Links

showPage(outreachCommitteeLink, outreachPage);
showPage(welcomeCommitteeLink, welcomePage);
showPage(foundationsCommitteeLink, foundationsPage);
showPage(setupCommitteeLink, setupPage);

// Create New Account

// $(document).submit(".signup_form", function(event) {
$(".signup_form").on('submit', function(event) {

    //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
    event.preventDefault();

    //get the value from the input box
    var first_name = $('#first_name').val();
    var last_name = $('#last_name').val();
    var signup_email = $('#signup_email').val();
    var signup_password = $('#signup_password').val();
    var confirm_signup_password = $('#confirm_signup_password').val();
    var phone_number = $('#tel').val();
    var new_member = "";

    function isNewMember() {
        if ($('#new_member').is(":checked")) {
            new_member = "true";
        } else {
            new_member = "false";
        }
    }

    var committees_served = [];

    function populateCommittees() {
        var committees_checkboxes = [$('#committee_to_join_outreach'), $('#committee_to_join_welcome'), $('#committee_to_join_foundations'), $('#committee_to_join_setup')];
        var committee_title_pairing_array = ["outreach", "welcome", "foundations", "setup"];
        for (var i = 0; i < committees_checkboxes.length; i += 1) {
            if (committees_checkboxes[i].is(":checked")) {
                committees_served.push(committee_title_pairing_array[i]);
            }
        }
    }
    populateCommittees();
    isNewMember();

    var userObject = {
        'firstName': first_name,
        'lastName': last_name,
        'email': signup_email,
        'password': signup_password,
        'committeesServed': committees_served,
        'lead': "false",
        'member': "true",
        'phoneNumber': phone_number,
        'newToLaunch': new_member
    };

    $.ajax({
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(userObject),
            url: '/users/'
        })
        .done(function(result) {
            console.log(result);
        })
        .fail(function(jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});

// Get user Details for populating welcome page with new members to reach out to

function getNewMembers() {
    $.ajax({
            method: 'get',
            datatType: 'json',
            contentType: 'application/json',
            url: '/users/'
        })
        .done(function(result) {
            var renderNewMemberList = "";
            result.forEach(function(user) {
                renderNewMemberList += '<div class = "new_member_to_contact">';
                renderNewMemberList += '<input type="hidden" class="user-id" value="' + user.id + '" />';
                renderNewMemberList += '<h2>' + user.firstName + ' ' + user.lastName + '</h2>';
                renderNewMemberList += '<p>Phone Number: ' + user.phoneNumber + '</p>';
                renderNewMemberList += '<p>Email: ' + user.email + '</p>';
                renderNewMemberList += '<img src="../images/delete_icon.png" alt="X" class="delete_user">';
                renderNewMemberList += '</div>';
            });
            $('.new_members_to_contact_list').html(renderNewMemberList);
        })
        .fail(function(jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

// Get User Details for Account Page

$(document).on('click', ".link_to_account", function(event) {
    event.preventDefault();

    $.ajax({
            method: 'get',
            dataType: 'json',
            contentType: 'application/json',
            url: '/users/'
        })
        .done(function(result) {
            console.log(result);
            var renderAccountInformation = "";
            renderAccountInformation += '<p class="close_account_form">close</p>';
            renderAccountInformation += '<h1 class="accountheader">' + result[0].firstName + " " + result[0].lastName + '</h1>';
            renderAccountInformation += '<div class="user_info">';
            renderAccountInformation += '<p>Email: ' + result[0].email + '</p>';
            renderAccountInformation += '<p>Committees Served: <a href="#" class="outreach_more_info">' + result[0].committeesServed + '</a></p>';
            renderAccountInformation += '</div>';
            renderAccountInformation += '<button class="edit_user_info">Edit</button>';
            $('.account_wrapper').html(renderAccountInformation);
        })
        .fail(function(jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});

// Get setup/cleanup items

function getSetupAndCleanup() {
    $.ajax({
            method: 'get',
            datatType: 'json',
            contentType: 'application/json',
            url: '/set_up_assignment_list/'
        })
        .done(function(result) {
            var rendersetuplist = "";
            result.forEach(function(item) {
                if (item.checked == "true") {
                    rendersetuplist += '<div class = "item list_item_checked">';
                } else {
                    rendersetuplist += '<div class="item">';
                }
                rendersetuplist += '<img src="../images/check_icon.png" alt="Check" class="toggle_setup_check_item toggle_check_item">';
                rendersetuplist += '<input type="hidden" class="item-id" value="' + item.id + '" />';
                rendersetuplist += '<p>' + item.item + '</p>';
                rendersetuplist += '<img src="../images/delete_icon.png" alt="X" class="delete_item delete_setup_item">';
                rendersetuplist += '</div>';
            });
            $('.setup_item_list_container').html(rendersetuplist);
            if (result.checked) {
                $('.item').addClass('list_item_checked');
            }
        })
        .fail(function(jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

    $.ajax({
            method: 'get',
            datatType: 'json',
            contentType: 'application/json',
            url: '/clean_up_assignment_list/'
        })
        .done(function(result) {
            var rendercleanuplist = "";
            result.forEach(function(item) {
                if (item.checked == "true") {
                    rendercleanuplist += '<div class = "item list_item_checked">';
                } else {
                    rendercleanuplist += '<div class="item">';
                }
                rendercleanuplist += '<img src="../images/check_icon.png" alt="Check" class="toggle_check_item toggle_cleanup_check_item">';
                rendercleanuplist += '<input type="hidden" class="item-id" value="' + item.id + '" />';
                rendercleanuplist += '<p>' + item.item + '</p>';
                rendercleanuplist += '<img src="../images/delete_icon.png" alt="X" class="delete_item delete_cleanup_item">';
                rendercleanuplist += '</div>';
            });
            $('.cleanup_item_list_container').html(rendercleanuplist);
            if (result.checked) {
                $('.item').addClass('list_item_checked');
            }
        })
        .fail(function(jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}
// ------------------------------------------------------------

// -                 updating list item check (WIP)

// ------------------------------------------------------------

//

// ------------------------------------------------------------

// update list item checked? for set up list
$(document).on('click', ".toggle_setup_check_item", function(event) {
    event.preventDefault();
    var itemToUpdate = $(this).next(".item-id").parent(".item");
    var itemToUpdateObject = {
        'id': $(this).next(".item-id").val(),
        'checked': 'true'
    };
    if (itemToUpdate.hasClass('list_item_checked')) {
        itemToUpdateObject.checked = "false";
    } else {
        itemToUpdateObject.checked = "true";
    }
    console.log("item to update object", itemToUpdateObject);
    $.ajax({
            method: 'put',
            datatType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(itemToUpdateObject),
            url: '/set_up_assignment_list/' + itemToUpdateObject.id
        })
        .done(function(result) {
            console.log("results", result);
            console.log("checked status: ", result.checked);
            getSetupAndCleanup();
        })
        .fail(function(jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});

$(document).on('click', ".toggle_cleanup_check_item", function(event) {
    event.preventDefault();
    var itemToUpdate = $(this).next(".item-id").parent(".item");
    var itemToUpdateObject = {
        'id': $(this).next(".item-id").val(),
        'checked': 'true'
    };
    if (itemToUpdate.hasClass('list_item_checked')) {
        itemToUpdateObject.checked = "false";
    } else {
        itemToUpdateObject.checked = "true";
    }
    console.log("item to update object", itemToUpdateObject);
    $.ajax({
            method: 'put',
            datatType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(itemToUpdateObject),
            url: '/clean_up_assignment_list/' + itemToUpdateObject.id
        })
        .done(function(result) {
            console.log("results", result);
            console.log("checked status: ", result.checked);
            getSetupAndCleanup();
        })
        .fail(function(jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});

// add item to setup/cleanup list-style

// $(document).submit(".add_setup_item_form", function(event) {
$(document).on('submit', ".add_setup_item_form", function(event) {
    //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
    event.preventDefault();
    event.stopPropagation();
    //get the value from the input box
    var setupItem = $('#setup_item_to_be_added').val();
    var setupItemObject = {
        'item': setupItem
    };
    $.ajax({
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(setupItemObject),
            url: '/set_up_assignment_list/'
        })
        .done(function(result) {
            getSetupAndCleanup();
            $('#setup_item_to_be_added').val("");
        })
        .fail(function(jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

});


// $(document).submit(".add_cleanup_item_form", function(event) {
$(document).on('submit', ".add_cleanup_item_form", function(event) {
    //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
    event.preventDefault();
    event.stopPropagation();
    //get the value from the input box
    var cleanupItem = $('#cleanup_item_to_be_added').val();
    var cleanupItemObject = {
        'item': cleanupItem
    };
    $.ajax({
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(cleanupItemObject),
            url: '/clean_up_assignment_list/'
        })
        .done(function(result) {
            getSetupAndCleanup();
            $('#cleanup_item_to_be_added').val("");
        })
        .fail(function(jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

});

// toggle item check
// $(document).on('click', '.toggle_check_item', function(event) {
//     event.preventDefault();
//     event.stopPropagation();
//     var item = $(this).closest(".item");
//     item.toggleClass('list_item_checked');
// });

// delete item from setup/cleanup list

$(document).on('click', '.delete_setup_item', function(event) {
    event.preventDefault();
    event.stopPropagation();
    var item_id_to_delete = $(this).parent().find(".item-id").val();
    $.ajax({
            method: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',
            url: '/set_up_assignment_list/' + item_id_to_delete
        })
        .done(function(result) {
            getSetupAndCleanup();
        })
        .fail(function(jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

});

$(document).on('click', '.delete_cleanup_item', function(event) {
    event.preventDefault();
    event.stopPropagation();
    var item_id_to_delete = $(this).parent().find(".item-id").val();
    $.ajax({
            method: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',
            url: '/clean_up_assignment_list/' + item_id_to_delete
        })
        .done(function(result) {
            getSetupAndCleanup();
        })
        .fail(function(jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

});

function hideAndShowMediaNav(event) {
    var nav = $('.full_nav_display');
    if (nav.hasClass('hidden_for_media_query')) {
        nav.removeClass('hidden_for_media_query');
    } else {
        nav.addClass('hidden_for_media_query');
    }
}

$('.hamburger').on('click', function(event) {
    event.preventDefault();
    $('.hamburger').addClass('hidden');
    $('.hamburger_close').removeClass('hidden');
    hideAndShowMediaNav(event);
});

$('.hamburger_close').on('click', function(event) {
    event.preventDefault();
    $('.hamburger_close').addClass('hidden');
    $('.hamburger').removeClass('hidden');
    hideAndShowMediaNav(event);
});
