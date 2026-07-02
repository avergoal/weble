$(document).ready(function () {
    $('.owl-carousel.share_slider').owlCarousel({
        loop: true,
        margin: 24,
        nav: true,
        autoWidth: true,
        items: 4,
    });
    $('.main_slider').owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        autoWidth: false,
    });
    $('.owl-carousel.search_slider').owlCarousel({
        loop: true,
        margin: 8,
        nav: true,
        autoWidth: true,
        items: 4,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });
    $('.entry_search_perent').click(function () {
        $('.search_button').addClass('active');
        $('.footer_weble').addClass('hidden');
    });

    $('.arrow_exit').click(function () {
        $('.search_button').removeClass('active');
        $('.footer_weble').removeClass('hidden');
    });
    $('.tabs__caption').on('click', '.pasiv:not(.active)', function () {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('.tabs').find('.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
    });
    $('.choice_pers_content').on('click', '.my_content:not(.active)', function () {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('.personal_content').find('.tabs_pers').removeClass('active').eq($(this).index()).addClass('active');
    });
    $('.creation_img_caption').on('click', '.creation_img:not(.active)', function () {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('.create_photo_modal').find('.ways_creation_img').removeClass('active').eq($(this).index()).addClass('active');
    });
    $('.people_tags_tab').on('click', '.people_tags:not(.active)', function () {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('.tabs_search').find('.block_search').removeClass('active').eq($(this).index()).addClass('active');
    });
    $('.hashtage_caption').on('click', '.hashtage_tab:not(.active)', function () {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('.hashtage_post').find('.hashtage_content').removeClass('active').eq($(this).index()).addClass('active');
    });
    $('.settings_view, .changes-post-click').click(function () {
        $('.types_posts_choice').toggleClass('active');
        $('body').toggleClass('hidden_body');
    });
    $('.view_classic').click(function () {
        $('.changes-post').removeClass('text-view');
        $('.changes-post').removeClass('miniature');
    });
    $('.view_miniatures').click(function () {
        $('.changes-post').removeClass('text-view');
        $('.changes-post').addClass('miniature');
    });
    $('.view_text').click(function () {
        $('.changes-post').removeClass('miniature');
        $('.changes-post').addClass('text-view');
    });
    $('.slider_bottom_img').click(function () {
        $(this).toggleClass('active');
        $('.selection_pictures_img').toggleClass('active');
        $('.selection_pictures.mt16px').toggleClass('active');
        $('.selection_slider_number').toggleClass('active');
        $('.checkbox-custom').toggleClass('active');
    });
    $('.img_opacity').click(function () {
        $('.img_opacity').removeClass('active');
        $(this).addClass('active');
    });
    $('.selection_pictures.mt16px').click(function () {
        $('.general_img').toggleClass('active');
    });
    $('.written_comment').click(function () {
        $('.written_comment_p').toggleClass('active');
    });
    $('.plus_img').click(function () {
        $(this).toggleClass('active');
        $('.minus_img').removeClass('active');
    });
    $('.minus_img').click(function () {
        $(this).toggleClass('active');
        $('.plus_img').removeClass('active');
    });
    $('.answer_open_close').click(function () {
        $('.disp_non').toggleClass('active');
        $('.disp_bloc').toggleClass('active');
        $('.comment_block.anti_row').toggleClass('active');
    });

    $('.sending_messages').click(function () {
        $(this).toggleClass('active');
        $('.writing_message, .messages_footer .arrow_exit, .messages_footer .found_option_link, .click_messages, .messages_footer .arrow_exit_text, .new_messages, .messages_footer').toggleClass('active');
    });
    $('.messages_footer .arrow_exit').click(function () {
        $(this).removeClass('active');
        $('.writing_message, .sending_messages, .messages_footer .found_option_link, .click_messages, .messages_footer .arrow_exit_text, .new_messages, .messages_footer').removeClass('active');
    });
    $('.textarea_messages').click(function () {
        $('.send_message').toggleClass('active');
    });
    $('.pers_name_text, .settings_accounts').click(function () {
        $('.acc_select_modal').addClass('active');
    });
    $('.home-moderator').click(function () {
        $('.moderator_modal').addClass('active');
        $('.moderator-tab').addClass('moderator-mode');
        $('body').addClass('hidden_body');
    });

    $('.post_bottom_share').click(function () {
        $('.post_share_modal').addClass('active');
        $('body').addClass('hidden_body');
    });



    $('.beginning_course').click(function () {
        $('.best_modal').addClass('active');
        $('body').addClass('hidden_body');
    });
    $('.complain_click').click(function () {
        $('.complain_modal').addClass('active');
        $('body').addClass('hidden_body');
    });


    $('.add_avatar').click(function () {
        $('.add_avatar_modal').addClass('active');
        $('body').addClass('hidden_body');
    });


    $('.modal_opacity, .unsubscribe_posit').click(function () {
        $('.modal').removeClass('active');
        $('body').removeClass('hidden_body');
    });
    $('.more_options_share').click(function () {
        $('.post_share_modal').removeClass('active');
        $('.share_more_modal').addClass('active');
    });
    $('.share_more, .share_more_modal .cancel_share_text').click(function () {
        $('.post_share_modal').addClass('active');
        $('.share_more_modal').removeClass('active');
    });
    $('.acc_select_opacity').click(function () {
        $('.acc_select_modal').removeClass('active');
    });
    $('.subscription_unsubscribe.none_subscribed').click(function () {
        $('.subscribe_modal').addClass('active');
    });
    $('.click-chanel.news_subscribed').click(function () {
        $('.unsubscribe_channel').addClass('active');
    });
    $('.click-chanel.none_subscribed').click(function () {
        $('.subscribe_channel').addClass('active');
    });

    $('.unsubscribe_undo').click(function () {
        $('.subscribe_modal, .unsubscribe_modal').removeClass('active');
    });
    $('.subscription_unsubscribe.news_subscribed').click(function () {
        $('.unsubscribe_modal').addClass('active');
    });
    $('.unsubscribe_tab').click(function () {
        $('.subscription_unsubscribe').removeClass('news_subscribed');
        $('.subscription_unsubscribe').addClass('none_subscribed');
    });
    $('.subscribe_tab').click(function () {
        $('.subscription_unsubscribe').addClass('news_subscribed');
        $('.subscription_unsubscribe').removeClass('none_subscribed');
    });


    $('.unsubscribe-chanel_tab').click(function () {
        $('.click-chanel').removeClass('news_subscribed');
        $('.click-chanel').addClass('none_subscribed');
    });
    $('.subscribe-chanel_tab').click(function () {
        $('.click-chanel').addClass('news_subscribed');
        $('.click-chanel').removeClass('none_subscribed');
    });






    $('.share_search_icon').click(function () {
        $('.share_search, .share_search_bottom, .share_bottom, .cancel_share_search').addClass('active');
    });
    $('.undo_search_share, .share_weble .cancel_share_text').click(function () {
        $('.share_search, .share_search_bottom, .share_bottom, .cancel_share_search').removeClass('active');
    });

    $('.message_dialog .textarea_messages').click(function () {
        $('.send_message, .dialog_block, .keyboard, .message_dialog .send_message').addClass('active');
    });

    // $('.main_slider, .main_search_slider, .share_slider').bind(
    //     'touchmove',
    //     function (e) {
    //         e.preventDefault();
    //     }
    // );

    $("#gallery li img").hover(function () {
        $('.main-img').attr('src', $(this).attr('src').replace('thumb/', ''));
    });
    var imgSwap = [];
    $("#gallery li img").each(function () {
        imgUrl = this.src.replace('thumb/', '');
        imgSwap.push(imgUrl);
    });
    $.fn.preload = function () {
        this.each(function () {
            $('<img/>')[0].src = this;
        })
    };
    $('.select2').select2({
        theme: "classic",
    });

    $('.number-phone').mask("+7 999 999-99-99");
    $('.my-image').croppie();
});

