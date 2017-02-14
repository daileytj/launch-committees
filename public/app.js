'use strict';

/* global $, document, window */

$(document).ready(function() {

var signinPage = $("#signin");
var signupPage = $("#signup");
var closeSigninForm = $(".close_signin_form");
var closeSignupForm = $(".close_signup_form");
var closeAccountForm = $(".close_account_form");
var closeEditForm = $(".close_edit_form");
var signupSubmit = $(".signup_submit");
var signinSubmit = $(".signin_submit");
var accountEditButton = $(".edit_user_info");
var saveAccountInfoButton = $(".edit_submit");


var homepageContent = $(".homepage_main_content_wrapper");
var outreachCommitteeLink = $(".outreach_more_info");
var outreachPage = $(".wrapper_for_outreach_committee");
var welcomeCommitteeLink = $(".welcome_more_info");
var welcomePage = $(".wrapper_for_welcome_committee");
var foundationsCommitteeLink = $(".foundations_more_info");
var foundationsPage = $(".wrapper_for_foundations_committee");
var setupCommitteeLink = $(".setup_more_info");
var setupPage = $(".wrapper_for_setup_committee");

var accountPage = $(".main_wrapper_for_account");
var editAccountPage = $(".main_wrapper_for_edit_form");

    function showPage(jquerySelector, page_to_appear) {
        jquerySelector.on('click', function(e) {
            e.preventDefault();
            page_to_appear.removeClass("hidden");
            window.scrollTo(0,0);
        });
    }

    function hidePage(jquerySelector, page_to_dissapear){
        jquerySelector.on('click', function(){
            page_to_dissapear.addClass("hidden");
        });
    }

    function linkToCommittee(link, page_to_link_to){
            link.on('click', function(){
                homepageContent.addClass("hidden");
                page_to_link_to.removeClass("hidden");
                window.scrollTo(0,0);
            });
    }

    function mainLinkHandler(){
        $(".launch_page_heading").on('click', function(){
            homepageContent.removeClass("hidden");
            var pages = [outreachPage, welcomePage, foundationsPage, setupPage, accountPage, editAccountPage];
            pages.forEach(function(page){
                page.addClass("hidden");
            });
        });
    }

    function committeeLinkHandler(){
        $(".link_to_committees").on('click', function(){
            homepageContent.removeClass("hidden");
            var pages = [outreachPage, welcomePage, foundationsPage, setupPage, accountPage, editAccountPage];
            pages.forEach(function(page){
                page.addClass("hidden");
            });
        });
    }

    showPage($(".link_to_signin"),signinPage);
    hidePage($(".link_to_signin"),signupPage);
    hidePage(closeSigninForm, signinPage);
    // if proper information is given and form is submittable
    // do
    // hidePage(signinSubmit, signinPage);

    showPage($(".link_to_signup"),signupPage);
    hidePage($(".link_to_signup"),signinPage);
    hidePage(closeSignupForm, signupPage);
    // if proper information is given and form is submittable
    // do
    // hidePage(signupSubmit, signupPage);

    // Account show / edit_submit
    showPage($(".link_to_account"), accountPage);
    showPage($(".edit_user_info"), editAccountPage);
    showPage($(".edit_submit"), accountPage);
    hidePage(closeAccountForm, accountPage);
    hidePage(closeEditForm, editAccountPage);
    // Page Links
    linkToCommittee(outreachCommitteeLink,outreachPage);
    linkToCommittee(welcomeCommitteeLink, welcomePage);
    linkToCommittee(foundationsCommitteeLink,foundationsPage);
    linkToCommittee(setupCommitteeLink,setupPage);

    committeeLinkHandler();
    mainLinkHandler();
});
