precision highp float;

float PI = 3.14;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {

  vec2 st = gl_FragCoord.xy / u_resolution;

  float tiles = 1000.;

  float tileSize = 1. / tiles;

  float tileX = float(int(st.x / tileSize));
  float tileY = float(int(st.y / tileSize));

  float f = step(0.5 + sin((tileX / tiles) * 2. * PI + u_time) * 0.125, tileY/tiles) * 2. - 1.;

  f += step(0.5 + -sin((tileX / tiles)  * PI + u_time) * 0.125, tileY/tiles) * 2. - 1.;

  vec3 color = vec3(abs(f), f, f);

  gl_FragColor = vec4(color, 1.);

}
