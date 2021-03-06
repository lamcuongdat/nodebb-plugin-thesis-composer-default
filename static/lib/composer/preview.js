'use strict';

/* globals define, socket*/

define('composer/preview', function() {
	var preview = {};

	var timeoutId = 0;

	preview.render = function(postContainer, callback) {
		callback = callback || function() {};
		if (!postContainer.find('.preview-container').is(':visible')) {
			return callback();
		}

		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = 0;
		}
		var textarea = postContainer.find('textarea');

		timeoutId = setTimeout(function() {
			socket.emit('plugins.composer.renderPreview', textarea.val(), function(err, preview) {
				timeoutId = 0;
				if (err) {
					return;
				}
				preview = $(preview);
				preview.find('img:not(.not-responsive)').addClass('img-responsive');
				postContainer.find('.preview').html(preview);
				$(window).trigger('action:composer.preview');
				callback();
			});
		}, 250);
	};

	preview.matchScroll = function(postContainer) {
		if (!postContainer.find('.preview-container').is(':visible')) {
			return;
		}
		var textarea = postContainer.find('textarea');
		var preview = postContainer.find('.preview');

		if (textarea.length && preview.length) {
			var diff = textarea[0].scrollHeight - textarea.height();

			if (diff === 0) {
				return;
			}

			var scrollPercent = textarea.scrollTop() / diff;

			preview.scrollTop(Math.max(preview[0].scrollHeight - preview.height(), 0) * scrollPercent);
		}
	};

	preview.handleToggler = function(postContainer) {
		localStorage.setItem('composer:previewToggled', true);
		preview.env = utils.findBootstrapEnvironment();
		function hidePreview() {
			togglePreview(false);
			if (preview.env !== 'xs' && preview.env !=='sm') {
				localStorage.setItem('composer:previewToggled', true);
				$('.write-preview-container .write-container').parent().removeClass('hide');
				$('.write-preview-container textarea').attr('rows','13');
				$('.write-preview-container .preview-container').height($('.write-preview-container').height());
				$('.write-preview-container .preview-container').parent().addClass('hide');
			}
		}

		function showPreview() {
			togglePreview(true);
			if (preview.env !== 'xs' && preview.env !=='sm') {
				localStorage.removeItem('composer:previewToggled');
				$('.write-preview-container .preview-container').parent().removeClass('hide');
				$('.write-preview-container textarea').attr('rows','13');
				$('.write-preview-container .preview-container').height($('.write-preview-container').height());
				$('.write-preview-container .write-container').parent().addClass('hide');
			}
		}

		function togglePreview(show) {
			if (preview.env === 'xs' || preview.env ==='sm') {
				previewContainer.toggleClass('hide', false);
				writeContainer.toggleClass('maximized', false);
				showBtn.toggleClass('hide', true);
				previewContainer.toggleClass('hidden-xs hidden-sm', !show);
				writeContainer.toggleClass('hidden-xs hidden-sm', show);

				// Render preview once on mobile
				if (show) {
					preview.render(postContainer, function () {});
				}
			} else {
				previewContainer.toggleClass('hide', !show);
				writeContainer.toggleClass('maximized', !show);
				showBtn.toggleClass('hide', show);
				$('.write').focus();
			}

			preview.matchScroll(postContainer);
		}
		preview.toggle = togglePreview;

		var showBtn = postContainer.find('.write-container .toggle-preview'),
			hideBtn = postContainer.find('.preview-container .toggle-preview'),
			previewContainer = $('.preview-container'),
			writeContainer = $('.write-container');

		hideBtn.on('click', hidePreview);
		showBtn.on('click', showPreview);

		if (localStorage.getItem('composer:previewToggled') || (preview.env === 'xs' || preview.env ==='sm')) {
			hidePreview();
		} else {
			showPreview();
		}
	};

	return preview;
});