precision highp float;

float PI = 3.14;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {



  vec2 st = gl_FragCoord.xy / u_resolution;


  float f = step(-st.x * -st.x * -st.x * sin(-st.x * u_time * PI ) * cos(-st.y * u_time * PI ) + .5, st.y) * 2. - 1.;

  vec3 color = vec3(abs(f), f, f);

  gl_FragColor = vec4(color, 1.);

}