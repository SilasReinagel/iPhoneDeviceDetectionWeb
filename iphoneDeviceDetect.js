const detectionVersion = '0.07';

const detect = () => {
  const detectionResult = (resultString, screenWidth, screenHeight, dpr, renderer) => ({ resultString, screenWidth, screenHeight, dpr, renderer });
  const isIphone = () => ['iPhone Simulator','iPhone'].includes(navigator.platform);

  const canvas = document.createElement("canvas");
  let detectionRenderer;
  if (canvas) {
      const gl = canvas.getContext("webgl");
      if (gl) {
          const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
          if (debugInfo) {
              detectionRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          }
      }
  }

  const sh = window.screen.height;
  const sw = window.screen.width;
  const dpr = window.devicePixelRatio;
  const r = detectionRenderer;
  const res = (resultString) => detectionResult(resultString, sw, sh, dpr, r);
  const iPhone = isIphone();
  if (!iPhone)
    return res("Probably not an iPhone");

  if (sw == 428 && sh == 926 && dpr == 3)
    return res("iPhone 12 Pro Max, or 13 Pro Max");

  if (sw == 390 && sh == 844 && dpr == 3)
    return res("iPhone 12, 13, 12 Pro, or 13 Pro");

  if (sw == 375 && sh == 812 && dpr == 3)
    return res("iPhone X, XS, 11 Pro, 12 mini, or 13 mini");

  if (sw == 414 && sh == 896)
    if (dpr == 3)
        return res("iPhone 11 Pro Max, or XS Max");
    else if (dpr == 2)
        return res("iPhone 11, or XR");

  // TODO: Update the rest if the previous logic works

  // iPhone 6+/6s+/7+ and 8+
  if ((window.screen.height / window.screen.width == 736 / 414) && (window.devicePixelRatio == 3)) {
      return res("iPhone 6 Plus, 6s Plus, 7 Plus, 8 Plus, or SE 2nd Gen");
  }
  // iPhone 6+/6s+/7+ and 8+ in zoom mode
  if ((window.screen.height / window.screen.width == 667 / 375) && (window.devicePixelRatio == 3)) {
    return res("iPhone 6 Plus, 6s Plus, 7 Plus or 8 Plus (display zoom)");

  // iPhone 6/6s/7 and 8
  } else if ((window.screen.height / window.screen.width == 667 / 375) && (window.devicePixelRatio == 2)) {
    return res("iPhone 6, 6s, 7 or 8");

  // iPhone 5/5C/5s/SE or 6/6s/7 and 8 in zoom mode
  } else if ((window.screen.height / window.screen.width == 1.775) && (window.devicePixelRatio == 2)) {
    return res("iPhone 5, 5C, 5S, SE or 6, 6s, 7 and 8 (display zoom)");

  // iPhone 4/4s
  } else if ((window.screen.height / window.screen.width == 1.5) && (window.devicePixelRatio == 2)) {
      switch(detectionRenderer) {
          default:
              return res("iPhone 4 or 4s");
          case "PowerVR SGX 535":
              return res("iPhone 4");
          case "PowerVR SGX 543":
              return res("iPhone 4s");
      }

  // iPhone 1/3G/3GS
  } else if ((window.screen.height / window.screen.width == 1.5) && (window.devicePixelRatio == 1)) {
      switch(detectionRenderer) {
          default:
              return res("iPhone 1, 3G or 3GS");
          case "ALP0298C05":
              return res("iPhone 3GS");
          case "S5L8900":
              return res("iPhone 1, 3G");
      }
  } 

  return res("Unindentified iPhone");
}
