
'use strict';
$(document).ready(init);


var contacts = localStorage.contacts ? JSON.parse(localStorage.contacts) : [];
updateContacts();

function init(){
  $('#submit').on('click', submitContact)
  $('#contacts').on('click', '.remove', removeContact)
  $('#contacts').on('click', '.edit', editContact)
  $('.submit').on('click', saveContact)
}
var editIndex;
function editContact(){
  var editRow = $(event.target).closest('tr')
  editIndex = editRow.index()
  var currName = editRow.children('.name').text();
  var currEmail = editRow.children('.email').text();
  var currNum = editRow.children('.phone').text();
  var currAddress = editRow.children('.address').text();

  console.log(currName)
  $('.newName').val(currName);
  $('.newEmail').val(currEmail);
  $('.newPhone').val(currNum);
  $('.newAddress').val(currAddress)

}

function saveContact(){
  var currContact = contacts[editIndex]
  currContact.name = $('.newName').val();
  currContact.email = $('.newEmail').val();
  currContact.number = $('.newPhone').val();
  currContact.address = $('.newAddress').val();
  console.log(contacts[editIndex].name)
  updateContacts();
  saveStorage();

}

function removeContact(event){
  var $target = $(event.target);
  var $targetContact = $target.closest('tr');

  var rowIndex = $targetContact.index();

  contacts.splice(rowIndex, 1);

  updateContacts();
  saveStorage();
}

function updateContacts(){
  console.log(contacts);
  $('#contacts').empty();

  if (contacts.length){
    $('#contacts').fadeIn(1500);
  } else {
    $('#contacts').hide();
  }

  var contactElements = contacts.map(function(contact){
    var $tr = $('#template').clone();
    $tr.removeAttr('id');
    $tr.children('.name').text(contact.name);
    $tr.children('.email').text(contact.email);
    $tr.children('.phone').text(contact.number);
    $tr.children('.address').text(contact.address);
    $tr.fadeIn(1500);
    console.log($tr);
    return $tr;

  });
  console.log(contactElements)
  $('#contacts').append(contactElements);
}

function submitContact(){
  var name = $('#name').val();
  var email = $('#email').val();
  var phoneNum = $('#phone').val();
  var address = $('#address').val();

  var contact = {

    name: name,
    email: email,
    number: phoneNum,
    address: address
  };

  contacts.push(contact)

  updateContacts();
  saveStorage();

}

function saveStorage(){
  localStorage.contacts = JSON.stringify(contacts);
}


