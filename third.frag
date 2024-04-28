precision highp float;

float PI = 3.14;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;

  float tiles = 500.;

  float tilewidth = 1. / tiles;

  float x = float(int(st.x / tilewidth));
  float y = float(int(st.y / tilewidth));

  float f = smoothstep(0., y - tiles * 4. / 8., -sin((x / 0.2 / tiles) + u_time) * (.015 / tilewidth) * cos(u_time / 6.)) * 3. - 1.;

  vec3 color = vec3(abs(f), f, f);

  color *= smoothstep(0., y - tiles * 6. / 8., -sin((x / 0.2 / tiles) - u_time) * (.015 / tilewidth) * cos(u_time / 6.)) * 3. - 1.;

  color *= smoothstep(0., y - tiles * 2. / 8., -sin((x / 0.2 / tiles) - u_time) * (.015 / tilewidth) * cos(u_time / 6.)) * 3. - 1.;

  gl_FragColor = vec4(color, 1.);

}
