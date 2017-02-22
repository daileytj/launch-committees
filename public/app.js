'use strict';

/* global $, document, window */

$(document).ready(function() {

    // page variables
    var signinPage = $("#signin");
    var signupPage = $("#signup");
    var homepageContent = $(".homepage_main_content_wrapper");
    var outreachPage = $(".wrapper_for_outreach_committee");
    var welcomePage = $(".wrapper_for_welcome_committee");
    var foundationsPage = $(".wrapper_for_foundations_committee");
    var setupPage = $(".wrapper_for_setup_committee");
    var accountPage = $(".main_wrapper_for_account");
    var editAccountPage = $(".main_wrapper_for_edit_form");

    // collections variables
    var allPages = [homepageContent, outreachPage, welcomePage, foundationsPage, setupPage, accountPage, editAccountPage, signinPage, signupPage];
    var allPopups = [setupPage, accountPage, editAccountPage, signinPage, signupPage];

    // link variables
    var signInLink = $(".link_to_signin");
    var signUpLink = $(".link_to_signup");
    var closeSigninForm = $(".close_signin_form");
    var closeSignupForm = $(".close_signup_form");
    var closeAccountForm = $(".close_account_form");
    var closeEditForm = $(".close_edit_form");
    var signupSubmit = $(".signup_submit");
    var signinSubmit = $(".signin_submit");
    var myAccountLink = $(".link_to_account");
    var editMyAccountLink = $(".edit_user_info");
    var submitEditLink = $(".edit_submit");
    var allCommitteesLink = $(".linkToCommittees");
    var outreachCommitteeLink = $(".outreach_more_info");
    var welcomeCommitteeLink = $(".welcome_more_info");
    var foundationsCommitteeLink = $(".foundations_more_info");
    var setupCommitteeLink = $(".setup_more_info");


    function showPage(jquerySelector, page_to_appear) {
        jquerySelector.on('click', function(e) {
            e.preventDefault();
            var pages = allPages;
            pages.forEach(function(page) {
                page.addClass("hidden");
            });
            page_to_appear.removeClass("hidden");
            window.scrollTo(0, 0);
        });
    }

    function showPopup(jquerySelector, page_to_appear) {
        jquerySelector.on('click', function(e) {
            e.preventDefault();
            var pages = allPopups;
            pages.forEach(function(page) {
                page.addClass("hidden");
            });
            page_to_appear.removeClass("hidden");
            window.scrollTo(0, 0);
        });
    }

    function hidePage(jquerySelector, page_to_dissapear) {
        jquerySelector.on('click', function() {
            page_to_dissapear.addClass("hidden");
        });
    }

    function mainLinkHandler() {
        $(".launch_page_heading").on('click', function() {
            var pages = allPages;
            pages.forEach(function(page) {
                page.addClass("hidden");
            });
            homepageContent.removeClass("hidden");
        });
    }

    function committeeLinkHandler() {
        $(".link_to_committees").on('click', function() {
            var pages = allPages;
            pages.forEach(function(page) {
                page.addClass("hidden");
            });
            homepageContent.removeClass("hidden");
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

    // Home Link / All Committees Link
    mainLinkHandler();
    committeeLinkHandler();



});

// Create New Account

$(document).submit(".signup_form", function(event) {

    //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
    event.preventDefault();
    //get the value from the input box
    var first_name = $('#first_name').val();
    var last_name = $('#last_name').val();
    var signup_email = $('#signup_email').val();
    var signup_password = $('#signup_password').val();
    var confirm_signup_password = $('#confirm_signup_password').val();

    var userObject = {
        'firstName': first_name,
        'lastName': last_name,
        'email': signup_email,
        'password': signup_password
    };

    console.log(userObject);

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

// Get User Details for Account Page

$(".link_to_account").on('click', function(event) {
    event.preventDefault();

    $.ajax({
            method: 'get',
            dataType: 'json',
            contentType: 'application/json',
            url: '/users/'
        })
        .done(function(result) {
            console.log(result);
            console.log(result[0].email);
            console.log(result[0].firstName);
        })
        .fail(function(jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});
