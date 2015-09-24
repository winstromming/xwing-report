$(document).on('ready', function () {

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

  $('#submit').on('click', function (event) {

    event.preventDefault();

    var result = '```\n';

    result += bolded('Date of playtest: ');
    result += italic($('#date'));
    result += '\n';

    result += bolded('Components tested: ');
    result += italic($('#components-tested'));
    result += '\n\n';

    result += section('Squad Composition (Team A - ' + $('#name-team-a').val() + ')');
    result += '\n';
    result += text($('#squad-team-a'));
    result += '\n\n';
    if ($('#squad-notes-team-a').val().length) {
      result += bolded('Notes: ');
      result += italic($('#squad-notes-team-a'));
      result += '\n\n';
    }

    result += section('Squad Composition (Team B - ' + $('#name-team-b').val() + ')');
    result += '\n';
    result += text($('#squad-team-b'));
    result += '\n\n';
    if ($('#squad-notes-team-b').val().length) {
      result += bolded('Notes: ');
      result += italic($('#squad-notes-team-b'));
      result += '\n\n';
    }

    result += section('Match Record');
    result += '\n';
    result += bolded('Victor: ');
    result += text($('#victor'));
    result += '\n';
    if ($('#destroyed-team-a').val().length && $('#destroyed-team-b').val().length) {
      result += bolded('Points destroyed: ');
      result += text($('#destroyed-team-a').val() + ' (Team A) vs ');
      result += text($('#destroyed-team-b').val() + ' (Team B)');
      result += '\n';
    }
    if ($('#rounds').val().length) {
      result += bolded('Total rounds: ');
      result += text($('#rounds'));
      result += '\n';
    }
    if ($('#time').val().length) {
      result += bolded('Total time: ');
      result += text($('#time').val() + 'mins');
      result += '\n';
    }
    result += '\n';

    result += section('Data Skewing');
    result += '\n';
    result += bolded('Luck Skew: ');
    result += text($('#luck-skew'));
    result += text(' in favour of ' + $('#luck-favour').val());
    result += '\n';
    result += bolded('Skill Skew: ');
    result += text($('#skill-skew'));
    result += text(' in favour of ' + $('#skill-favour').val());
    result += '\n';
    if ($('#notes-skew').val().length) {
      result += italic($('#notes-skew'));
      result += '\n';
    }
    result += '\n';

    result += section('Match Events (ships destroyed per round)');
    result += text($('#match-events'));
    result += '\n\n';

    if ($('#team-a-notes').val().length || $('#team-b-notes').val().length) {
      result += section('Player Notes');
      result += '\n';
      if ($('#team-a-notes').val().length) {
        result += bolded('Team A:');
        result += '\n';
        result += italic($('#team-a-notes'));
        result += '\n\n';
      }
      if ($('#team-b-notes').val().length) {
        result += bolded('Team B:');
        result += '\n';
        result += italic($('#team-b-notes'));
        result += '\n';
      }
    }

    result += '```';

    $('#report').html(result);
    $('#completed').show();

  });

});
