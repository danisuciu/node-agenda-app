function getRow(person) {
    return "<tr>" +
        "<td>" + person.firstName + "</td>" +
        "<td>" + person.lastName + "</td>" +
        "<td>" + person.phone + "</td>" +
        `<td>` +
        `<a href='#'  data-id='${person.id}' class='delete'> &#10006;</a>`  +
        `<a href='#' data-id='${person.id}' class='edit'>&#9998;</a>` +
        `</td>` +
        "</tr>";
}

function loadContacts() {
    $.ajax({
        url: '/phone-book',
        method: "GET"
    }).done(function (persons) {
        console.info('done:', persons);
        display(persons);
    });
}

function deleteContact (id) {
    $.ajax({
        url: '/phone-book/delete',
        method: "POST",
        data: {
            id: id
        }
    }).done(function (persons) {
        console.warn('done:', persons);
        display(persons);
    });

}

function saveContact (person) {
    $.ajax({
        url: '/phone-book/update',
        method: "POST",
        data: person
    }).done(function (persons) {
        console.warn('done:', persons);
        display(persons);
    });

}

function bindEvents() {
    $('#phone-book tbody').delegate('a.edit', 'click', function () {
        var id = $(this).data('id');

        editContact(id);
    });

    $('#phone-book tbody').delegate('a.delete', 'click', function () {
        var id = $(this).data('id');

        deleteContact(id);
    });
}

function getActionRow() {
    return '<tr>' +
        '<td><input type="text" required name="firstName" placeholder="Enter first name"></td>' +
        '<td><input type="text" name="lastName" placeholder="Enter last name"></td>' +
        '<td><input type="text" required name="phone" placeholder="Enter phone"></td>' +
        '<td><button type="submit">Save</button></td>' +
        '</tr>';
}

function display(persons) {
    window.persons = persons;
    var rows = '';

    // persons.forEach(function (person) {
    //     rows += getRow(person);
    // });
    // persons.forEach((person) => {
    //     rows += getRow(person);
    // });
    // persons.forEach(person => {
    //     rows += getRow(person);
    // });
    persons.forEach(person => rows += getRow(person));

    console.info(rows);

    rows += getActionRow();

    $('#phone-book tbody').html(rows);
}

function editContact(id) {
    var editPerson = persons.find(function (person) {
        console.log(person.firstName);
        return person.id == id;
    });
    console.warn('edit', editPerson);

    $('input[name=firstName]').val(editPerson.firstName);
    $('input[name=lastName]').val(editPerson.lastName);
    $('input[name=phone]').val(editPerson.phone);

    $( ".add-form" ).submit(function( event ) {
        event.preventDefault();
        const person = {
          id: id,
          firstName: $('input[name=firstName]').val(),
          lastName: $('input[name=lastName]').val(),
          phone: $('input[name=phone]').val(),
        };

        saveContact(person);
    });
}

var persons = [];
console.info('loading persons');
loadContacts();
bindEvents(persons);