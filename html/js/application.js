$(function() {
  var API_SERVER = 'http://hccoin.azurewebsites.net';


  Handlebars.registerHelper('abs', function(number) {
    return Math.abs(number);
  });


  function fillTransactions(transactions) {
    var source = $('#transactions-template').html();
    var template = Handlebars.compile(source);
    $('#transactions').html(template({ transactions: transactions }));
  }

  function fillUsers(users) {
    var source = $('#users-template').html();
    var template = Handlebars.compile(source);
    $('#users').html(template({ users: users }));
  }

  function fillSend(users) {
    var source = $('#send-template').html();
    var template = Handlebars.compile(source);
    $('#send').html(template({ users: users }));
  }

  function fillEmission(emission) {
    var source = $('#emission-template').html();
    var template = Handlebars.compile(source);
    $('#emission').html(template({ emission: emission }));
  }

  $.get(API_SERVER + '/api/GetTransactions')
    .done(function(response) {
      fillTransactions(response);
    });

  $.get(API_SERVER + '/api/GetUsers')
    .done(function(response) {
      fillUsers(response);
      fillSend(response);
    });

  $.get(API_SERVER + '/api/GetEmission')
    .done(function(response) {
      fillEmission(response);
    });


  $('#send').on('submit', 'form', function(event) {
    event.preventDefault();
    data = $(this).serialize();
    $.post(API_SERVER + '/sendHCC', data);
    alert('Sent');
  });
})
