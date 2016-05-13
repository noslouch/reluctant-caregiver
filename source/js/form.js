/* global $ */
'use strict';
$(function() {
  function redirect(destination = '/contact/thanks') {
    window.location.assign(destination);
  }

  function flatten(array) {
    var newArray = [];
    array.forEach(i => i ? newArray.push(i) : null);
    return newArray;
  }

  function validate(field) {
    let val = $(`input[name=${field}]`).val()
    return !val ? field : null;
  }

  function displayError(errorField) {
    $(`[name=${errorField}]`)
      .parent().siblings('.form-error').text('Please fill in this field');
  }

  function clearErrors(fields) {
    fields.forEach(field => {
      $(`[name=${field}]`)
        .parent().siblings('.form-error').text('');
    });
  }

  function checkFields($form) {
    let fields = ['fromName', 'relationship', 'disease', 'fromEmail'];
    let $honeypot = $form.find('#boogabooga');
    if ($honeypot.val()) {
      return redirect();
    }
    clearErrors(fields);
    let errors = flatten(fields.map(validate));
    if (errors.length) {
      errors.forEach(displayError);
      return false;
    } else {
      return true;
    }
  }

  $('#contactForm').submit(function(e) {
    e.preventDefault();
    let $form = $(this);
    let allGood = checkFields($form);
    if (!allGood) {
      return;
    }
    let name = $form.find('input[name="fromName"]').val();
    let destination = `/contact/thanks?from=${name}`;
    let data = $form.serialize();
    let url = $form.attr('action');
    $.ajax(url, {method: 'POST', data})
      .then(redirect.bind(null, destination));
  })
});
