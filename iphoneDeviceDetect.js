const detectionVersion = '0.05';

let detectionRenderer;

const isIphone = () => {
    return ['iPhone Simulator','iPhone'].includes(navigator.platform);
}

const getDetectedGpu = () => {
    if (!detectionRenderer)
        return "None";
    return detectionRenderer;
}

const detectionResult = (resultString, screenWidth, screenHeight, dpr, renderer) => ({ resultString, screenWidth, screenHeight, dpr, renderer });

const detect = () => {
  const canvas = document.createElement("canvas");
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

  const isiPhone = isIphone();
  if (!isiPhone)
    return res("Probably not an iPhone");

  if (sw == 1170 && sh == 2532 && dpr == 3)
    return res("iPhone 12/13 Standard/Pro");

  if (sw == 1080 && sh == 2340 && dpr == 3)
    return res("iPhone 12/13 mini");
  
  if (sw == 2778 && sh == 2778 && dpr == 3)
    return res("iPhone 12/13 Pro Max");
  
  // iPhone 12 Series
  if (r == "Apple A14 GPU")
    return res("iPhone 12 Series");

  // iPhone 11 Series
  if (r == "Apple A13 GPU")
    return res("iPhone 11 Series");

  // iPhone XS Series (including XR)
  if (r == "Apple A12 GPU")
    return res("iPhone XS Series");

  // iPhone X
  if ((window.screen.height / window.screen.width == 812 / 375) && (window.devicePixelRatio == 3))
      return res("iPhone X");

  // iPhone 6+/6s+/7+ and 8+
  if ((window.screen.height / window.screen.width == 736 / 414) && (window.devicePixelRatio == 3)) {
      return res("iPhone 6 Plus, 6s Plus, 7 Plus or 8 Plus");
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

  if (isiPhone)
    return res("Unindentified iPhone");
  return res("Probably not an iPhone");  
}
