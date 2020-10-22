const grids = document.querySelectorAll('.grid');
const headings = document.querySelectorAll('.heading .wrapper .text');
const dots = document.querySelectorAll('.heading .wrapper .dots ul li .dot');

const dotsColorsClasses = [
  'dot-blue',
  'dot-green-light',
  'dot-yellow',
  'dot-green-dark',
];

function enterScreen(index) {
  const grid = grids[index];
  const heading = headings[index];
  const dot = dots[index];
  const gridColumns = grid.querySelectorAll('.column');

  grid.classList.add('active');

  gridColumns.forEach(element => {
    element.classList.remove('animate-before', 'animate-after');
  });

  heading.classList.remove('animate-before', 'animate-after');

  dot.classList.add(dotsColorsClasses[index]);
}

function exitScreen(index, exitDelay) {
  const grid = grids[index];
  const heading = headings[index];
  const dot = dots[index];
  const gridColumns = grid.querySelectorAll('.column');

  gridColumns.forEach(element => {
    element.classList.add('animate-after');
  });

  heading.classList.add('animate-after');

  dot.classList.remove(
    'dot-blue',
    'dot-green-light',
    'dot-yellow',
    'dot-green-dark',
  );

  setTimeout(() => {
    grid.classList.remove('active');

    heading.classList.add('animate-before');
    heading.classList.remove('animate-after');

    gridColumns.forEach(element => {
      element.classList.add('animate-before');
      element.classList.remove('animate-after');
    });
  }, exitDelay);
}

function setupAnimationCycle({ timePerScreen, exitDelay }) {
  const cycleTime = timePerScreen + exitDelay;
  let nextIndex = 0;

  function nextCycle() {
    const currentIndex = nextIndex;

    enterScreen(currentIndex);

    setTimeout(() => exitScreen(currentIndex, exitDelay), timePerScreen);

    nextIndex = nextIndex >= grids.length - 1 ? 0 : nextIndex + 1;
  }

  setInterval(nextCycle, cycleTime);
}

setupAnimationCycle({
  timePerScreen: 2000, // ms
  exitDelay: 200 * 7, // ms
});
