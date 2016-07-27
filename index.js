$(document).on('ready', function () {
  // default date to today
  $('#date').val((new Date()).toISOString().split(/T/)[0])

  var hasDownloadSupport = (window.Blob && window.URL);

  function section(e) {
    var s = null;
    if (e instanceof jQuery) {
      s = '[b][u]'+e.val()+'[/u][/b]\n';
    } else {
      s = '[b][u]'+e+'[/u][/b]\n';
    }
    return s;
  }
  function bolded(e) {
    var s = null;
    if (e instanceof jQuery) {
      s = '[b]'+e.val()+'[/b]';
    } else {
      s = '[b]'+e+'[/b]';
    }
    return s;
  }
  function italic(e) {
    var s = null;
    if (e instanceof jQuery) {
      s = '[i]'+e.val()+'[/i]';
    } else {
      s = '[i]'+e+'[/i]';
    }
    return s;
  }
  function text(e) {
    var s = null;
    if (e instanceof jQuery) {
      s = ''+e.val()+'';
    } else {
      s = ''+e+'';
    }
    return s;
  }

  function createFilename() {
    var nameA = $('#name-team-a').val();
    var nameB = $('#name-team-b').val();
    var date = $('#date').val();
    var parts = ['X-Wing Playtest Report'];

    if (nameA && nameB) {
      parts.push(nameA + ' vs ' + nameB);
    }

    if (date) {
      parts.push(date);
    }

    return parts.join(' - ') + '.txt';
  }

  function generateReport() {

    var result = '';

    // Date
    result += bolded('Date of game: ');
    result += '\n';
    result += text($('#date'));
    result += '\n\n';

    // Player one
    result += section($('#name-team-a').val());
    if ($('#squad-notes-team-a').val().length) {
      result += italic($('#squad-notes-team-a'));
      result += '\n\n';
    }
    result += text($('#squad-team-a'));
    result += '\n\n';

    // Player two
    result += section($('#name-team-b').val());
    if ($('#squad-notes-team-b').val().length) {
      result += italic($('#squad-notes-team-b'));
      result += '\n\n';
    }
    result += text($('#squad-team-b'));
    result += '\n\n';

    // Who won?
    result += section('Who won?');
    if ($('#victor').val() === 'Player One') {
      result += text($('#name-team-a'));
    } else {
      result += text($('#name-team-b'));
    }
    if ($('#destroyed-team-a').val().length && $('#destroyed-team-b').val().length) {
      if ($('#victor').val() === 'Player One') {
        result += ' (' + $('#destroyed-team-a').val() + ' vs ' + $('#destroyed-team-b').val() + ')';
      } else {
        result += ' (' + $('#destroyed-team-b').val() + ' vs ' + $('#destroyed-team-a').val() + ')';
      }
    }
    if ($('#rounds').val().length) {
      result += ' on Round ' + text($('#rounds'));
    }
    if ($('#time').val().length) {
      result += ' at ' + text($('#time').val() + 'mins');
    }
    result += '\n\n';

    if ($('#match-events').val().length) {
      result += section('Play by Play');
      result += text($('#match-events'));
      result += '\n\n';
    }

    if ($('#concerns-major-usability').val().length) {
      result += section('Major usability concerns');
      result += text($('#concerns-major-usability'));
      result += '\n\n';
    }
    if ($('#concerns-major-balance').val().length) {
      result += section('Major balance concerns');
      result += text($('#concerns-major-balance'));
      result += '\n\n';
    }
    if ($('#concerns-minor-other').val().length) {
      result += section('Minor concerns');
      result += text($('#concerns-minor-other'));
      result += '\n\n';
    }

    return result;

  }

  $('#submit').on('click', function (event) {
    event.preventDefault();

    $('#report').html(generateReport());
    $('#completed').show();
  });

  if (hasDownloadSupport) {
    $('#download').removeClass('hide');

    var downloadLink = document.getElementById('download');

    downloadLink.addEventListener('click', function () {
      var result = generateReport();
      var file = new Blob([result], {type: 'text/plain'});

      downloadLink.href = URL.createObjectURL(file);
      downloadLink.download = createFilename();
    }, false);
  }

});
