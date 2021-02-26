$(document).ready(function() {
    initSave();
});

function initSave() {
    $('div.btn-group:nth-child(1) > button:nth-child(1)').click(function (e) {
        e.preventDefault();
        $.post('saveSettings', {
            hypeSong: $('#hype').val(),
            distanceUsed: $('#audio-feedback > input:nth-child(1):checked').length === 1,
            paceUsed: $('#audio-feedback > input:nth-child(2):checked').length === 1,
            timeUsed: $('#audio-feedback > input:nth-child(3):checked').length === 1,
            kilometersUsed: $('#metric-selection > select:nth-child(2)').val() === 'Kilometers',
            milesUsed: $('#metric-selection > select:nth-child(2)').val() === 'Miles'
        }, postCallback);
    });

    function postCallback(res) {
        alert('Settings saved successfully');
    }
}