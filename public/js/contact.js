$(document).ready(function prepareForm() {
  var $contactForm = $('#contactForm');

  function handleError(error) {
    const message = error ? error : 'Oops! There was an error. Check the form and try again.';

    $('#errors').html(`<div class="alert alert-warning">${message}</div><div class="space-2"></div>`);
    $('#submit').val('Send');
  }

  $contactForm.submit(function handleSubmit(e) {
    var data = $(this).serialize();

    e.preventDefault();

    $.ajax({
      url: '/contact',
      method: 'POST',
      data: data,
      dataType: 'json',
      beforeSend: function beforeSend() {
        $('#errors').html('');
        $('#submit').val('Sending...');
      },
      success: function handleSuccess(res) {
        if (!res.success) {
          handleError(res.error);
        } else {
          $('#errors').html('<div class="alert alert-success">Your meessage has been sent! We will get back to you as soon as possible.</div>');
          $contactForm.slideUp(200);
        }
      },
      error: handleError,
    });
  });
});
