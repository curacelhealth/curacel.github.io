{
  "use strict";


  // utils
  // ===============================================================================================

  const pipe = (...functions) => arg => functions.reduce((a, b) => b(a), arg);

  const define = (object, property, value) =>
    Object.defineProperty(object, property, {
      value,
      writable: true,
      configurable: true,
      enumerable: true
    });

  const first = list => list[0];

  const last = list => list[list.length - 1];

  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min)) + min;

  const interval = (callback, delay) => {
    const tick = now => {
      if (now - start >= delay) {
        start = now;
        callback();
      }
      requestAnimationFrame(tick);
    };
    let start = performance.now();
    requestAnimationFrame(tick);
  };


  // easing equations
  // ===============================================================================================

  const easeInQuart = (t, b, c, d) =>
    c * (t/=d) * Math.pow(t, 3) + b;

  const easeOutQuart = (t, b, c, d) =>
    -c * ((t=t/d-1) * Math.pow(t, 3) - 1) + b;

  const easeInOutQuart = (t, b, c, d) => {
    if ((t/=d/2) < 1) return c/2 * Math.pow(t, 4) + b;
    return -c/2 * ((t-=2) * Math.pow(t, 3) - 2) + b;
  };

  const easeInOutBack = (t, b, c, d, s) => {
    if (s == undefined) s = 1.70158;
    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
  };

  const easeOutElastic = (t, b, c, d, frequency = 700) => {
    if (t == 0 || c == 0) return b;
    if ((t /= d) == 1) return b + c;
    const a = c;
    const p = d * (1 - Math.min(frequency, 999) / 1000);
    const s = a < Math.abs(c) ? p / 4 : p / (2 * Math.PI) * Math.asin(c / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
  };


  // explore the stack hover animation
  // ===============================================================================================

  {
    const intro = document.getElementById("intro");

    const listPoints = string => string.split(" ").map(Number);

    let attributes = {
      polygon: [{
        points: listPoints("10.4 7 5.8 10.7 7.1 12.3 13.6 7 7.1 1.7 5.8 3.3")
      }],
      rect: [{
        x: 2,
        y: 6,
        width: 9
      }]
    };

    const elements = Object.keys(attributes).reduce((object, shape) =>
      define(object, shape, intro.querySelector(`ul ${shape}`)), {});

    if (elements.polygon && elements.rect) {
      attributes.polygon.push({
        points: listPoints(elements.polygon.getAttribute("points"))
      });

      attributes.rect.push(Object.keys(first(attributes.rect)).reduce((object, attribute) =>
        define(object, attribute, Number(elements.rect.getAttribute(attribute))), {}));

      const reverseAttributes = () =>
        attributes = Object.keys(attributes).reduce((object, shape) =>
          define(object, shape, [...attributes[shape]].reverse()), {});

      const getStartAttributes = () => Object.keys(attributes).reduce((object, shape) =>
        define(object, shape, last(attributes[shape])), {});

      let triggerId;
      let progress = getStartAttributes();

      const trigger = () => {
        const start = Object.assign({}, progress);
        const delta = {
          polygon: {
            points: first(attributes.polygon).points.map((point, index) =>
              point - progress.polygon.points[index])
          },
          rect: Object.keys(first(attributes.rect)).reduce((object, attribute) =>
            define(object, attribute, first(attributes.rect)[attribute] - progress.rect[attribute]), {})
        };
        const time = {
          start: performance.now(),
          total: 400
        };
        const tick = now => {
          define(time, "elapsed", now - time.start);

          progress = {
            polygon: {
              points: start.polygon.points.map((point, index) =>
                easeOutQuart(time.elapsed, point, delta.polygon.points[index], time.total))
            },
            rect: Object.keys(delta.rect).reduce((object, attribute) =>
              define(object, attribute, easeOutQuart(
                time.elapsed, start.rect[attribute], delta.rect[attribute], time.total)), {})
          };

          elements.polygon.setAttribute("points", progress.polygon.points.join(" "));
          Object.keys(progress.rect).forEach(attribute =>
            elements.rect.setAttribute(attribute, progress.rect[attribute]));

          if (time.elapsed < time.total) triggerId = requestAnimationFrame(tick);
        };

        cancelAnimationFrame(triggerId);
        reverseAttributes();
        progress = getStartAttributes();
        triggerId = requestAnimationFrame(tick);
      };

      ["mouseenter", "mouseleave"].forEach(event =>
        intro.querySelector("li:first-child a").addEventListener(event, trigger));
    }
  }


  // toolkit switches animation
  // ===============================================================================================

  {
    const findOppositeState = object => Object.keys(states).find(state => state != object.state);

    const states = {
      inactive: {
        fill: [185, 244, 188],
        cx: 27
      },
      active: {
        fill: [27, 185, 120],
        cx: 39
      }
    };

    const groups = Array.from(document.querySelectorAll("#complete-toolkit g"), (g, i) =>
      ["rect", "circle"].reduce((object, element) =>
        define(object, element, g.querySelector(element)), {
          time: {},
          state: Object.keys(states)[i]
        }));

    const toggle = object => {
      const opposite = findOppositeState(object);
      const time = { total: 700 };
      const tick = now => {
        if (time.start == null) define(time, "start", now);
        define(time, "elapsed", now - time.start);

        const rgb = states[object.state].fill.map((start, index) => {
          const delta = states[opposite].fill[index] - start;
          const progress = easeInOutQuart(time.elapsed, start, delta, time.total);
          return Math.round(progress);
        }).join(",");
        object.rect.setAttribute("fill", `rgb(${rgb})`);

        const start = states[object.state].cx;
        const delta = states[opposite].cx - start;
        const progress = easeInOutQuart(time.elapsed, start, delta, time.total);
        object.circle.setAttribute("cx", progress);

        time.elapsed < time.total ? requestAnimationFrame(tick) : define(object, "state", opposite);
      };

      requestAnimationFrame(tick);
    };

    const setRandomInterval = now => {
      groups.forEach(object => {
        const { time } = object;

        if (time.start == null) {
          define(time, "start", now);
          define(time, "delay", getRandomInt(800, 8000));
        }

        define(time, "elapsed", now - time.start);

        if (time.elapsed >= time.delay) {
          toggle(object);
          delete time.start;
        }
      });

      requestAnimationFrame(setRandomInterval);
    };

    requestAnimationFrame(setRandomInterval);
  }


  // programming languages animation
  // ===============================================================================================

  {
    const programmingLanguages = document.getElementById("programming-languages");

    const languages = [
      "clojure",
      "erlang",
      "fsharp",
      "go",
      "haskell",
      "javascript",
      "php",
      "python",
      "r",
      "ruby",
      "rust",
      "scala",
      "scheme",
      "swift"
    ];

    const getRandomLanguage = () =>
      languages[getRandomInt(0, languages.length)];

    const getRandomY = (x, min, max) => {
      if (Math.abs(x) > min) return	getRandomInt(-max, max);
      const minY = Math.sqrt(Math.pow(min, 2) - Math.pow(x, 2));
      const randomSign = Math.round(Math.random()) * 2 - 1;
      return randomSign * getRandomInt(minY, max);
    };

    const createIcon = language => {
      const icon = document.createElement("img");
      icon.alt = language;
      icon.src = `/img/v3/home/programming-languages/${language}.svg`;
      programmingLanguages.appendChild(icon);
      icon.setAttribute('aria-hidden', true);
      return icon;
    };

    const animateIcon = icon => {
      const time = { total: 12000 };
      const maxDistance = 120;
      const maxRotation = 800;
      const transform = {};
      define(transform, "translateX", getRandomInt(-maxDistance, maxDistance));
      define(transform, "translateY", getRandomY(transform.translateX, 60, maxDistance));
      define(transform, "rotate", getRandomInt(-maxRotation, maxRotation));

      const tick = now => {
        if (time.start == null) define(time, "start", now);
        define(time, "elapsed", now - time.start);
        const progress = easeOutQuart(time.elapsed, 0, 1, time.total);

        icon.style.opacity = Math.abs(1 - progress);
        icon.style.transform = Object.keys(transform).map(key => {
          const value = transform[key] * progress;
          const unit = /rotate/.test(key) ? "deg" : "px";
          return `${key}(${value}${unit})`;
        }).join(" ");

        time.elapsed < time.total
        ? requestAnimationFrame(tick)
        : programmingLanguages.removeChild(icon);
      };

      requestAnimationFrame(tick);
    };

    interval(pipe(getRandomLanguage, createIcon, animateIcon), 500);
  }


  // rotating cogwheels
  // ===============================================================================================

  {
    const findRotationCenter = element =>
      ["x", "y"].reduce((coordinates, axis) => {
        const center = `c${axis}`;
        const separator = coordinates.length ? " " : "";
        return coordinates + separator + element.nextElementSibling.getAttribute(center);
      }, "");

    const cogwheels = Array.from(
      document.querySelectorAll("#developers-first .heading-icon path"), (element, index) => ({
        element,
        center: findRotationCenter(element),
        direction: index ? -1 : 1
      }));

    const duration = 15000;
    const turn = 360;
    const state = {};

    const rotate = now => {
      if (state.start == null) define(state, "start", now);
      define(state, "elapsed", now - state.start);
      define(state, "progress", state.elapsed / duration);

      const rotation = Math.min(turn * state.progress, turn);
      cogwheels.forEach(object =>
        object.element.setAttribute(
          "transform", `rotate(${rotation * object.direction} ${object.center})`));

      if (rotation == turn) delete state.start;
      requestAnimationFrame(rotate);
    };

    requestAnimationFrame(rotate);
  }


  // fast forward arrows animation
  // ===============================================================================================

  {
    const parent = document.querySelector("#always-improving .heading-icon");
    const paths = parent.getElementsByTagName("path");

    const getRGB = path => path.getAttribute("fill").match(/\d+/g).map(Number);

    const getTranslateX = (() => {
      const extractNumber = pipe(first, Number);
      return path => extractNumber(/\d+/.exec(path.getAttribute("transform")));
    })();

    const styles = {
      fills: [getRGB(first(paths)), getRGB(last(paths))],
      delta: getTranslateX(last(paths)),
      scale: {
        ratio: .5,
        cy: parent.querySelector("circle").getAttribute("r") / 2
      }
    };

    const setRGB = (path, values) => {
      const [r, g, b] = values.map(Math.round);
      path.setAttribute("fill", `rgb(${r},${g},${b})`);
      return path;
    };

    const animations = {
      move(arrow, start, duration) {
        const tick = now => {
          const elapsed = now - start;
          const rgb = first(styles.fills).map((value, index) =>
            easeInQuart(elapsed, value, last(styles.fills)[index] - value, duration));
          const x = easeInOutBack(elapsed, 0, styles.delta, duration, 4);
          setRGB(arrow, rgb).setAttribute("transform", `translate(${x})`);
          if (elapsed < duration) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      leave(arrow, start, duration) {
        const tick = now => {
          const elapsed = now - start;
          const opacity = Math.max(0, easeInQuart(elapsed, 1, -1, duration));
          const scale = easeInQuart(elapsed, 1, -styles.scale.ratio, duration);
          const x = easeInQuart(elapsed, styles.delta, 80, duration);
          const y = easeInQuart(elapsed, 0, styles.scale.cy, duration);
          arrow.setAttribute("fill-opacity", opacity);
          arrow.setAttribute("transform", `translate(${x} ${y}) scale(${scale})`);
          elapsed < duration ? requestAnimationFrame(tick) : parent.removeChild(arrow);
        };
        requestAnimationFrame(tick);
      },
      enter(arrow, start, duration) {
        const tick = now => {
          const elapsed = now - start;
          const opacity = easeInOutQuart(elapsed, 0, 1, duration);
          const scale = easeInOutQuart(elapsed, styles.scale.ratio, styles.scale.ratio, duration);
          const x = easeInOutQuart(elapsed, -40, 40, duration);
          const y = easeInOutQuart(elapsed, styles.scale.cy, -styles.scale.cy, duration);
          arrow.setAttribute("fill-opacity", opacity);
          arrow.setAttribute("transform", `translate(${x} ${y}) scale(${scale})`);
          if (elapsed < duration) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    };

    const trigger = () => {
      const arrows = {
        move: first(paths),
        leave: last(paths),
        enter: first(paths).cloneNode()
      };
      parent.insertBefore(arrows.enter, arrows.move).setAttribute("fill-opacity", 0);
      Object.keys(arrows).forEach(type => animations[type](arrows[type], performance.now(), 700));
    };

    interval(trigger, 4000);
  }


  // global scale animation
  // ===============================================================================================

  {
    const path = document.querySelector("#global-scale .heading-icon path");

    const digits = /\d+\.?\d/g;

    const keyframes = [
      { d: path.getAttribute("d") },
      { d: "M26.1,32.1 C25,31 24,31.3 24,33 L24,40 C24,41.1 24.9,42 26,42 L33,42 C34.7,42 35.1,41.1 33.9,39.9 L31.8,37.8 L37.8,31.8 L39.9,33.9 C41,35 42,34.7 42,33 L42,26 C42,24.9 41.1,24 40,24 L33,24 C31.3,24 30.9,24.9 32.1,26.1 L34.3,28.3 L28.3,34.3 L26.1,32.1" }
    ].map(object => define(object, "numbers", object.d.match(digits).map(Number)));

    const instructions = first(keyframes).d.split(digits);

    const d = numbers =>
      numbers.reduce((d, value, index) => d + instructions[index] + value, "");

    const scale = () => {
      const nextState = keyframes.find(object => object != currentState);
      const time = {
        start: performance.now(),
        total: 1200
      };
      const tick = now => {
        define(time, "elapsed", now - time.start);
        const progress = currentState.numbers.map((value, index) =>
          easeOutElastic(time.elapsed, value, nextState.numbers[index] - value, time.total));
        path.setAttribute("d", d(progress));
        if (time.elapsed < time.total)
          requestAnimationFrame(tick);
        else
          currentState = nextState;
      };
      requestAnimationFrame(tick);
    };

    let currentState = first(keyframes);
    interval(scale, 4000);
  }
}
