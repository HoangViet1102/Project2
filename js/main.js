let interval, pomodoros = 0;
const displayTimer = $('#timer'), controlBtn = $('#controlButton');

controlBtn.addEventListener('click', () => timerIsRunning() ? stopTimer() : startTimer());

const timerIsRunning = () => controlBtn.value === 'STOP';

const startTimer = () => {
    interval = setInterval(() => {
        timerInSeconds--;
        updateDisplayTimer(formatTimer());
        setPageTitle(`${formatTimer()} - ${getActiveTab()}`);
        if (timerInSeconds === 0) resetTimer();
    }, 1000);
    setButtonText('STOP');
    playAudio('button-press.wav');
}

const stopTimer = () => {
    clearInterval(interval);
    setButtonText('START');
    setPageFavicon('favicon-pause');
    playAudio('button-press.wav');
}

const formatTimer = () => {
    const minutes = secondsToMinutes(timerInSeconds);
    const seconds = timerInSeconds % 60;

    const minutesZeroLeft = String(minutes).padStart(2, '0')
    const secondsZeroLeft = String(seconds).padStart(2, '0')

    return `${minutesZeroLeft}:${secondsZeroLeft}`;
}

const updateDisplayTimer = value => displayTimer.innerText = value;

const resetTimer = () => {
    stopTimer();
    timerInSeconds = minutesToSeconds(timeInMinutes);
    updateDisplayTimer(formatTimer());

    if (getActiveTab() === 'Pomodoro') {
        pomodoros++;
        pomodoros % 4 === 0 ? getTab('Long Break').click() : getTab('Short Break').click();
    } else {
        getTab('Pomodoro').click();
    }

    setPageTitle(getActiveTab());
    playAudio('alarm-kitchen.mp3');
}

