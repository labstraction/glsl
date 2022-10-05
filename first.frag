precision highp float;

float PI = 3.14;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;

  vec3 color = vec3(0., 0., 0.03);
  
  color += step(.5 + cos(st.y * PI) * sin(u_time), st.x);
  
  gl_FragColor=vec4(color,1.);
}