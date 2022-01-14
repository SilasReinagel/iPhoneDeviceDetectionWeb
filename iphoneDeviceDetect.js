// Specs found: https://www.ios-resolution.com/
// Original Idea from StackOverflow: https://stackoverflow.com/a/49774317

const detectionVersion = '0.08';

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
  if (sw === 428 && sh === 926 && dpr === 3)
    return res("iPhone 12 Pro Max, or 13 Pro Max");
  if (sw === 390 && sh === 844 && dpr === 3)
    return res("iPhone 12, 13, 12 Pro, or 13 Pro");
  if (sw === 375 && sh === 812 && dpr === 3)
    return res("iPhone X, XS, 11 Pro, 12 mini, or 13 mini");
  if (sw === 414 && sh === 896 && dpr === 3)
    return res("iPhone 11 Pro Max, or XS Max");
  if (sw === 414 && sh === 896 && dpr === 2)
    return res("iPhone 11, or XR");
  if (sw === 375 && sh === 667 && dpr === 2)
    return res("iPhone 6, 6s, 7, 8, or SE 2nd Gen");
  if (sw === 414 && sh === 736 && dpr === 3)
    return res("iPhone 8 Plus");
  if (sw === 476 && sh === 847 && dpr === 3)
    return res("iPhone 6 Plus, 6s Plus, or 7 Plus");
  if (sw === 320 && sh === 568 && dpr === 2)
    return res("iPhone 5, 5C, 5S, or SE 1st Gen");
  if (sw === 320 && sh === 480 && dpr === 2)
    return res("iPhone 4 or 4S");
  if (sw === 320 && sh === 480 && dpr === 1)
    return res("iPhone 1, 3G, or 3GS");
  return res("Unindentified iPhone");
}
